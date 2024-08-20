// ingresar el id del evento, dentro de la tabla de un Personal, se vera los qrs generados para ese evento
const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, GetItemCommand} = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region: 'us-east-1'
})

async function evento_qrs(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.token || !requestBody.rango || !requestBody.eventoId) {
        return util.buildResponse(401, {
            message : "Faltan datos"
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const dni_token = requestBody.dni;
    const token = requestBody.token;
    const rango = requestBody.rango;
    const eventoId = requestBody.eventoId;

    const verification = auth.verifyToken(nombre_discoteca_token,dni_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }


    const getEventoQrsResponse = await getEventoQrs(nombre_discoteca_token.toLowerCase().trim(),dni_token,rango,eventoId);   

    if (!getEventoQrsResponse) {
        return util.buildResponse(503, { message: "Error en el servidor. Porfavor intente luego"});
    }

    return util.buildResponse(200, { qrs:getEventoQrsResponse});
}

async function getEventoQrs(nombre_discoteca,dni,rango,eventoId) {

    let dynamodbTable = '';

    if ( rango == 'promotor') {
        dynamodbTable = 't_discoteca_promotores';
    }
    else if ( rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }
    else if ( rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores'
    }

    console.log(dynamodbTable);
    const input = {
        TableName: dynamodbTable,
        Key:{
            "nombre_discoteca":{
                "S":nombre_discoteca
            },
            "dni":{
                "S":dni
            }
        },
        ProjectionExpression: "eventos"
    }

    console.log(input);
    const command = new GetItemCommand(input);
    const response = await client.send(command);

    const R_response = unmarshall(response.Item.eventos.M)[eventoId].QRS;
    return R_response;
}

module.exports.evento_qrs = evento_qrs;