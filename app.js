// const createError = require("http-errors");
import createError from "http-errors";
// const express = require("express");
import express from "express";
// const path = require("path");
import path from "path";
// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
// const logger = require("morgan");
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath, URL } from "url";

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

const app = express();

// Set up mongoose connection
import mongoose from "mongoose";
// const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `${process.env.MONGO_URI}?retryWrites=true&w=majority`;

async function main() {
  mongoose.connect(mongoDB, () => {
    console.log("Connected to DB");
  });
}
main().catch((err) => console.log(err));

// view engine setup
app.set("views", fileURLToPath(new URL("views", import.meta.url)));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(fileURLToPath(new URL("public", import.meta.url))));

//-------------------- Routes --------------------//
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import wikiRouter from "./routes/wiki.js";

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/wiki", wikiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
