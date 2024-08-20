const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({
    region:'us-east-1'
});
const eventTable = 't_discoteca_eventos';

async function evento_disponible(requestBody){
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.token) {
        return util.buildResponse(401, {
            message :'Faltan datos'
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const dni_token = requestBody.dni;
    const token = requestBody.token;
    
    const verification = auth.verifyToken(nombre_discoteca_token,dni_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    const eventosDisponiblesResponse = await getEventosDisponibles(nombre_discoteca_token.toLowerCase().trim());

    if (!eventosDisponiblesResponse) {
        return util.buildResponse(503, { message: 'Error en el servidor. Porfavor intente luego.'})
    }

    return util.buildResponse(200, {eventos: eventosDisponiblesResponse});
}

async function getEventosDisponibles(nombre_discoteca) {
    const input = {
        ExpressionAttributeValues: {
            ":v1":{
                "S":nombre_discoteca
            }
        },
        TableName: eventTable,
        KeyConditionExpression: "nombre_discoteca = :v1", // Modify this according to your table schema
    };
    const command = new QueryCommand(input);
    const response =  await client.send(command);
    console.log(response);

    const Items = response.Items;
    const selected_items = [];

    if (Items !== null){
        for (let i = 0; i < Items.length ; i++){
            if (Items[i].estado.S !== "finalizado"){
                selected_items.push(unmarshall(Items[i]));
            }
        }
    }
    return selected_items;
}

module.exports.evento_disponible = evento_disponible;
