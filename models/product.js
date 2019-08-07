var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const product = new Schema ({
    identity : {type: String, unique: true },
    name: {type: String },
    unit_price: {type: Number},
    currency: {type: String },
    quantity : {type: Number },
    owner:  {type: String ,index: true},
    
});

module.exports=mongoose.model('product',product)