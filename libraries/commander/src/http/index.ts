import got from 'got';

export * from './github';

export function getFile(url: string, headers = {}, timeout = 10000) {
  return got.get(url, {
    headers: {
      ...headers,
    },
    timeout: {
      lookup: timeout,
      socket: timeout,
      connect: timeout,
      secureConnect: timeout,
      send: timeout,
      response: timeout,
      read: timeout,
      request: timeout,
    },
  });
}
