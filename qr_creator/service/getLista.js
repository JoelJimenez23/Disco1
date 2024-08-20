const util = require('../utils/util');
const auth = require('../utils/auth');


const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function get_lista(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.eventoId || !requestBody.token) {
        return util.buildResponse(401, { message : "Faltan datos"});
    }
    const nombre_discoteca = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const eventoId = requestBody.eventoId;
    const token = requestBody.token;

    const verification = auth.verifyToken(nombre_discoteca,dni,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    const getListitaResponse = await getListita(nombre_discoteca,eventoId);

    let response = []
    for (let i=0;i<getListitaResponse.length;i++) {
        if (getListitaResponse[i] !== 'total') {
            response.push(getListitaResponse[i]);
        }
    }

    return util.buildResponse(200,{ tipo_lista : response});
}


async function getListita(nombre_discoteca,eventoId) {
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
        ProjectionExpression: "tipo_lista"
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);    
    console.log("dentro de la funcion");
    console.log(response);
    const hola = Object.keys(response.Item.tipo_lista.M);

    return hola;
}
module.exports.get_lista = get_lista;