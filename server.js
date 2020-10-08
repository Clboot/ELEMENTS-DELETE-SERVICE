'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Controler = require('./server/controler/controler')
require("dotenv").config()
const ip = require('ip')
require('../EUREKA-JS-CLIENT/eureka-helper').registerWithEureka('CREATE-PROJECT-SERVICE', 8085, ip);


const app = express()
app.use(bodyParser.json())

//cors configuration for security
const whitelist = ['http://localhost:3000']
app.use(function (req, res, next) {
  const origin = req.headers.origin
  res.header('Access-Control-Allow-Credentials', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next()
})

app.delete('/recycle_bin', Controler.recycle)

app.listen(8097, function () {
    console.log('Authentication Service listening on: http://localhost:%s', 8097)
})
