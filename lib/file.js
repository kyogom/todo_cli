//ファイル操作モジュールの追加
var fs = require('fs');
var chalk = require('chalk');
var util = require('./utils.js');
var maxlength = {
  "title" : 15,
  "detail_show": 10,
  "detail": 100,
}
//todoファイルのpath
var path = "./todo.json";


//ファイル読み込み関数
exports.readFile = function (arg) {
  fs.readFile(path, 'utf8', function (err, data) {

    //エラーの場合はエラーを投げてくれる
    if (err) {
        throw err;
    }
    var lines = data.split(/\n/);

    switch(arg){
      //全件出力
      case 'all':
        for(let i = 0 ; lines.length - 1 > i ; i++) {
          console.log(chalk.blue(
                util.paddingTitle(JSON.parse(lines[i]).title) + ' '+
                JSON.parse(lines[i]).detail + ' ' +
                JSON.parse(lines[i]).createDate));
        }
        break;
      case 'titles':
      //タイトルだけを出力する処理
        for(let i = 0 ; lines.length - 1 > i ; i++) {
          console.log(JSON.parse(lines[i]).title);
        }
        break;
    }
  });
}

//書き込み関数
exports.appendFile= function (args1, args2) {

//現在の日付を取得
  var dt = new Date();
  var formatted = dt.toFormat("YYYY/MM/DD HH24:MI");

//文字数チェック
  if(args1.length > maxlength.title) {
    console.log(chalk.red('title is up to 15 charactors'));
    return;
  }
  if(args2.length > maxlength.detail) {
    console.log(chalk.red('detail is up to 100 charactors'));
    return;
  }

//json形式に整形
  data = '{"title" : "' + args1 + '", "detail" : "' + args2 + '", "createDate" : "' + formatted +  '"}\n';

//書き込み
  fs.appendFile(path, data, function (err) {
    if (err) {
        throw err;
    }
  });
}
