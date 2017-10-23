//ファイル操作モジュールの追加
var fs = require('fs');

//todoファイルのpath
var path = "./todo.json";


//ファイル読み込み関数
exports.readFile = function (arg) {
  fs.readFile(path, 'utf8', function (err, data) {

    //エラーの場合はエラーを投げてくれる
    if (err) {
        throw err;
    }

    //全件出力
    switch(arg){
      case 'all':
        console.log(data);
        break;
      case 'titles':
        //タイトルだけを出力する処理
        console.log(JSON.parse(data));
        break;
    }
  });
}

//書き込み関数
exports.appendFile= function (args1, args2) {

//現在の日付を取得
  var dt = new Date();
  var formatted = dt.toFormat("YYYY/MM/DD HH24時MI分");

//json形式に整形
  data = ',{"title" : "' + args1 + '", "detail" : "' + args2 + '", "createDate" : "' + formatted +  '"}';

//書き込み
  fs.appendFile(path, data, function (err) {
    if (err) {
        throw err;
    }
  });
}
