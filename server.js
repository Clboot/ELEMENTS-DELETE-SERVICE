"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Controler = require("./server/controler/controler");
require("dotenv").config();
const ip = require("ip");

require(process.env.EUREKA_HELPER_HOST).registerWithEureka(
  "ELEMENTS-DELETE-SERVICE",
  process.env.ELEMENTS_DELETE_SERVICE_PORT,
  ip,
  process.env.ELEMENTS_DELETE_SERVICE_HOST
);

const app = express();
app.use(bodyParser.json());

//cors configuration for security
const appUrl = `http://${process.env.APP_URL}:${process.env.APP_PORT}`;
const allowedUrls = [appUrl];
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  res.header("Access-Control-Allow-Credentials", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.delete("/recycle_bin", Controler.recycle);

app.listen(process.env.ELEMENTS_DELETE_SERVICE_PORT, function () {
  console.log(
    "Authentication Service listening on: http://localhost:%s",
    process.env.ELEMENTS_DELETE_SERVICE_PORT
  );
});
