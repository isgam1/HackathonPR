'use strict';
//This is to install and start the node.js servevr. please install where the "index.js" will be located. 
// Imports dependencies and set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()), // creates express http server
    db = require('./db');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sets server port and logs message on success
app.listen(process.env.PORT || 54195, () => console.log('webhook is listening'));

app.get("/", (req, res) => {
   res.status(200).send(req.query.id);
     console.log("helo world")


  //  var fs = require("fs");

    //fs.appendFile('mynewfile1.txt', 'hello content!', function (err) {
    //    if (err) throw err;
    //    console.log('saved');
    //});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {
    console.log(req.body)
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            console.log(entry);
            //let webhook_event = entry.messaging[0]; /////////////////////////////////
            let webhook_event = entry.changes.forEach(function (event_elem) {
                console.log(event_elem);

                db.insertIntoDb(event_elem)
            })

        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});




// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
    console.log(req.body)
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "1234" //CHANGE THIS TO THE TOKEN. THIS IS WHERE THE TOKEN IS RECIEVED. 

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});