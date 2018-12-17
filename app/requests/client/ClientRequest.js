'use strict'
const ClientService = require('../../services/ClientService');
const ClientModel = require('../../model/ClientModel');
const { genericResponse, genericResponseError,convertToNumber,extractPaginationParameters } = require("../../utils/utils");

// save
module.exports.create = async (event, context) => {
  try {
    // programming logic
    await ClientService.CreateClient(client);
    return genericResponse(200); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}

// update
module.exports.update = async (event, context) => {
  try {
    // programming logic
    let clientid = await convertToNumber(event.pathParameters.clientid, 'clientid');
    await ClientService.UpdateClient(client,clientid);
    return genericResponse(204); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}

// lists by ID
module.exports.get = async (event, context) => {
  try {
    // programming logic
    let clientid = await convertToNumber(event.pathParameters.clientid, 'clientid');
    let Client = await ClientService.GetClient(clientid);
    return genericResponse(201, Client); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}

// lists all
module.exports.getAll = async (event, context) => {
  try {
    // programming logic
    let pagination = extractPaginationParameters(event);    
    let Client = await ClientService.GetAllClient(pagination.offset, pagination.limit);
    return genericResponse(201, Client); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}

// delete
module.exports.delete = async (event, context) => {
  try {
    // programming logic
    let clientid = await convertToNumber(event.pathParameters.clientid, 'clientid');
    await ClientService.DeleteClient(clientid);
    return genericResponse(204); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}
// save
module.exports.createListar = async (event, context) => {
  try {
    // programming logic
    await ListarService.CreateListar(listar);
    return genericResponse(200); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}

// save
module.exports.createListarUsers = async (event, context) => {
  try {
    // programming logic
    await ListarUsersService.CreateListarUsers(listarusers);
    return genericResponse(200); // return success 
  } catch (error) {
    // return exception
    return genericResponseError(400, error);
  }
}
