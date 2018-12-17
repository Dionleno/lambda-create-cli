'use strict';

module.exports.genericResponse = (status, message) => {
    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message }),
    };
}


module.exports.genericResponseError = (status, err) => {
    let message = (!(err.message == undefined || err.message == '' || err.message == null)) ? err.message : err;

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message }),
    };
}

module.exports.convertToNumber = async (value, field) => {
    if (value && value != 'undefined') {
        if (!isNaN(value)) {
            return parseInt(value);
        } else {
            throw new Error(`${field} não deve ser alfanumerico`);
        }
    } else {
        throw new Error(`${field} não deve ser nulo ou indefinido`);
    }
}

module.exports.extractPaginationParameters = async(event) => {
    const queryOptions = event['queryStringParameters']  || { queryStringParameters:{} };
    const offset = queryOptions['offset'] || 0;
    const limit = queryOptions['limit'] || 100;
    return {
        offset: offset,
        limit: limit
    };
}