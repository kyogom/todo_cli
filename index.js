#!/usr/bin/env node
'use strict';
var dateUtils = require('date-utils');
var file  = require('./lib/file.js');
var chalk = require('chalk');
var method = process.argv[2];
var args1 = process.argv[3];
var args2 = process.argv[4];
var args3 = process.argv[5];

switch(method) {
  case 'list':
    if(!args1) {
      // todo list
      //引数がなければタイトルのみ一覧表示する
      file.readFile('titles');
    } else if(args1 ==='-a' || args1 ==='all') {
      //todo list -a / all
      //オプション「-a」か「all」があれば、全てのTodoを一覧表示する
      file.readFile('all');
    }
    break;
  case 'add':
    if(!args1) {
      //todo add
      //引数が足りていないのでhelpを表示
      file.readHelp();
    }
    if(!args2) {
      //todo add title
      //detailがなければ' 'を設定
      args2 = ' ';
      file.appendFile(args1, args2);
    } else {
      //todo add title detail
      //todoを追加する
      file.appendFile(args1, args2);
    }
    break;
  case 'show':
    if(args1 === 'first'){
      //todo show first
      //最初に追加したtodoを見る
      file.readFile('first');
    } else if(args1 === 'last') {
      //todo show last
      //最後に追加したtodoを見る
      file.readFile('last');
    } else {
      //todo show
      //引数が足りていないのでhelpを表示
      file.readHelp();
    }
    break;
  case 'delete':
   if(args1 === '-a' || args1 === 'all') {
     //todo delete -a / all
     //全てのレコードに論理削除フラグを立てる
     file.deleteFile('all');
   } else if(args1 === 'first') {
     //todo delete first
     //最初に追加したtodoに論理削除フラグを立てる
     file.deleteFile('first');
   } else if(args1 === 'last') {
     //todo delete last
     //最後に追加したtodo論理削除フラグを立てる
     file.deleteFile('last');
   }
   break;
  default:
    //コマンドが間違っているので、helpを表示
      file.readHelp();
    break;
  case 'move':
    if(args1 > 0 && args2 ==='to' && args3 > 0){
      //todo move args1 to args3
      file.moveFile(args1, args3);
    } else {
      //todo move
      //引数が足りていないのでhelpを表示
      file.readHelp();
    }
  break;
}
