var maxlength = {
  "title" : 15,
  "detail_show": 10,
  "detail": 100,
}
exports.paddingTitle = function (title) {
  while(maxlength.title >= title.length) {
    title = title + '　';
  }
  return title;
}
