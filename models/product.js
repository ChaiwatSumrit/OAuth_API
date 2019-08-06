var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const product = new Schema ({
    identity : {type: String, unique: true },
    name: {type: String }
});



module.exports=mongoose.model('product',product)
