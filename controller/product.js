
const logger = require('../util/logger.js');
const mongoose = require('../util/mongoose.js');

//collection on mongoDB
const productModels = require('../models/product')

class request {
    
    async addProduct(request) {
        let functionName = `[addProduct]`
        logger.info(functionName)
        logger.debug(`request : ${JSON.stringify(request)}`)

        return new Promise(async function (resolve, reject) {

            //check exist
            var productcheckNotFound = await new mongoose().checkNotFound(
                { identity: request.identity.toLowerCase()}, 
                "product"
                )
                logger.debug("check exist : "+productcheckNotFound)
            if (!productcheckNotFound) {
                let massageError = `An identity for the product ${request.identity} exist in the MongoDB`
                logger.error(massageError);
                reject({ error: massageError });
                return
            }

            var product = {
                identity: request.identity.toLowerCase(),
                name: request.name.toLowerCase(),
                unit_price: request.unit_price,
                currency: request.currency.toLowerCase(),
                quantity: request.quantity,
                owner: request.owner.toLowerCase(),
            }
            const models = new productModels(product)
            // add user in mongoDB
            await models.save()

            logger.debug(`Add productObject for ${request.owner} in mongoDB: ${JSON.stringify(product)}`)

            resolve(product)
        })
    }

    async updateProduct(request) {
        let functionName = `[updateProduct]`
        logger.info(functionName)
        logger.debug(`request : ${JSON.stringify(request)}`)

        return new Promise(async function (resolve, reject) {

            //check NotFound
            var productcheckNotFound = await new mongoose().checkNotFound(
                { identity: request.identity.toLowerCase(), owner: request.owner.toLowerCase() },
                "product"
            )
            if (productcheckNotFound) {
                let massageError = `An identity for the product ${request.identity} Not Found in the MongoDB`
                logger.error(massageError);
                reject({ error: massageError });
                return
            }

            var product = {
                name: request.name.toLowerCase(),
                unit_price: request.unit_price,
                currency: request.currency.toLowerCase(),
                quantity: request.quantity,
            }

            await new mongoose().update(
                { identity: request.identity.toLowerCase(), owner: request.owner.toLowerCase() },
                "product",
                product
            )

            logger.info(`Update productObject for ${request.owner} in mongoDB: ${JSON.stringify(product)}`)

            resolve(`Update productObject for ${request.owner} in mongoDB: ${JSON.stringify(product)}`)
        })
    }

    async deleteProduct(request) {
        let functionName = `[deleteProduct]`
        logger.info(functionName)
        logger.debug(`request : ${JSON.stringify(request)}`)

        return new Promise(async function (resolve, reject) {

            // check NotFound
            var productcheckNotFound = await new mongoose().checkNotFound(
                { identity: request.identity.toLowerCase() },
                "product"
            )
            if (productcheckNotFound) {
                let massageError = `An identity for the product ${request.identity} Not Found in the MongoDB`
                logger.error(massageError);
                reject({ error: massageError });
                return
            }



            await new mongoose().delete(
                { identity: request.identity.toLowerCase(), owner: request.owner.toLowerCase() },
                "product"
            )

            logger.info(`Delete productObject for ${request.owner} in mongoDB: ${JSON.stringify(request)}`)

            resolve(`Delete productObject for ${request.owner} in mongoDB: ${JSON.stringify(request)}`)
        })
    }

    async getProductByID(productID, ownerName) {
        let functionName = `[getProductByID]`
        logger.info(functionName)
        logger.debug(`productID : ${productID} ,ownerName : ${ownerName}`)
        return new Promise(async function (resolve, reject) {

            var productObject = await new mongoose().get(
                { dentity: productID, owner: ownerName },
                'product'
            );
            if (productObject.error) {
                logger.error(productObject.error)
                reject(productObject)
                return
            }
            logger.info(`get productObject for ${request.owner} form mongoDB: ${JSON.stringify(productObject)}`)

            resolve(productObject)
        })
    }

    async getAllProductByOwner(ownerName) {
        let functionName = `[getAllProductByOwner]`
        logger.info(functionName)
        logger.debug(`ownerName : ${ownerName}`)
        return new Promise(async function (resolve, reject) {

            var productObject = await new mongoose().get({ owner: ownerName.toLowerCase() }, 'product');
            if (productObject.error) {
                logger.error(productObject.error)
                reject(productObject)
                return
            }

            logger.info(`get productObject for ${request.owner} form mongoDB: ${JSON.stringify(productObject)}`)

            resolve(productObject)
        })
    }

}
module.exports = request