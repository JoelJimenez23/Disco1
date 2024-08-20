const util = require('../utils/util');
const auth = require('../utils/auth');
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function get_subordinados(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.rango || !requestBody.rol || !requestBody.token ){
        return util.buildResponse(401, { response : 'Faltan datos'});
    }
    if (requestBody.rango !== 'coordinador' && requestBody.rango !== 'cabeza') {
        return util.buildResponse(401, { response : "No estas autorizado"});
    }

    if (requestBody.rango == 'cabeza' && requestBody.rol == 'cabezas') {
        return util.buildResponse(401, {response: "Solo puedes tener promotores"})
    } 

    const nombre_discoteca = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const rango = requestBody.rango;
    const token = requestBody.token;
    const rol = requestBody.rol;

    const verifyTokenPromotor = auth.verifyTokenAddPromotor(nombre_discoteca,dni,rango,token);
    if (!verifyTokenPromotor.verified) {
        return util.buildResponse(401, { response: "datos contrastan con token"});
    }
    
    const getSubordinadosResponse = await getSubordinados(nombre_discoteca,dni,rango,rol);

    return util.buildResponse(200, { response  : getSubordinadosResponse});

}

async function getSubordinados(nombre_discoteca,dni,rango,rol){
    let dynamodbTable;
    if (rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores';
    }
    else if (rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }

    const input = {
        TableName: dynamodbTable,
        Key: {
            'nombre_discoteca': {
                "S": nombre_discoteca
            },
            "dni": {
                "S": dni
            }
        },
        ProjectionExpression: rol
    }

    const command = new GetItemCommand(input);
    const response = await client.send(command);
    
    if (response.Item == '' || response.Item == undefined) {
        return null;
    }
    else if (rol == 'promotores') {
        return (response.Item).promotores.SS;
    }
    
    return (response.Item).cabezas.SS;
    
}

module.exports.get_subordinados = get_subordinados;