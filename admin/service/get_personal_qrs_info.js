const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function get_personal_qrs_info (requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.token || !requestBody.dni_rol || !requestBody.rol || !requestBody.eventoId) {
        return util.buildResponse(401, {
            message : "Faltan datos"
        })
    }
    const nombre_discoteca = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const dni_rol = requestBody.dni_rol;
    const rol = requestBody.rol;
    const eventoId = requestBody.eventoId;
    
    const verification = auth.verifyToken(nombre_discoteca,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }
    
    const GetQrsResponse = await GetQrs(nombre_discoteca,dni_rol,rol,eventoId);
    console.log(GetQrsResponse);
    if (GetQrsResponse == null) {
        return util.buildResponse(503 ,{ message : "Error en el servidor. Porfavor intente luego"});
    }
    return util.buildResponse(200, {qrs : GetQrsResponse});
}

async function GetQrs(nombre_discoteca,dni_rol,rol,eventoId) {
    let dynamodbTable = '';
    if (rol === 'promotor') {
        dynamodbTable = 't_discoteca_promotores';
    }
    else if (rol === 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }
    else if (rol === 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores';
    }

    const input = {
        TableName: dynamodbTable,
        Key: {
            'nombre_discoteca': {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni_rol
            }
        },
        ProjectionExpression: 'eventos.#eventId.#gen_qrs',
        ExpressionAttributeNames: {
            '#eventId': eventoId,
            "#gen_qrs": "QRS_GEN"
        }
    }

    const command = new GetItemCommand(input);
    const response = await client.send(command);

    const returned_value = unmarshall(response.Item);
    if (!returned_value || !returned_value.eventos || !returned_value.eventos[eventoId]) {
        return null; 
    } else {
        return returned_value.eventos[eventoId].QRS_GEN;
    }
    
    
}

module.exports.get_personal_qrs_info =  get_personal_qrs_info;