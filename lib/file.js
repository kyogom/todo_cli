//ファイル操作モジュールの追加
var fs = require('fs');
var file  = require('./file.js');
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

    if (err) {
        throw err;
    }

    var lines = data.split(/\n/);

    switch(arg){
      //全件出力
      case 'all':
        for(let i = 0 ; lines.length - 1 > i ; i++) {
          console.log(
                (i + 1) + '   ' +
                chalk.blue(
                util.padding(JSON.parse(lines[i]).title) + ' '+
                util.padding(JSON.parse(lines[i]).detail) + ' ' +
                JSON.parse(lines[i]).createDate
              ));
        }
      break;
      //タイトルだけを出力する処理
      case 'titles':
        for(let i = 0 ; lines.length - 1 > i ; i++) {
          console.log(
            (i + 1) + '   ' +
            chalk.blue(
            JSON.parse(lines[i]).title));
        }
      break;
      //最初に追加されたtodoだけを出力する処理
      case 'first':
        console.log(chalk.blue(
              util.paddingTitle(JSON.parse(lines[0]).title) + ' '+
              JSON.parse(lines[0]).detail + ' ' +
              JSON.parse(lines[0]).createDate
            ));
      break;
      //最後に追加されたtodoだけを出力する処理
      case 'last':
        console.log(chalk.blue(
              //最終行に空白が入るため、todo数 - 2で最後に追加されたtodoを表示する
              util.paddingTitle(JSON.parse(lines[lines.length - 2]).title) + ' '+
              JSON.parse(lines[lines.length - 2]).detail + ' ' +
              JSON.parse(lines[lines.length - 2]).createDate
            ));
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
  data = '{"title" : "' + args1 + '", "detail" : "' + args2 + '", "createDate" : "' + formatted + '"}\n';

//書き込み
  fs.appendFile(path_todo, data, function (err) {
    if (err) {
        throw err;
    } else {
      //完了メッセージを出力
      console.log(chalk.green(args1 +' '+ args2 + ' ' + formatted));
      console.log(chalk.green('todo added successfully'));
    }
  });
}

//helpファイル読み込み関数
exports.readHelp = function (arg) {
  fs.readFile(path_help, 'utf8', function (err, data) {

    if (err) {
        throw err;
    }

    console.log(chalk.yellow(data));
  });
}

//削除関数
exports.deleteFile = function(arg) {
  fs.readFile(path_todo, 'utf8', function (err, data) {
    switch(arg) {
      case 'all':
      fs.unlinkSync(path_todo, function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
      break;
      case 'first':
        fs.readFile(path_todo, 'utf8', function (err, data) {

          if (err) {
              throw err;
          }

          var lines = data.split(/\n/);
          fs.unlinkSync(path_todo, function (err) {
            if (err) {
              throw err;
            }
          });
          for(let i = 1 ; lines.length - 1 >= i ; i++) {
            if(i !== lines.length - 1) {
              lines[i] += '\n';
            }
            fs.appendFile(path_todo, lines[i], function (err) {
              if (err) {
                  throw err;
              }
            });
          }
          console.log(chalk.green('todo deleted successfully'));
        });
      break;
      case 'last':
      fs.readFile(path_todo, 'utf8', function (err, data) {

        if (err) {
            throw err;
        }

        var lines = data.split(/\n/);
        fs.unlinkSync(path_todo, function (err) {
          if (err) {
            throw err;
          }
        });
        for(let i = 0 ; lines.length - 3 >= i ; i++) {
          if(i !== lines.length - 1) {
            lines[i] += '\n';
          }
          fs.appendFile(path_todo, lines[i], function (err) {
            if (err) {
                throw err;
            }
          });
        }
        console.log(chalk.green('todo deleted successfully'));
      });
      break;
      //argが数値の場合に分岐する。その行を削除する。ユーザーからは利用不可で、内部的にのみ利用
      default:
      fs.readFile(path_todo, 'utf8', function (err, data) {

        if (err) {
            throw err;
        }

        var lines = data.split(/\n/);
        fs.unlinkSync(path_todo, function (err) {
          if (err) {
            throw err;
          }
        });
        for(let i = 0 ; lines.length - 1 >= i ; i++) {
          if(i !== arg - 1){
            if(i !== lines.length - 1) {
              lines[i] += '\n';
            }
            fs.appendFile(path_todo, lines[i], function (err) {
              if (err) {
                  throw err;
              }
            });
          }
        }
        console.log(chalk.green('todo deleted successfully'));
      });
    }
  });
}

exports.moveFile = function(args1, args2) {
    fs.readFile(path_todo, 'utf8', function (err, data) {
      if (err) {
          throw err;
      }
      var lines = data.split(/\n/);
      if(args2 === 'up') {
        if(args1 <= 1 || args1 > lines.length - 2) {
          console.log(chalk.red('invalid number'));
          return;
        }
      } else if(args2 === 'down') {
        if(args1 >= lines.length - 2) {
          console.log(chalk.red('invalid number'));
          return;
        }
      }
      fs.unlink(path_todo, function (err) {
        if (err) {
          throw err;
        } else {
          console.log(chalk.green('to do moved successfully'));
        }
        if(args2 === 'up') {
          for(let i = 0 ; lines.length - 1 >= i ; i++) {
              if(i !== lines.length - 1 && i !== args1 - 1 && i !== args1) {
                lines[i] += '\n';
              }
              if(i === args1 - 1) {
                if(args1 !== lines.length - 1) {
                  lines[args1] += '\n';
                }
                fs.appendFile(path_todo, lines[args1], function (err) {
                  if (err) {
                      throw err;
                  }
                });
            } else if(i === args1) {
              if(args1 - 1 !== lines.length - 1) {
                lines[args1 - 1] += '\n';
              }
              fs.appendFile(path_todo, lines[args1 - 1], function (err) {
                if (err) {
                    throw err;
                }
              });
            } else {
              fs.appendFile(path_todo, lines[i], function (err) {
                if (err) {
                    throw err;
                }
              });
            }
          }
        } else if(args2 === 'down') {
          for(let i = 0 ; lines.length - 1 >= i ; i++) {
              if(i !== lines.length - 1 && i !== args1 + 1 && i !== args1) {
                lines[i] += '\n';
              }
              if(i === args1 + 1) {
                if(args1 !== lines.length - 1) {
                  lines[args1] += '\n';
                }
                fs.appendFile(path_todo, lines[args1], function (err) {
                  if (err) {
                      throw err;
                  }
                });
            } else if(i === args1) {
              if(args1 + 1 !== lines.length - 1) {
                lines[args1 + 1] += '\n';
              }
              fs.appendFile(path_todo, lines[args1 + 1], function (err) {
                if (err) {
                    throw err;
                }
              });
            } else {
              fs.appendFile(path_todo, lines[i], function (err) {
                if (err) {
                    throw err;
                }
              });
            }
          }
        }
      });
    });
}
