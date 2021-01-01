// load modules
const api_modules = require("./api_modules.js");
const fs = require("fs");
const config = require("./config.js");

// Load HTTP module
const http = require("http");
const hostname = "127.0.0.1";
const port = 8080;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send response body "Hello World"
  res.end("Hello World\n");
});

// Print when server starts listening
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const patt = /([0-9]+.[0-9]+.[0-9]+.[0-9]+) - - /g;
const logfile = fs.readFileSync("/var/log/apache2/access_log").toString();
const ipList = api_modules.removeDuplicates(
  api_modules.getArrayOfIPs(patt, logfile)
);
const token = config.token;
