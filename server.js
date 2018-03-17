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
const usersRoutes = require("./routes/users");
const eventRoutes = require("./routes/event");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
var moment = require('moment');
moment().format();
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
// Home page
app.get("/", (req, res) => {
  console.log("here in home page")
  res.render("main");
});
// Create page
app.get("/create", (req, res) => {
  console.log("here in home page")
  res.render("event");
});
//Mount all resource routes (prefix)
// app.use("/api/users", usersRoutes(knex));
// app.use("/event", eventRoutes(knex));

//create event
app.post('/create', async(req, res) => {
  try {
    console.dir(req.body, { colors: true })
    let user_id;
    const [user] = await knex('users').where(req.body.user).select('id');
    if (!user) {
      // User with these doesn't exist
      const [new_user] = await knex('users').insert(req.body.user).returning('id');
      user_id = new_user;
    } else {
      user_id = user.id;

    }

    const event_url = new Date().getTime().toString(32);
    const new_event = { ...req.body.event, user_id, event_url };
    const [event_id] = await knex('events').insert(new_event).returning('id');
    await knex('slots').insert(req.body.suggestions.map(suggestion => ({ ...suggestion, event_id })));
    // Object.assign({}, suggestion, { event_id }) - the ... bit above

    res.redirect('/events/' + event_url);
  } catch (ex) {
    res.json({ error: ex.message });

  }
});


//Attendance
app.post('/vote', (req, res) => {
  
  const userCreation = knex('users').insert([{user_name: req.body.user_name, user_email:req.body.user_email}]);
  userCreation.returning('id')
  .asCallback((err, [id]) => {
    const idFromUser = id;
    const urlFromEvent = req.body.event_id;

    const getIdEvent = knex.select('id').from('events').where('event_url', urlFromEvent);
    getIdEvent.returning('id')
    .asCallback((err, [id]) => {
      const idFromEvent = id.id

    

      const getIdSlot = knex.select('id').from('slots').where('event_id', idFromEvent);
      getIdSlot.then((result)=>{
        
        for (var y = 0; y < req.body.checkbox.length; y++){
          var index = req.body.checkbox[y]
          
          const idFromSlots =result[index].id;
          const insertAttendance = knex('attendance').insert([{slot_id: idFromSlots, user_id:idFromUser, available:true}]);
          insertAttendance.then((res)=>{
            
          });
        }

      res.redirect('/events/' + urlFromEvent);
        

      });
    });
  });
});


app.get('/events/:id', async (req, res) => {
  const where = { event_url: req.params.id };
  var event_id = req.params.id;
  const event = await knex('events').where(where).first('*');
  const slotsPrms = knex('slots').where({ event_id: event.id }).select('*');
  const userPrms = knex('users').where({ id: event.user_id }).first('*');
  const slots = await slotsPrms;
  const user = await userPrms;

  
 

  for (var z = 0; z < slots.length; z++){
    await knex('attendance').count('id')
    .where('slot_id', slots[z].id)
    .andWhere('available', 'true')
    .then((result)=>{
      slots[z].vote_count = result[0].count;
      slots[z].slot_date = moment(slots[z].slot_date).format('MMM/DD/YYYY');
    });
  }
  res.render("event_detail", {event, slots, user, event_id: event_id});
  
});

app.get('/json/events/:id', async (req, res) => {
  console.log("datafrom1", req.body);
  const where = { event_url: req.params.id };
  var event_id = req.params.id;
  const event = await knex('events').where(where).first('*');
  const slotsPrms = knex('slots').where({ event_id: event.id }).select('*');
  const userPrms = knex('users').where({ id: event.user_id }).first('*');
  const slots = await slotsPrms;
  const user = await userPrms;

  
 

  for (var z = 0; z < slots.length; z++){
    await knex('attendance').count('id')
    .where('slot_id', slots[z].id)
    .andWhere('available', 'true')
    .then((result)=>{
      slots[z].vote_count = result[0].count;
      slots[z].slot_date = moment(slots[z].slot_date).format('MMM/DD/YYYY');
    });
  }
  res.json({event, slots, user, event_id: event_id});
  
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
