module.exports = function (app) {
    const request = require('../controller/product')
    const keycloak = require('keycloak-js')
    
    app.post('/addProduct', async (req, res) => {
        try {
            var result = (await new request().addProduct(req.body))
            res.status(201)
            res.json(result)
        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })
    
    app.post('/getProductByID', async (req, res) => {
        try {
            //**** */
            var userID = req.body.token
            var result = (await new request().getProductByID(userID))
            res.status(200)
            res.json(result)
        } catch (error) {
            res.status(400)
            res.json(error)
        }
    })



}