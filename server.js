
var express = require('./config/express')
const logger = require('./util/logger.js')

var mongoose = require('./config/mongoose')
var db = mongoose();

var app = express()

const port = process.env.PORT || 8000
app.listen(port, () => {
  logger.info('http://localhost:'+port+'/api-docs/')
  // http://localhost:9999/api-docs/

  logger.info('Start server at port ' + port)
})
