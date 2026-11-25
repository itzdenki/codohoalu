const APP_ROUTE = /^\/pages\/(dth|ldh|tham-quan)\/[a-z0-9-]+\/?$/;

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return context.next();
  }
  const url = new URL(request.url);
  const trimmed = url.pathname.replace(/\/+$/, '');
  if (trimmed === '/pages/photo-spots' || APP_ROUTE.test(url.pathname)) {
    const shellUrl = new URL('/', url);
    return env.ASSETS.fetch(new Request(shellUrl, { method: request.method, headers: request.headers }));
  }
  return context.next();
}
