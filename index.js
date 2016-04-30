'use strict';

const through = require('through2');

module.exports = function(attributes) {
  attributes = attributes || [];

  function iteration(chunk, enc, next) {
    let line = chunk.toString();

    if (!line.trim().length) return next();

    let object = attributes.reduce((memo, attribute) => {
      let value = line.slice(attribute.begin, attribute.end);

      memo[attribute.key] = value.trim();
      return memo;
    }, {});

    this.push(object);
    next();
  }

  return through.obj(iteration);
}
