const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function listar_personal_evento(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.token || !requestBody.eventoId) {
        return util.buildResponse(401, {message : 'Faltan datos'})
    }
    const nombre_discoteca = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const eventoId = requestBody.eventoId;

    const verification = auth.verifyToken(nombre_discoteca,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    const getPersonalResponse = await getPersonal(nombre_discoteca,eventoId);
    if (!getPersonalResponse) {
        return util.buildResponse(401,{response:getPersonalResponse});
    }
    return util.buildResponse(200,{personal:getPersonalResponse});
}

async function getPersonal(nombre_discoteca,eventoId){
    const input = {
        TableName: 't_discoteca_eventos',
        Key: {
            'nombre_discoteca': {
                "S":nombre_discoteca
            },
            "id": {
                "S":eventoId
            }
        },
        ProjectionExpression: "estadisticas.personal"
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    const array = response.Item.estadisticas.M.personal.SS;
    const todo = [];
    
    if (array.length == 0) { return null; }

    for (let i =0;i<array.length;i++) {
        if (array[i] !== ""){
            todo.push(array[i].split('/'));
        }
    }
    return todo;
}

module.exports.listar_personal_evento = listar_personal_evento;