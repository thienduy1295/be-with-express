const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

//create 404 error
app.use((req, res, next) => {
  const error = new Error("Path not found");
  error.status = 404;

  next(error);
});

//error handler
app.use((error, req, res, next) => {
  console.log(error.message);
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).send(error.message);
});

module.exports = app;
