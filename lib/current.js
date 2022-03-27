"use strict";

/**
 * Module dependencies
 */
const co = require("co");
const config = require("./config");

module.exports = co.wrap(function* () {
  try {
    const current = config.get("current");
    console.log(current);
  } catch (e) {
    console.log(e.stack);
  }
});
