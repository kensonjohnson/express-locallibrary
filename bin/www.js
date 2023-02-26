#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');
import app from "../app.js";
import debug from "debug";
const deBugger = debug("express-locallibrary-tutorial:server");
// const http = require('http');
import http from "http";
import { openWithDefaultApplication } from "../open.js";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  // deBugger("Listening on " + bind);
  const path = `http://localhost:${addr.port}`;
  openWithDefaultApplication(path)
    .then((res) => console.log(`Listening on ${bind}`))
    .catch(() => {
      console.log(`\x1b[35mListening on ${bind}\x1b[39m`);
      console.log(
        "\x1b[2m\x1b[33mFailed to launch browser automatically.\x1b[0m"
      );
      console.log(
        `\x1b[35mYou will have to open \x1b[34m${path}\x1b[35m in your browser.\x1b[39m`
      );
    });
}
