
var { generateModel, generateService, generateRequest, generateClasses, buildService, buildRequest } = require("./generate");
var { showMessageLog } = require("./helpers");
var fs = require("fs");

module.exports.tagName = (_paramsCLI, find, typeActions) => {
  var _name, _path;
  var _actions = [];
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

module.exports.tagUpdate = (_paramsCLI, find, typeActions) => {
  var _name, _path, _pathAll;
  var _actions = [];
  var extension;

  _name = _paramsCLI[parseInt(_paramsCLI.indexOf('--update')) + 1];
  _path = find.includes('--path') && _paramsCLI[parseInt(_paramsCLI.indexOf('--path')) + 1];
  _add = find.includes('--add') && _paramsCLI[parseInt(_paramsCLI.indexOf('--add')) + 1];
  if (find.includes('--actionType')) {
    let _cmdActions = _paramsCLI[parseInt(_paramsCLI.indexOf('--actionType')) + 1];
    _actions = _cmdActions.split(',').filter((a) => a = typeActions);
  }

  if (!_add) {
    showMessageLog(`[ERROR] comando inválido. Utilize o [--add newFunction] para adicionar a nova função ao arquivo existente.`, 'error');
  } else if (_actions.length < 0) {
    showMessageLog(`[ERROR] comando inválido. Qual o [--actionType]('create', 'update', 'get', 'getall', 'delete')? Selecione apenas um.`, 'error');
  } else {
    _pathAll = `${_path && _path + '/'}services/${_name}Service.js`;
    fs.exists(_pathAll, (exists) => {
      if (exists) {
        var readStream = fs.readFileSync(_pathAll, 'utf8');
        if (readStream.includes(`${this.jsUcfirst(_add)}`)) {
          showMessageLog(`[ERROR] A função ${this.jsUcfirst(_add)} já existe em ${_pathAll}.`, 'error');
        } else {
          var read = fs.readFileSync(`${__dirname}/__generate/_services/${_actions[0]}.txt`, 'utf8');
          buildService(read, this.jsUcfirst(_add), _pathAll);
          showMessageLog(`[Updated] Atualizado função ${this.jsUcfirst(_add)} em ${_pathAll}`, 'success');
        }
      }
    });
  }

}
module.exports.tagUpdateRequest = (_paramsCLI, find, typeActions) => {
  var _name, _path, _pathAll;
  var _actions = [];
  _name = _paramsCLI[parseInt(_paramsCLI.indexOf('--update')) + 1];
  _path = find.includes('--path') && _paramsCLI[parseInt(_paramsCLI.indexOf('--path')) + 1];
  _add = find.includes('--add') && _paramsCLI[parseInt(_paramsCLI.indexOf('--add')) + 1];
  if (find.includes('--actionType')) {
    let _cmdActions = _paramsCLI[parseInt(_paramsCLI.indexOf('--actionType')) + 1];
    _actions = _cmdActions.split(',').filter((a) => a = typeActions);
  }

  if (!_add) {
    showMessageLog(`[ERROR] comando inválido. Utilize o [--add newFunction] para adicionar a nova função ao arquivo existente.`, 'error');
  } else if (_actions.length < 0) {
    showMessageLog(`[ERROR] comando inválido. Qual o [--actionType]('create', 'update', 'get', 'getall', 'delete')? Selecione apenas um.`, 'error');
  } else {
    _pathAll = `${_path && _path + '/'}requests/${_name.toLowerCase()}/${_name}Request.js`;
    fs.exists(_pathAll, (exists) => {
      if (exists) {
        var readStream = fs.readFileSync(_pathAll, 'utf8');
        if (readStream.includes(`module.exports.${_actions[0]}${this.jsUcfirst(_add)}`)) {
          showMessageLog(`[ERROR] A função ${_actions[0]}${this.jsUcfirst(_add)} já existe em ${_pathAll}`, 'error');
        } else {
          var read = fs.readFileSync(`${__dirname}/__generate/_requests/${_actions[0]}.txt`, 'utf8');
          buildRequest(read, this.jsUcfirst(_add), _pathAll, true);
          showMessageLog(`[Updated] Atualizado função ${_actions[0]}${this.jsUcfirst(_add)} em ${_pathAll}`, 'success');
        }
      }
    });
  }

}

module.exports.jsUcfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}