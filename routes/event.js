"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/event", (req, res) => {
    res.render('/event');
    // res.json('event');
  });

  // router.post("/", (req, res) => {
  //   // TODO 
  // });

  return router;
}