
 class  mongoose {

//get data
    async get(identity, collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(identity)
        console.log(result)
        if(!result[0]){
            var error = {
                error : "error : Not Found Identity in MongoDB",
                identity : identity,
                collectionName : collectionName
            }
            return error
        }
        return result
    }
    
//checkNotFound data(ture/flase)
    async checkNotFound(identity, collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(identity)
        console.log(`find value in DB result : ${result}`)
        if(!result[0]){ return true } // nil NotFound : T
        else { return false }      // value : F
    }

//delete data 
    async delete(identity, collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(identity)
        if(!result[0]){
            var error = {
                            error : "error : Not Found Identity in MongoDB",
                            identity : identity,
                            collectionName : collectionName
                        }
            return error
        }else{ 
            var result = await Collection.remove(identity)  
 
            return result
        }       
    }
//update
    async update(identity, collectionName, value){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(identity)
        if(!result[0]){
            var error = {
                            error : "error : Not Found Identity in MongoDB",
                            identity : identity,
                            collectionName : collectionName
                        }
            return error
        }
        var resultup = await Collection.update(identity,{$set:value})
        return resultup   
    }
//insert
    async  insert(identity, collectionName, data) {
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(identity)
        if(!result[0]){
            var error = {
                            error : "error : Not Found Identity in MongoDB",
                            identity : identity,
                            collectionName : collectionName
                        }
            return error
        }
        var resultup = await Collection.insertOne({
            identity: identity,
            val: data
        });
        return resultup  

        }
 }
module.exports = mongoose