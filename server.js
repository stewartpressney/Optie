"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const path = require('path');
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const eventRoutes = require("./routes/event");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.set('views', path.join(__dirname, '/public/views'));



// Generate URL
function generateURL() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Home page
app.get("/", (req, res) => {
  console.log("here in home page")
  res.render("event");
});


//Mount all resource routes (prefix)
app.use("/event", eventRoutes(knex));

// url
// app.get("/events/:url", (req, res) => {

//   const eventName = knex.select('event_title')
//     .from('events')
//     .where('event_url', req.params.url)
//     .then(function(data){
//       console.log(data)
//       res.render("event_detail");
//     });
  
  
  
// });

//create event
app.post('/create', (req, res) =>{

  const userCreation = knex('users').insert({user_name: req.body.user_name, user_email:req.body.user_email});
  userCreation.returning('id')
  .asCallback((err, [id]) => {
    console.log('create id', id)

    if(err) {
      console.log(err);
      // handle error and return
      return
    }


    const newURL = generateURL()
    const eventCreation = knex('events').insert({event_title: req.body.event_title, event_description: req.body.event_description, event_meeting: req.body.event_meeting, event_url: newURL, user_id:id})
    eventCreation.returning('id')
    .asCallback((err, id) => {
      // handle errorrsrs
      console.log('newURL', err, id);
      //res.render("event_detail")
      res.redirect("/event/" + newURL);
    });

    
  });
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});