#!/usr/bin/env node
'use strict';
var dateUtils = require('date-utils');
var file  = require('./lib/file.js');
var method = process.argv[2];
var args1 = process.argv[3];
var args2 = process.argv[4];

switch(method) {
  case 'list':
    if(!args1) {
      file.readFile('titles');
    } else if(args1 ==='-a') {
      file.readFile('all');
    }
    break;
  case 'add':
    file.appendFile(args1, args2);
    break;
  case 'help':
    console.log('this is how to use todo_cli...');
    console.log('');
    console.log('list                      show all titles of todo');
    console.log('list -a                   show all infomation of todo');
    console.log('add [title] [detail]      add todo');
    console.log('show last                 show todo most recently added');
    console.log('show first                show todo most primary added');
    console.log('delete last               delete todo most recently added');
    console.log('delete first              delete todo most primary added');
    console.log('delete -a                 delete all todo');
    console.log('move [number] to [number] move todo');
    break;
}
