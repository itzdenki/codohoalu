import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { VISIT_TOPICS } from '../public/assets/js/visit-topics.js';

test('mỗi mục tham quan dùng ảnh trong đúng nội dung của mục đó', async () => {
  for (const topic of VISIT_TOPICS) {
    assert.ok(topic.image.startsWith(`/${topic.route}/`));
    await access(new URL(`../public${topic.image}`, import.meta.url));
  }
});

test('trang bìa mở đúng 14 bài mới và dẫn tới nội dung theo đúng ngôn ngữ', async t => {
  const names=['document','window','location','history','localStorage','Audio'];
  const originals=new Map(names.map(name=>[name,Object.getOwnPropertyDescriptor(globalThis,name)]));
  t.after(()=>names.forEach(name=>{const value=originals.get(name);if(value)Object.defineProperty(globalThis,name,value);else delete globalThis[name];}));
  const listeners={},events={},stored=new Map();
  const tracks=[];
  const frameWindow={ postMessage() {} };
  let onVisitFrameLoad;
  const visitFrame={
    contentWindow:frameWindow,style:{},parentElement:{querySelector(){return null;}},
    addEventListener(name, callback) { if (name === 'load') onVisitFrameLoad=callback; },
  };
  const stage={innerHTML:'',children:[],querySelector(selector){return this.children.findLast(node=>`.${node.className}`===selector&&!node.removed)||null;},querySelectorAll(selector){return selector==='iframe'&&this.innerHTML.includes('visit-content-stage')?[visitFrame]:[];},appendChild(node){this.children.push(node);}};
  const app={innerHTML:'',addEventListener(name,fn){events[name]=fn;},contains(){return true;},querySelector(selector){if(selector==='.experience-stage')return stage;if(selector==='.visit-content-stage iframe')return stage.querySelectorAll('iframe')[0]??null;return stage.querySelector(selector);},querySelectorAll(){return [];}};
  const doc={querySelector(selector){return selector==='#app'?app:null;},createElement(){return {innerHTML:'',className:'',setAttribute(){},querySelectorAll(){return [];},remove(){this.removed=true;}};}};
  const location={pathname:'/',search:'',hash:'',origin:'http://localhost:3000'};
  Object.defineProperties(globalThis,{
    document:{configurable:true,value:doc},window:{configurable:true,value:{addEventListener(name,fn){listeners[name]=fn;}}},
    location:{configurable:true,value:location},history:{configurable:true,value:{pushState(_s,_t,url){location.pathname=url.split('?')[0];},replaceState(){}}},
    localStorage:{configurable:true,value:{getItem(key){return stored.get(key);},setItem(key,value){stored.set(key,value);}}},
    Audio:{configurable:true,value:class {
      constructor(source) { this.src=new URL(source,location.origin).href; tracks.push(this); }
      play() { this.paused=false; return Promise.resolve(); }
      pause() { this.paused=true; }
    }},
  });
  await import('../public/assets/js/app.js?visit-menu-test');
  const click=dataset=>events.click({target:{closest(){return {dataset};}}});
  assert.match(stage.innerHTML,/class="landing-cover"/);
  assert.match(stage.innerHTML,/class="landing-cover-photo"/);
  assert.match(stage.innerHTML,/<header class="landing-cover-header"[^>]*>\s*<img src="\/images\/home\/header\.png"/);
  assert.match(stage.innerHTML,/<h1 id="landing-cover-title"[^>]*>\s*<img src="\/images\/home\/title\.png"/);
  assert.match(stage.innerHTML,/data-action="qr"/);
  assert.match(stage.innerHTML,/src="\/qr-access\.png"/);
  click({action:'qr'});
  const qrOverlay=stage.children.at(-1);
  assert.match(qrOverlay.innerHTML,/src="\/qr-access\.png"/);
  click({action:'close-qr'});
  assert.equal(qrOverlay.removed,true);
  assert.match(stage.innerHTML,/class="landing-cover-menu" data-action="enter-visit" aria-label="Mục lục"/);
  assert.match(stage.innerHTML,/class="landing-cover-menu-icon"/);
  click({action:'enter-visit'});
  assert.match(stage.innerHTML,/class="visit-menu-footer-close" data-action="close-visit-menu" aria-label="Đóng">\s*<img src="\/images\/menu\/footer-lotus\.png"/);
  click({action:'close-visit-menu'});
  assert.match(stage.innerHTML,/class="landing-cover"/);
  click({action:'enter-visit'});
  assert.match(stage.innerHTML,/class="visit-menu-close" data-action="close-visit-menu"/);
  assert.deepEqual([...stage.innerHTML.matchAll(/data-visit="([^"]+)"/g)].map(match=>match[1]),VISIT_TOPICS.map(topic=>topic.id));
  assert.equal((stage.innerHTML.match(/class="visit-topic-image"/g)||[]).length,14);
  assert.match(stage.innerHTML,/class="visit-menu-banner" data-lang="vi"/);
  assert.match(stage.innerHTML,/id="visit-index-title">MỤC LỤC THAM QUAN/);
  assert.ok(stage.innerHTML.includes(VISIT_TOPICS[0].image));
  assert.match(stage.innerHTML,/visit-overview-button[^>]+data-action="menu"[^>]*>[\s\S]*?<span>Chi tiết<\/span>/);
  assert.ok(stage.innerHTML.indexOf('visit-overview-button') > stage.innerHTML.lastIndexOf('data-visit='));
  assert.doesNotMatch(app.innerHTML,/class="desktop-nav"/);
  click({action:'menu'});
  const overlay=stage.children.at(-1);
  const menu=overlay.innerHTML;
  assert.equal((menu.match(/class="toc-card"/g)||[]).length,8);
  assert.deepEqual([...menu.matchAll(/data-mode="([^"]+)"/g)].map(match=>match[1]),[
    'dth','ldh','intro-co-do','bio-vua-dinh','bio-vua-le-dai-hanh',
    'bio-vua-le-long-dinh','bio-duong-van-nga','architecture',
  ]);
  assert.match(menu,/\/images\/menu\/item-4-vua-dinh\.png/);
  click({action:'close-menu'});
  assert.equal(overlay.removed,true);
  click({action:'menu'});
  click({mode:'dth'});
  assert.equal(location.pathname,'/pages/dth/so-do');
  click({action:'home'});
  assert.match(stage.innerHTML,/class="landing-cover"/);
  click({action:'enter-visit'});
  click({visit:VISIT_TOPICS[0].id});
  assert.equal(location.pathname,`/${VISIT_TOPICS[0].route}`);
  assert.match(stage.innerHTML,new RegExp(`${VISIT_TOPICS[0].route}/index_vi.html[?][^"]*view=guide`));
  const firstTrack=tracks.at(-1);
  assert.equal(firstTrack.src,`${location.origin}/${VISIT_TOPICS[0].route}/audio_vi.mp3`);
  assert.equal(firstTrack.paused,false);
  assert.equal(window.getVisitNarration(frameWindow,firstTrack.src),firstTrack);
  onVisitFrameLoad();
  assert.equal(firstTrack.paused,false);
  assert.doesNotMatch(stage.innerHTML,/data-action="menu"/);
  assert.match(stage.innerHTML,/data-action="visit-prev"[^>]*disabled[^]*class="guide-page-count">1 \/ 14<[^]*data-action="visit-next"/);
  click({action:'visit-home'});
  assert.equal(firstTrack.paused,true);
  assert.equal((stage.innerHTML.match(/data-visit="visit-/g)||[]).length,14);
  click({action:'close-visit-menu'});
  assert.equal(location.pathname,`/${VISIT_TOPICS[0].route}`);
  assert.match(stage.innerHTML,new RegExp(`${VISIT_TOPICS[0].route}/index_vi.html`));
  const unclaimedTrack=tracks.at(-1);
  onVisitFrameLoad();
  assert.equal(unclaimedTrack.paused,true);
  assert.equal(window.getVisitNarration(frameWindow,unclaimedTrack.src),null);
  click({action:'visit-home'});
  click({visit:VISIT_TOPICS[0].id});
  click({action:'visit-next'});
  assert.equal(location.pathname,`/${VISIT_TOPICS[1].route}`);
  const mismatchedTrack=tracks.at(-1);
  assert.equal(window.getVisitNarration(frameWindow,firstTrack.src),null);
  assert.equal(mismatchedTrack.paused,true);
  click({action:'visit-prev'});
  assert.equal(location.pathname,`/${VISIT_TOPICS[0].route}`);
  click({action:'visit-prev'});
  assert.equal(location.pathname,`/${VISIT_TOPICS[0].route}`);
  click({action:'visit-next'});
  click({lang:'fr'});
  assert.match(stage.innerHTML,/index_fr\.html/);
  assert.equal(stored.get('lang'),'fr');
  click({action:'visit-home'});
  assert.match(stage.innerHTML,/visit-overview-button[^>]+data-action="menu"/);
  click({action:'menu'});
  assert.match(stage.children.at(-1).innerHTML,/toc-header-banner" data-lang="fr"/);
  assert.match(stage.children.at(-1).innerHTML,/toc-close-pill-btn" data-action="close-menu">Fermer/);
  click({action:'close-menu'});
  location.pathname=`/${VISIT_TOPICS[10].route}`;
  listeners.popstate();
  assert.match(stage.innerHTML,new RegExp(`${VISIT_TOPICS[10].route}/index_fr.html`));
  location.pathname='/pages/dth/so-do';listeners.popstate();
  assert.match(app.innerHTML,/class="desktop-nav"/);
  assert.match(stage.innerHTML,/pages\/dth\/so-do\/index_fr.html/);
  assert.doesNotMatch(stage.innerHTML,/view=guide/);
  click({action:'home'});
  assert.equal(location.pathname,'/');
  assert.match(stage.innerHTML,/class="landing-cover"/);
  click({action:'enter-visit'});
  assert.equal((stage.innerHTML.match(/data-visit="visit-/g)||[]).length,14);
  assert.match(stage.innerHTML,/class="visit-menu-footer-close" data-action="close-visit-menu" aria-label="Fermer">\s*Fermer/);
});
