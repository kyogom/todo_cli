#!/usr/bin/env node
'use strict';
var dateUtils = require('date-utils');
var file  = require('./lib/file.js');
var chalk = require('chalk');
var method = process.argv[2];
var args1 = process.argv[3];
var args2 = process.argv[4];

switch(method) {
  case 'list':
    if(!args1) {
      //引数がなければタイトルのみ一覧表示する
      file.readFile('titles');
    } else if(args1 ==='-a' || args1 ==='all') {
      //オプション「-a」か「all」があれば、全てのTodoを一覧表示する
      file.readFile('all');
    }
    break;
  case 'add':
    if(args2){
      file.appendFile(args1, args2);
    } else {
      args2 = ' ';
      file.appendFile(args1, args2);
    }
    break;
  default:
      file.readHelp();
    break;
}
