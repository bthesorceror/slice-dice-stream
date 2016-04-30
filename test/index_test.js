'use strict';

const fs     = require('fs');
const path   = require('path');
const test   = require('tape');
const concat = require('concat-stream');
const split  = require('split');

const sliceStream = require('../index');

const exampleFilePath = path.join(__dirname, 'example.txt');

test('parses correctly', (t) => {
  t.plan(1);

  let attributes = [
    { key: 'fName', begin: 0, end: 12 },
    { key: 'lName', begin: 12, end: 23 },
    { key: 'age', begin: 23 , end: 28 }
  ];

  let expected = [
    { fName: 'Brandon', lName: 'Farmer', age: '32' },
    { fName: 'Katy', lName: 'Farmer', age: '28' },
    { fName: 'Jane', lName: 'Smith', age: '52' }
  ];

  fs.createReadStream(exampleFilePath)
    .pipe(split())
    .pipe(sliceStream(attributes))
    .pipe(concat((data) => { t.deepEqual(data, expected); }));
});

test('parses with no attributes', (t) => {
  t.plan(1);

  let expected = [{}, {}, {}];

  fs.createReadStream(exampleFilePath)
    .pipe(split())
    .pipe(sliceStream())
    .pipe(concat((data) => { t.deepEqual(data, expected); }));
});
