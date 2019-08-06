
// const converthash = require('../util/hash256.js')
const logger = require('../util/logger.js');
const mongoose = require('../util/mongoose.js');
const productModels = require('../models/product')

class request {


    async addProduct(req) {
        let functionName = `[addProductByID]`
        logger.info(functionName)
        return new Promise(async function (resolve, reject) {

            var product = {
                identity: req.identity,
                name: req.name.toLowerCase()
            }
            const models = new productModels(product)
            // add user in mongoDB
            await models.save()
            
            logger.debug(`Add productObject to mongoDB: ${JSON.stringify(product)}`)

            resolve(product)
        })
    }
    
    async getProductByID(userID) {
        let functionName = `[getProductByID]`
        logger.info(functionName)
        return new Promise(async function (resolve, reject) {

            // var adminExists = await new mongoose().compare({ enrollmentID: "admin" }, "admin")

            // if (adminExists) {
            //     logger.error('An identity for the admin user "admin" does not exist in the MongoDB');
            //     logger.error('Run the enrollAdmin application before retrying');
            //     return ('An identity for the admin user "admin" does not exist in the MongoDB' + '\n' +
            //         'Run the enrollAdmin application before retrying');
            // }
            
            var productObject =  await new mongoose().get({ identity: userID }, 'product');
            if(productObject.error){
                logger.error(productObject.error)
                reject(productObject)
            }
            logger.debug(`get productObject form mongoDB: ${JSON.stringify(productObject)}`)

            resolve(productObject)
        })
    }

    




}
module.exports = request