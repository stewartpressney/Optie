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
        console.log(id);
        res.status(200).send('Done!');
      });
 
  });

  // app.post('/event/:id')
  // router.post("/:id", (req, res) => {

  // });

  // router.post("/", (req, res) => {
  //   // TODO 
  // });

  return router;
}