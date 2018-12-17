
var fs = require("fs");
var { checkDirectorySync, showMessageLog, camelize } = require("./helpers");


module.exports.generateClasses = (name, newDirectory = '') => {
  if (newDirectory != '') {
    path = `${newDirectory}/utils/utils.js`;
    checkDirectorySync(`${newDirectory}`);
    checkDirectorySync(`${newDirectory}/utils`);

  } else {
    path = `utils/utils.js`
    checkDirectorySync('utils');
  }

  fs.exists(path, (exists) => {
    if (exists) showMessageLog(`[ERROR] O arquivo ${path} já existe`, 'error');
    else {
      var readStream = fs.readFileSync(`${__dirname}/__generate/_classes/_responses.txt`, 'utf8');
      var stream = fs.createWriteStream(path);
      stream.write(readStream);
      stream.end();
      showMessageLog(`[Created] ${path}`, 'success');
    }
  });

}

module.exports.generateModel = (name, newDirectory = '') => {
  var path;

  if (newDirectory != '') {
    path = `${newDirectory}/model/${name}Model.js`
    checkDirectorySync(`${newDirectory}`);
    checkDirectorySync(`${newDirectory}/model`);
  } else {
    path = `model/${name}Model.js`
    checkDirectorySync('model');
  }


  fs.exists(path, (exists) => {
    if (exists) showMessageLog(`[ERROR] O arquivo ${path} já existe`, 'error');
    else {
      var readStream = fs.readFileSync(`${__dirname}/__generate/_model.txt`, 'utf8');
      var templateModel = readStream.toString().replaceAll('$Model', `${camelize(name)}`);
      var stream = fs.createWriteStream(path);
      stream.write(templateModel);
      stream.end();
      showMessageLog(`[Created] ${path}`, 'success');
    }
  });
}

module.exports.generateService = (name, arrayActions = [], newDirectory = '') => {
  var path;
  if (newDirectory != '') {
    path = `${newDirectory}/services/${name}Service.js`;
    checkDirectorySync(`${newDirectory}`);
    checkDirectorySync(`${newDirectory}/services`);
  } else {
    path = `services/${name}Service.js`;
    checkDirectorySync('services');
  }

  fs.exists(path, (exists) => {
    if (exists) showMessageLog(`[ERROR] O arquivo ${path} já existe`, 'error');
    else {
      if (arrayActions.length > 0) {
        var readStream = fs.readFileSync(`${__dirname}/__generate/_services/dependence.txt`, 'utf8');
        this.buildService(readStream, name, path);
        setTimeout(() => {
          arrayActions.forEach(action => {
            var readStream = fs.readFileSync(`${__dirname}/__generate/_services/${action}.txt`, 'utf8');
            this.buildService(readStream, name, path);
          });
        }, 800);
        showMessageLog(`[Created] recursos ${arrayActions.join(',')}`, 'success');
      } else {
        var readStream = fs.readFileSync(`${__dirname}/__generate/_service.txt`, 'utf8');
        this.buildService(readStream, name, path);
      }
      showMessageLog(`[Created] ${path}`, 'success');
    }
  });
}

module.exports.generateRequest = (name, arrayActions = [], newDirectory = '') => {

  var path;
  if (newDirectory != '') {
    path = `${newDirectory}/requests/${name.toLowerCase()}/${name}Request.js`;
    checkDirectorySync(`${newDirectory}`);
    checkDirectorySync(`${newDirectory}/requests`);
    checkDirectorySync(`${newDirectory}/requests/${name.toLowerCase()}`);
  } else {
    path = `requests/${name.toLowerCase()}/${name}Request.js`;
    checkDirectorySync(`requests`);
    checkDirectorySync(`requests/${name.toLowerCase()}`);
  }

  fs.exists(path, (exists) => {
    if (exists) showMessageLog(`[ERROR] O arquivo ${path} já existe`, 'error');
    else {
      if (arrayActions.length > 0) {
        var readStream = fs.readFileSync(`${__dirname}/__generate/_requests/dependence.txt`, 'utf8');
        this.buildRequest(readStream, name, path);
        setTimeout(() => {
          arrayActions.forEach(action => {
            var readStream = fs.readFileSync(`${__dirname}/__generate/_requests/${action}.txt`, 'utf8');
            this.buildRequest(readStream, name, path);
          });
        }, 800);
        showMessageLog(`[Created] recursos ${arrayActions.join(',')}`, 'success');
      } else {
        var readStream = fs.readFileSync(`${__dirname}/__generate/_request.txt`, 'utf8');
        this.buildRequest(readStream, name, path)
      }
      showMessageLog(`[Created] ${path}`, 'success');
    }
  });
}


module.exports.buildService = (readStream, name, path) => {
  var templateModel = readStream.toString()
    .replaceAll('$Service', `${jsUcfirst(name)}`)
    .replaceAll('$ServiceParam', `${name.toLowerCase()}`);
  var stream = fs.createWriteStream(path, { 'flags': 'a' });
  stream.write(templateModel);
  stream.end();
}

module.exports.buildRequest = (readStream, name, path, update = false) => {
  var templateRequest = readStream.toString()
    .replaceAll('$RequestUpdate', update ? jsUcfirst(name) : '')
    .replaceAll('$RequestClass', `${name.toLowerCase()}`)
    .replaceAll('$Request', `${jsUcfirst(name)}`);
  var stream = fs.createWriteStream(path, { 'flags': 'a' });
  stream.write(templateRequest);
  stream.end();
}

jsUcfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}