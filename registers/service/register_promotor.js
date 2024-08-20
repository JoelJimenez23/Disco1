const AWS = require('aws-sdk');
AWS.config.update({
    region : 'us-east-1'
})
const util = require('../utils/util');
const auth = require('./../utils/auth');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const promotorTable = 't_discoteca_promotores';

async function register_promotor(requestBody) {
    if (!requestBody.promotor || !requestBody.nombre_discoteca || !requestBody.token) {
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

    const nombre_discoteca = requestBody.promotor.nombre_discoteca;
    const dni = requestBody.promotor.dni;
    const correo = requestBody.promotor.correo;
    const telefono = requestBody.promotor.telefono;
    const eventos = {};

    const cant_qrs = 50;


    if (!nombre_discoteca || !dni || !correo || !telefono) {
        return util.buildResponse(401, {
            message : 'Los datos del promotor deben estar completos'
        })
    }

    const dynamoPromotor = await getPromotor(nombre_discoteca.toLowerCase().trim(),dni);
    if (dynamoPromotor && dynamoPromotor.nombre_discoteca && dynamoPromotor.dni) {
        return util.buildResponse(401 , {
            message : 'Existe un promtor registrado con ese dni'
        })
    }

    const promotor = {
        nombre_discoteca : nombre_discoteca.toLowerCase().trim(),
        dni: dni,
        correo : correo,
        telefono : telefono,
        cant_qrs : cant_qrs,
        eventos : eventos
    }
    const savePromotorResponse = await savePromotor(promotor);
    if (!savePromotorResponse) {
        return util.buildResponse(503, { message : 'Error en el servidor. Porfavor intente luego'})
    }
    return util.buildResponse(200, {promotor: promotor});
}

async function getPromotor(nombre_discoteca,dni) { 
    const params = {
        TableName: promotorTable,
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


async function savePromotor(promotor) { 
    const params = {
        TableName: promotorTable,
        Item: promotor
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    },error => {
        console.log('There is an error saving promotor: ', error);
    })
}

module.exports.register_promotor = register_promotor;