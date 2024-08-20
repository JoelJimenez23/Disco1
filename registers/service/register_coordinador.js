const AWS = require('aws-sdk');
AWS.config.update({
    region : 'us-east-1'
})
const util = require('../utils/util');
const auth = require('./../utils/auth');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const coordinadorTable = 't_discoteca_coordinadores';

async function register_coordinador(requestBody) {
    if (!requestBody.coordinador || !requestBody.nombre_discoteca || !requestBody.token) {
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


    const nombre_discoteca = requestBody.coordinador.nombre_discoteca;
    const dni = requestBody.coordinador.dni;
    const correo = requestBody.coordinador.correo;
    const telefono = requestBody.coordinador.telefono;
    const eventos = {};

    const cant_qrs = 150;


    if (!nombre_discoteca || !dni || !correo || !telefono){
        return util.buildResponse(401, {
            message: 'los datos del coordinador deben estar completos'
        })
    }

    const dynamoCoordinador = await getCoordinador(nombre_discoteca.toLowerCase().trim(),dni);
    if (dynamoCoordinador && dynamoCoordinador.dni &&  dynamoCoordinador.nombre_discoteca) {
        return util.buildResponse(401 , {
            message: 'Existe un  coordinador registrado con ese dni'
        })
    }

    const coordinador = {
        nombre_discoteca: nombre_discoteca.toLowerCase().trim(),
        dni: dni,
        correo: correo,
        telefono: telefono,
        cant_qrs: cant_qrs,
        eventos: eventos,
        cabezas: cabezas,
        promotores: promotores
    }
    const saveCoordinadorResponse = await saveCoordinador(coordinador);
    if (!saveCoordinadorResponse) {
        return util.buildResponse(503, { message: 'Error del servidor. Porfavor intente luego'});
    }
    return util.buildResponse(200, {coordinador:coordinador});

}

async function getCoordinador(nombre_discoteca,dni) { 
    const params = {
        TableName: coordinadorTable,
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

async function saveCoordinador(coordinador) { 
    const params = {
        TableName: coordinadorTable,
        Item: coordinador
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    },error => {
        console.log('There is an error saving coordinador: ', error);
    })
}
module.exports.register_coordinador = register_coordinador;

