const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({
    region:'us-east-1'
});


const eventTable = 't_discoteca_eventos';


//parametros debe ir estado
async function listar_eventos(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.token || !requestBody.estado){
        return util.buildResponse(401, {
            message: 'Faltan datos'
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const estado = requestBody.estado;

    const verification = auth.verifyToken(nombre_discoteca_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }
    if (estado === '' || estado === null){
        return util.buildResponse(401,'necesita ingresar el estado del evento');
    }

    const eventosResponse = await getEventos(nombre_discoteca_token.toLowerCase().trim(),estado);

    console.log("EVENTOS" , eventosResponse);

    if (!eventosResponse) {
        return util.buildResponse(503, { message: 'Error en el servidor. Porfavor intente luego.'})
    }

    return util.buildResponse(200, {eventos:eventosResponse});
}

async function getEventos(nombre_discoteca,estado) {
    const input = {
        ExpressionAttributeValues: {
            ":v1":{
                "S":nombre_discoteca
            }
        },
        TableName: eventTable,
        KeyConditionExpression: "nombre_discoteca = :v1", 
    };
    const command = new QueryCommand(input);
    const response =  await client.send(command);

    const Items = response.Items;
    const selected_items = [];

    if (Items !== null){
        for (let i = 0; i < Items.length ; i++){
            if (Items[i].estado.S == estado){
                selected_items.push(unmarshall(Items[i]));
            }
        }
    }


    return selected_items;
}



module.exports.listar_eventos = listar_eventos;