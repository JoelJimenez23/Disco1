const AWS = require('aws-sdk');
AWS.config.update({
    region : 'us-east-1'
})
const util = require('../utils/util');
const auth = require('./../utils/auth');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const cabezaTable = 't_discoteca_cabezas';

async function register_cabeza(requestBody) {
    if (!requestBody.cabeza || !requestBody.nombre_discoteca || !requestBody.token) {
        return util.buildResponse(401, {
            message: 'incorrect request body'
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const verification = auth.verifyToken(nombre_discoteca_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    const nombre_discoteca = requestBody.cabeza.nombre_discoteca;
    const dni = requestBody.cabeza.dni;
    const correo = requestBody.cabeza.correo;
    const telefono = requestBody.cabeza.telefono;
    const eventos = {};

    const cant_qrs = 100;


    if (!nombre_discoteca || !dni || !correo || !telefono ) {
        return util.buildResponse(401, {
            message : 'Los datos del cabeza deben estar completos'
        })
    }

    const dynamoCabeza = await getCabeza(nombre_discoteca.toLowerCase().trim(),dni);
    if (dynamoCabeza && dynamoCabeza.dni && dynamoCabeza.nombre_discoteca) {
        return util.buildResponse(401, { 
            message : 'Existe un cabeza ya  registrado con ese dni'
        })
    }

    const cabeza = {
        nombre_discoteca: nombre_discoteca.toLowerCase().trim(),
        dni: dni,
        correo: correo,
        telefono: telefono,
        cant_qrs : cant_qrs,
        eventos: eventos,
        promotores: promotores
    }
    const saveCabezaResponse = await saveCabeza(cabeza);
    if (!saveCabezaResponse) {
        return util.buildResponse(503, { message: 'Error del servidor. Porfavor intente luego'});
    }
    return util.buildResponse(200, {cabeza: cabeza});
}



async function getCabeza(nombre_discoteca,dni) { 
    const params = {
        TableName: cabezaTable,
        Key: {
            nombre_discoteca : nombre_discoteca,
            dni: dni
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    },error => {
        console.log('There is an error: ',error);
    })
}


async function saveCabeza(cabeza) { 
    const params = {
        TableName: cabezaTable,
        Item: cabeza
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    },error => {
        console.log('There is an error saving cabeza: ', error);
    })
}
module.exports.register_cabeza = register_cabeza;

