import createError from "http-errors";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { createServer } from "livereload";
import connectLiveReload from "connect-livereload";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath, URL } from "url";

// Initialize express app
const app = express();

// Set up mongoose connection
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const MONGO_URI = `${process.env.MONGO_URI}?retryWrites=true&w=majority`;
if (process.env.NODE_ENV === "dev") {
  console.log("\x1b[33mConnecting to DB...\x1b[39m");
}
mongoose
  .connect(MONGO_URI)
  .then(console.log("\x1b[33mConnected to DB\x1b[39m"))
  .catch((error) => {
    console.error(
      "\x1b[33mMongoose exited with Error:\n\x1b[39m",
      error.message
    );
    console.error("\x1b[33mIs your MongoDB instance running?\x1b[39m");
  });

// view engine setup
app.set("views", fileURLToPath(new URL("views", import.meta.url)));
app.set("view engine", "ejs");
app.use(expressLayouts);

// Configure options and middleware
const liveReloadServer = createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(fileURLToPath(new URL("public", import.meta.url))));

//-------------------- Routes --------------------//
import indexRouter from "./routes/index.js";
import catalogRouter from "./routes/catalog.js";

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
