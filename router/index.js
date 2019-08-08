module.exports = function (app) {
    const request = require('../controller/product')
    
    app.post('/addProduct', async (req, res ,next) => {

        console.log("owner : "+req.body.owner)
        try {
            var result = (await new request().addProduct(req.body))
            res.status(201)
            res.json(result)
        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })

    app.post('/updateProduct', async (req, res ,next) => {

        console.log("owner : "+req.body.owner)
        try {
            var result = (await new request().updateProduct(req.body))
            res.status(201)
            res.json(result)
        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })
    
    app.post('/getProductByID', async (req, res) => {
        try {

            let productID = req.body.productID
            let userName = req.body.owner
            var result = (await new request().getProductByID(productID, userName))
            res.status(200)
            res.json(result)

        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })

    app.post('/getAllProductByOwner', async (req, res) => {
        try {
            logger.debug(`req.body : ${JSON.stringify(JSON.parse(body).owner)}`)

            let userName = req.body.owner
            var result = (await new request().getAllProductByOwner(userName))
            res.status(200)
            res.json(result)

        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })
    

    app.post('/deleteProduct', async (req, res) => {
        try {
            var result = (await new request().deleteProduct(req.body))
            res.status(200)
            res.json(result)

        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })


}

