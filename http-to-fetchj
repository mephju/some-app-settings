const { Request, Headers } = require('node-fetch'); // Use only for Node.js versions < 18
const { Readable } = require('stream');

/**
 * Convert Node.js IncomingMessage to a fetch-compatible Request object.
 * @param {IncomingMessage} req - The incoming HTTP request.
 * @returns {Promise<Request>} - A promise that resolves to a fetch-compatible Request object.
 */
async function convertIncomingMessageToFetchRequest(req) {
  // Construct the full URL using protocol, host, and the original URL
  const protocol = req.connection.encrypted ? 'https' : 'http';
  const url = `${protocol}://${req.headers.host}${req.url}`;
  
  // Extract HTTP method and headers
  const method = req.method;
  const headers = new Headers(req.headers);

  // Convert the incoming request body to a stream if needed
  const body = await streamToBuffer(req);

  // Create the fetch-compatible Request object
  return new Request(url, {
    method,
    headers,
    body: method !== 'GET' && method !== 'HEAD' ? body : null,
  });
}

/**
 * Helper function to convert a stream (IncomingMessage) to a buffer for fetch compatibility.
 * @param {Readable} stream - The Node.js readable stream (request body).
 * @returns {Promise<Buffer|null>} - Resolves to a buffer or null if no body is present.
 */
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', err => reject(err));
  });
}

// Example server implementation for testing
const http = require('http');

http.createServer(async (req, res) => {
  try {
    const fetchRequest = await convertIncomingMessageToFetchRequest(req);

    // Use fetch with the created fetch-compatible Request object
    const fetchResponse = await fetch(fetchRequest);

    // Process and return the fetch response as desired
    const responseBody = await fetchResponse.text();
    res.writeHead(fetchResponse.status, Object.fromEntries(fetchResponse.headers));
    res.end(responseBody);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error: ' + err.message);
  }
}).listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});


const { Response, Headers } = require('node-fetch'); // For Node.js versions < 18
const { Readable } = require('stream');

/**
 * Convert Node.js ServerResponse to a fetch-compatible Response object.
 * @param {ServerResponse} res - The ServerResponse from Node.js server.
 * @returns {Promise<Response>} - A promise that resolves to a fetch-compatible Response object.
 */
async function convertServerResponseToFetchResponse(res) {
  // Collect status and headers
  const status = res.statusCode;
  const statusText = res.statusMessage || ''; // Default if statusMessage is empty
  const headers = new Headers(res.getHeaders()); // Convert headers to fetch-compatible format
  
  // Collect body data from ServerResponse as a buffer
  const body = await streamToBuffer(res);

  // Create a fetch-compatible Response object
  return new Response(body, {
    status,
    statusText,
    headers,
  });
}

/**
 * Helper function to convert a stream (ServerResponse) to a buffer.
 * @param {Readable} stream - The Node.js readable stream (response body).
 * @returns {Promise<Buffer|null>} - Resolves to a buffer or null if no body is present.
 */
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', err => reject(err));
  });
}

