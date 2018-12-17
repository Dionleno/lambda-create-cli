
var fs = require("fs");
var { showMessageLog } = require("./helpers");
var { tagName, tagUpdate, tagUpdateRequest } = require("./cli");

module.exports.load = () => {
  var _paramsCLI = process.argv;

  var typeActions = ['create', 'update', 'get', 'getall', 'delete'];
  if (_paramsCLI.length <= 2) {
    showMessageLog(`[ERROR] comando inválido, veja os comandos abaixo`, 'error');
    var readStream = fs.readFileSync(`${__dirname}/__generate/cmd.txt`, 'utf8');
  }
  else {

    // Params list
    find = _paramsCLI.filter(e => e.includes('--'));

    if (find.length > 0) {
      find.includes('--name') && tagName(_paramsCLI, find, typeActions);
      if (find.includes('--update')) {
        !find.includes('--noService') && tagUpdate(_paramsCLI, find, typeActions, 'services');
        !find.includes('--noRequest') && tagUpdateRequest(_paramsCLI, find, typeActions, 'requests');
      }

    } else {
      showMessageLog(`[ERROR] comando inválido, varifique o comando e tente novamente!`, 'error');
    }
  }
}


this.load();