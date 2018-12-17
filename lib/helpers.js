var fs = require("fs");

module.exports.checkDirectorySync = (directory) => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}

module.exports.camelize = (str) => {
  return str.replace(/\W+(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });
}

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
module.exports.showMessageLog = (mensage, type) => {
  const TP_ANSI_FG_RED = "\x1b[31m";
  const TP_ANSI_FG_GREEN = "\x1b[32m";
  if (type === 'success') console.log(TP_ANSI_FG_GREEN, mensage, '\x1b[0m');
  if (type === 'error') console.log(TP_ANSI_FG_RED, mensage, '\x1b[0m');
  if (type === undefined) console.log('\x1b[33m', mensage, '\x1b[0m');
}
