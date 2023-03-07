#!/usr/bin/env node
import app from "../app.js";
import http from "http";
import { handlePrompt } from "./handlePrompt.js";

// Get port from environment and store in Express.

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server.

const server = http.createServer(app);

// Listen on provided port, on all network interfaces.

server.listen(port);
server.on("error", onError);
const addr = server.address();
const serverURL = `http://localhost:${addr.port}`;
if (process.env.NODE_ENV === "dev") {
  server.on("listening", () => {
    handlePrompt(serverURL);
  });
}

// Normalize a port into a number, string, or false.

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

// Event listener for HTTP server "error" event.

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
