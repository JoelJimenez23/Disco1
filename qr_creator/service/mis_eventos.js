const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function mis_eventos(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.rango || !requestBody.token) {
        return util.buildResponse(401, {message:"Faltan datos"})
    }
    const nombre_discoteca = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const rango = requestBody.rango;
    const token = requestBody.token;

    const verification = auth.verifyToken(nombre_discoteca,dni,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    let dynamodbTable;
    if (rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores';
    }
    else if (rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }
    else if (rango == 'promotor') {
        dynamodbTable = 't_discoteca_promotores';
    }

    const getMisEventosResponse = await getMisEventos(nombre_discoteca,dni,dynamodbTable);
    if (!getMisEventosResponse) {
        return util.buildResponse(503, { message : "error en el servidor. Por favor intente luego, problema en get mis eventos"});
    }
    return util.buildResponse(200, {misEventos: getMisEventosResponse});
}

async function getMisEventos(nombre_discoteca,dni,dynamodbTable) {
    const input = {
        TableName: dynamodbTable,
        Key: {
            'nombre_discoteca': {
                "S":nombre_discoteca
            },
            'dni': {
                "S":dni
            }
        },
        ProjectionExpression: "eventos"
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    const data = unmarshall(response.Item).eventos;
    const clavePrincipal = Object.keys(data);
    
    const json_info = {};
    
    for (let i=0;i<clavePrincipal.length;i++){
        console.log(i)
        json_info[clavePrincipal[i]] = {
            "nombre":data[clavePrincipal[i]].Nombre, 
            "fecha": data[clavePrincipal[i]].Fecha  
        }
    }
    return json_info;
}
module.exports.mis_eventos = mis_eventos;