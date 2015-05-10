#!/usr/bin/env node-anywhere

/**
 * Slightly contrived example, but shows how easy it is to just include modules
 * and work with them.
 *
 * 
 * At the end after building the histogram, I decide it looks plain, and want to add
 * some color. I have no idea what "colors" is, but I'm sure enough to try it -
 * and it worked, without me having to look anything up.
 */

var request = require('request');/*@import:request*/

request.get('https://code.jquery.com/jquery-2.1.4.min.js', function(err, res, body) {
  var esprima = require('esprima');/*@import:esprima*/
  
  var data = esprima.parse(body, { tokens: true })
    .tokens.map(function(token) {
      return token.type;
    })
    .reduce(function(prev, cur) {
      if (typeof prev[cur] === 'undefined') {
        prev[cur] = 0;
      }

      prev[cur]++;

      return prev;
    },{});

  var histogram = require('ascii-histogram');/*@import:ascii-histogram*/
  var plain = histogram(data, { bar: '=', width: 50, sort: true });

  var colors = require('colors');/*@import:colors*/

  var output = plain
    .replace(/([0-9])/g, "$1".yellow)
    .replace(/([a-zA-Z]{2,})/g, "$1".blue)
    .replace(/\=/g, '='.green);

  console.log(output);
});