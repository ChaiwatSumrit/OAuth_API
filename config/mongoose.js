//var config =require('./config')
const mongoose = require('mongoose')
const logger = require('../util/logger.js');
const collection = "product"
// read package.json<Scripts> 
// const ORG = process.env.ORG.toLocaleLowerCase()
const url =`mongodb+srv://development:ZGFMzUvDJ745GFDq@clustermaster-zvis2.mongodb.net/${collection}?retryWrites=true&w=majority`;
module.exports =  function () {
    mongoose.set('debug :', true);
    logger.info('mongoUri :'+url);
    var db = mongoose.connect(url,
        { useNewUrlParser : true}
    );

    require('../models/product');
    return db

}