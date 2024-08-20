const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({
    region:'us-east-1'
});
const dynamodbTable = "t_discoteca_eventos";


async function mod_evento (requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.token || !requestBody.params) {
        return util.buildResponse(401 ,{
            message : "Faltan datos"
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const params = requestBody.params;

    const verification = auth.verifyToken(nombre_discoteca_token,token);
    if (!verification.verified) {
        return util.buildResponse(401,verification);
    }
    if (params === null || params.id === "" || params.key === "" || params.value === "") {
        return util.buildResponse(401, 'revise los parametros');
    } 
    const modEventoResponse = await modEvento(nombre_discoteca_token.toLowerCase().trim(), params);
    if (modEventoResponse.httpStatusCode !== 200) {
        return util.buildResponse(503, { message: "Error en el servido. Porfavor intente luego", response: modEventoResponse});
    }
    return util.buildResponse(200 , { response: modEventoResponse});
}

async function modEvento(nombre_discoteca, params) {
    let input;


    if (params.key == "nombre") { // cambiar nombre en s3
        input = {
            ExpressionAttributeNames: {
                "#nom": params.key,
                "#dir": "dir"
            },
            ExpressionAttributeValues: {
                ":n" :{
                    "S": params.value.toLowerCase().trim()
                },
                ":d" :{
                    "S": nombre_discoteca + '/' + params.value.toLowerCase().trim() + '.png'
                }
            },
            Key: {
                "nombre_discoteca":{
                    "S": nombre_discoteca
                },
                "id": {
                    "S": params.id
                }
            },
            TableName: dynamodbTable,
            UpdateExpression: "SET #nom = :n, #dir = :d"
        }
    }
    else {
        input = {
            ExpressionAttributeNames: {
                "#val": params.key
            },
            ExpressionAttributeValues: {
                ":q": {
                    "S":params.value.toLowerCase().trim()
                }
            },
            Key: {
                "nombre_discoteca": {
                    "S": nombre_discoteca
                },
                "id":{
                    "S":params.id
                }
            },
            TableName: dynamodbTable,
            UpdateExpression: "SET #val = :q"
        }
    }
    console.log(input);
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    return response.$metadata;
}

module.exports.mod_evento = mod_evento;