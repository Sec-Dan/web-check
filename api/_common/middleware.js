const normalizeUrl = (url) => {
  return url.startsWith('http') ? url : `https://${url}`;
};

// If present, set a shorter timeout for API requests
const TIMEOUT = process.env.API_TIMEOUT_LIMIT ? parseInt(process.env.API_TIMEOUT_LIMIT, 10) : 60000;

// If present, set CORS allowed origins for responses
const ALLOWED_ORIGINS = process.env.API_CORS_ORIGIN || '*';

// Disable everything
const DISABLE_EVERYTHING = !!process.env.VITE_DISABLE_EVERYTHING;

// Set the platform currently being used
let PLATFORM = 'NETLIFY';
if (process.env.PLATFORM) { PLATFORM = process.env.PLATFORM.toUpperCase(); }
else if (process.env.VERCEL) { PLATFORM = 'VERCEL'; }
else if (process.env.WC_SERVER) { PLATFORM = 'NODE'; }

// Define the headers to be returned with each response
const headers = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS,
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json;charset=UTF-8',
};

const timeoutErrorMsg = 'You can re-trigger this request, by clicking "Retry"\n'
+ 'If you\'re running your own instance of DanSec Web-Check, then you can '
+ 'resolve this issue, by increasing the timeout limit in the '
+ '`API_TIMEOUT_LIMIT` environmental variable to a higher value (in milliseconds), '
+ `This instance currently has a timeout of ${TIMEOUT}ms.`;

const disabledErrorMsg = 'Error - DanSec Web-Check Temporarily Disabled.\n\n'
+ 'This instance is currently disabled by the operator.';

// A middleware function used by all API routes on all platforms
const commonMiddleware = (handler) => {

  // Create a timeout promise, to throw an error if a request takes too long
  const createTimeoutPromise = (timeoutMs) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timed-out after ${timeoutMs} ms`));
      }, timeoutMs);
    });
  };

  // Vercel + Node (Express)
  const vercelHandler = async (request, response) => {
    if (DISABLE_EVERYTHING) {
      response.status(503).json({ error: disabledErrorMsg });
      return;
    }

    const rawUrl = request?.query?.url;

    if (!rawUrl) {
      response.status(500).json({ error: 'No URL specified' });
      return;
    }

    const url = normalizeUrl(rawUrl);

    try {
      const handlerResponse = await Promise.race([
        handler(url, request, response),
        createTimeoutPromise(TIMEOUT),
      ]);

      if (handlerResponse?.body && handlerResponse?.statusCode) {
        response.status(handlerResponse.statusCode).set(handlerResponse.headers || headers)
          .send(handlerResponse.body);
      } else {
        response.status(200).set(headers).json(handlerResponse);
      }
    } catch (error) {
      const isTimeout = String(error?.message || '').includes('timed-out');
      response.status(500).json({ error: isTimeout ? timeoutErrorMsg : error.message });
    }
  };

  // Netlify
  const netlifyHandler = async (event, context, callback) => {
    const queryParams = event.queryStringParameters || event.query || {};
    const rawUrl = queryParams.url;

    if (DISABLE_EVERYTHING) {
      callback(null, {
        statusCode: 503,
        body: JSON.stringify({ error: 'DanSec Web-Check is temporarily disabled. Please try again later.' }),
        headers,
      });
      return;
    }

    if (!rawUrl) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error: 'No URL specified' }),
        headers,
      });
      return;
    }

    const url = normalizeUrl(rawUrl);

    try {
      // Race the handler against the timeout
      const handlerResponse = await Promise.race([
        handler(url, event, context),
        createTimeoutPromise(TIMEOUT),
      ]);

      if (handlerResponse?.body && handlerResponse?.statusCode) {
        callback(null, handlerResponse);
      } else {
        callback(null, {
          statusCode: 200,
          body: typeof handlerResponse === 'object' ? JSON.stringify(handlerResponse) : handlerResponse,
          headers,
        });
      }
    } catch (error) {
      const isTimeout = String(error?.message || '').includes('timed-out');
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error: isTimeout ? timeoutErrorMsg : error.message }),
        headers,
      });
    }
  };

  // The format of the handlers varies between platforms
  const nativeMode = (['VERCEL', 'NODE'].includes(PLATFORM));
  return nativeMode ? vercelHandler : netlifyHandler;
};

if (PLATFORM === 'NETLIFY') {
  // eslint-disable-next-line no-undef
  module.exports = commonMiddleware;
}

export default commonMiddleware;
