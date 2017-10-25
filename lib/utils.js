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
