
var fs = require("fs");
var { showMessageLog } = require("./helpers");
var { generateModel, generateService, generateRequest, generateClasses } = require("./generate");

module.exports.load = () => {
  var _name, _noModel, _noSchema, _noService;
  var _paramsCLI = process.argv;
  var _path;
  var _find, _actions = [];
  var typeActions = ['create', 'update', 'get', 'getall', 'delete'];
  if (_paramsCLI.length <= 2) {
    showMessageLog(`[ERROR] comando inválido, veja os comandos abaixo`, 'error');
    var readStream = fs.readFileSync(`${__dirname}/__generate/cmd.txt`, 'utf8');
  }
  else {

    // Params list
    find = _paramsCLI.filter(e => e.includes('--'));

    if (find.length > 0) {
      if (find.includes('--name')) {

        _name = _paramsCLI[parseInt(_paramsCLI.indexOf('--name')) + 1];
        _path = find.includes('--path') && _paramsCLI[parseInt(_paramsCLI.indexOf('--path')) + 1];

        if (find.includes('--action')) {
          let _cmdActions = _paramsCLI[parseInt(_paramsCLI.indexOf('--action')) + 1];
          _actions = _cmdActions.split(',').filter((a) => a = typeActions);
        }
        generateClasses(_name, _path);
        !find.includes('--noModel') && generateModel(_name, _path)
        !find.includes('--noService') && generateService(_name, _actions, _path);
        !find.includes('--noRequest') && generateRequest(_name, _actions, _path);
      }
    } else {
      showMessageLog(`[ERROR] comando inválido, varifique o comando e tente novamente!`, 'error');
    }

    // generateModel(_name);
    // generateService(_name);
    // generateRequest(_name);
  }
}


this.load();