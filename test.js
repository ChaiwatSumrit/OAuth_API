const request = require("request");

const keycloakHost = '54.169.66.243';
const keycloakPort = '8080';
const realmName = 'master';
const logger = require('./util/logger.js');

// configure the request to your keycloak server
const options = {
    method: 'POST',
    // Profile server API [GET]
    url: `http://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
    // Auth server API [POST]
    url: `http:${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/token/introspect`,
    headers: {
        Content-Type: "",
        // add the token you received to the userinfo request, sent to keycloak
        Authorization: "Bearer "+"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxVkRlUXgyMkF3ODFSZnBPT01iN0ctM1M0STFzczVpQ0k5cmZVOFZ3TjdBIn0.eyJqdGkiOiIxYTA1OGM4Ni1hYTdiLTQ3OWQtOTljYS1hNjhjODg0OGY0MmIiLCJleHAiOjE1NjUyMzE4NDUsIm5iZiI6MCwiaWF0IjoxNTY1MjMxNTQ1LCJpc3MiOiJodHRwOi8vNTQuMTY5LjY2LjI0Mzo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsInN1YiI6ImM1NTliNmQxLWU4MjYtNDY1Zi04Y2EyLTYwNmI1YjQ4MGM1NSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcHVzZXIiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIxNGViMTJlZS03MmM0LTQ4M2ItOGNjNy0zNDIwOTZhMGVjMTAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiLCJodHRwOi8vbG9jYWxob3N0OjQyMDAvIiwiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlcmdlYXIiLCJlbWFpbCI6ImdlYXJAZW1haWwuY29tIn0.Ezr-qcg68m9LgIbpvNwblxq9WFbKLZOKCqAmJKnBWgJAgndhg3-vw8gh81YH0ThxZZ7ZAJhbIPoQWXmnGxtNNm6aXC9QMOeQnkGEfpzRlucdxuAkoI8mV1celcWtjq0HEa_YzHZELyvYZRddTQ0TDhL1BllFrzBJq6U2KEkZ-X_IBzq5aKDmempvxHcXvLNGcSRHbot-H5qsSYSioVSmOHTd03iwgDcmB-pK0Mz7IAGWoyi2GDl5QjRi3dPpwxvZqn2S2uuJVjxRpFyd5d4PSEfGu68DHL9uieyDmhzrry4lO792e7ZVRzC-oYuIbl0pki29RwH4FSmvH0ty6XDaXQ"
        
        //  req.headers.authorization,//Bearer
    },
    json:{
        token:"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxVkRlUXgyMkF3ODFSZnBPT01iN0ctM1M0STFzczVpQ0k5cmZVOFZ3TjdBIn0.eyJqdGkiOiJiZGE0NmJhYy1lOTUwLTQzZDYtOTdkOS0zNjJlODg3NDRjNmEiLCJleHAiOjE1NjUyMzE0MjgsIm5iZiI6MCwiaWF0IjoxNTY1MjMxMTI4LCJpc3MiOiJodHRwOi8vNTQuMTY5LjY2LjI0Mzo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsInN1YiI6ImM1NTliNmQxLWU4MjYtNDY1Zi04Y2EyLTYwNmI1YjQ4MGM1NSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcHVzZXIiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIwOWRiNDZhZi1kYzZlLTRmZmUtYjliNC00MDUwOTlhYzM4NTEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiLCJodHRwOi8vbG9jYWxob3N0OjQyMDAvIiwiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlcmdlYXIiLCJlbWFpbCI6ImdlYXJAZW1haWwuY29tIn0.H4WEbvyL23tPeZW0NAkN4zulw047WYM_o5qbQGdn1r1BPI8mZ7DVDQSBC98XrxybqnUOAwQVrZJpb65Bx4wlok5ARRkktMVJ_YIZMJZSsnGoNSTlhaYtomB-4G9JA_aB90OiEcxyZDkFI0oj0A-w0FcU5ZgUWyRTu8aHLQCgXs2GnPsQJMho1APw1RHyp-pJtmgXX7o1sxIG1JK9JpnsgVAbH8daDzDOx36aS1L7043P2_ZKcmU_yjWbsjfxsdLhLBMBXleCCvzGC-AaIS-9c4uE2tPZ1ZOIAqauUDdUobJBYw0w2y32PXLousQbPUBHpapJgbJRM6V1j4_jj1Kyaw",
        client_id:"appuser",
        client_secret:"574423e5-f119-407c-9215-98082374d64a"
    }
};

logger.debug("Authorization : " + options.headers.Authorization)

// send a request to the userinfo endpoint on keycloak
request(options, (error, response, body) => {
    if (error) throw new Error(error);
    logger.debug("code status : " + response.statusCode);
    logger.debug("response : "+JSON.stringify(response))

    // if the request status isn't "OK", the token is invalid
    if (response.statusCode !== 200) {
        // res.status(401).json({
            console.log( {error: `unauthorized`})
        // });
    }
    // the token is valid pass request onto your next function
    else {
        logger.info("[Auth.server] Token is Valid, status code : " + response.statusCode);
        console.log("body "+body)
        // req.body.owner = JSON.parse(body).preferred_username
        
        // next();
    }
});