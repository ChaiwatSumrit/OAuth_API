const express = require('express')
const bodyParser = require('body-parser')
const logger = require('../util/logger.js');
const request = require("request");
// const swaggerUi = require('swagger-ui-express');
const cors = require("cors")

module.exports = function () {
    var app = express()
    app.use(cors({origin: '*'}));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.text())
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    const keycloakHost = '54.169.66.243';
    const keycloakPort = '8080';
    const realmName = 'master';

    // check each request for a valid bearer token
    app.use((req, res, next) => {
        if(req.body.owner){
            res.status(401).json({
                error: `Do not send owner(${req.body.owner}) to yourself`
            });
        }

        // assumes bearer token is passed as an authorization header
        if (req.headers.authorization) {
            // configure the request to your keycloak server
            const options = {
                method: 'GET',
                // Profile server API
                url: `http://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
                // Auth server API
                // url: `http:${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/token/introspect`,
                headers: {
                    // add the token you received to the userinfo request, sent to keycloak
                    Authorization: req.headers.authorization,//Bearer
                },
            };

            logger.debug("Authorization : " + options.headers.Authorization)

            // send a request to the userinfo endpoint on keycloak
            request(options, (error, response, body) => {
                if (error) throw new Error(error);
                logger.debug("code status : " + response.statusCode);
                // logger.debug("response : "+JSON.stringify(response))

                // if the request status isn't "OK", the token is invalid
                if (response.statusCode !== 200) {
                    res.status(401).json({
                        error: `unauthorized`,
                    });
                }
                // the token is valid pass request onto your next function
                else {
                    logger.info("[Auth.server] Token is Valid, status code : " + response.statusCode);
                    console.log("body :"+JSON.stringify(body))
                    console.log("body.preferred_username :"+JSON.parse(body).preferred_username)

                    req.body.owner = JSON.parse(body).preferred_username
                    logger.info(`req.body.owner : ${req.body.owner}`)
                    next();
                }
            });
        } else {
            // there is no token, don't process request further
            res.status(401).json({
                error: `unauthorized`,
            });
        }
    });

    require('../router/index.js')(app)

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('URL Not Found');
        err.status = 404;
        next(err);
    });


    return app
}
