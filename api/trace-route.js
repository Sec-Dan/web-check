import traceroute from 'traceroute';
import middleware from './_common/middleware.js';

const traceRouteHandler = async (urlString) => {
  let host;
  try {
    host = new URL(urlString).hostname;
  } catch {
    throw new Error('Invalid URL provided');
  }

  if (!host) {
    throw new Error('Invalid URL provided');
  }

  const result = await new Promise((resolve, reject) => {
    traceroute.trace(host, (err, hops) => {
      if (err || !hops) {
        reject(err || new Error('No hops found'));
      } else {
        resolve(hops);
      }
    });
  });

  return {
    message: 'Traceroute completed!',
    result
  };
};

export const handler = middleware(traceRouteHandler);
export default handler;
