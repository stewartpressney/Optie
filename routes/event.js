"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {



  // app.post('/event')
  router.post("/", (req, res) => {
    console.log("this is /event post")
    console.log("reqdata:", req.body)

    knex('users')
      .insert({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
      })
      .returning('id')
      .then((id) => {
        console.log('id', id);
        res.status(200).send('Done!');
      });

  });

  // /event/:url
  router.get("/:url", (req, res) => {

    const eventName = knex.select('event_title')
      .from('events')
      .where('event_url', req.params.url)
      .then(function (data) {
        console.log('data', data)
        res.render("event_detail");
      });

  });

  return router;
}