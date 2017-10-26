var fs = require('fs');
var chalk = require('chalk');
var maxlength = {
  "title" : 15,
  "detail": 100,
}
exports.padding = function (title) {
  while(maxlength.title >= title.length) {
    title = title + '　';
  }
  return title;
}

exports.isExistFile = function(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') {
      console.log(chalk.red('No todo. add some todo first'));
      return false
    }
  }
}
