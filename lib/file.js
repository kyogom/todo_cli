//ファイル操作モジュールの追加
var fs = require('fs');
var chalk = require('chalk');
var util = require('./utils.js');
var maxlength = {
  "title" : 15,
  "detail_show": 10,
  "detail": 100,
}
//ファイルのpath
var path_todo = "./todo.json";
var path_help = "./help.txt"


//todoファイル読み込み関数
exports.readFile = function (arg) {
  fs.readFile(path_todo, 'utf8', function (err, data) {

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
                JSON.parse(lines[i]).createDate
              ));
        }
        break;
      case 'titles':
      //タイトルだけを出力する処理
        for(let i = 0 ; lines.length - 1 > i ; i++) {
          console.log(chalk.blue(
            JSON.parse(lines[i]).title));
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
  fs.appendFile(path_todo, data, function (err) {
    if (err) {
        throw err;
    } else {
      //完了メッセージを出力
      console.log(chalk.green(args1 +' '+ args2 + ' ' + formatted));
      console.log(chalk.green('todo successfully added!!!'));
    }
  });
}

//helpファイル読み込み関数
exports.readHelp = function (arg) {
  fs.readFile(path_help, 'utf8', function (err, data) {
    //エラーの場合はエラーを投げてくれる
    if (err) {
        throw err;
    }
    console.log(chalk.yellow(data));
  });
}
