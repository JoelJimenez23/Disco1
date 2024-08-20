const util = require('../utils/util');
const auth = require('../utils/auth');
const  { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb")
const client = new DynamoDBClient({
    region: 'us-east-1'
})

async function all_eventos(requestBody) {
    const eventos = await GetAllEventos();
    return util.buildResponse(200,{reponse : eventos});
}

async function GetAllEventos() {
    const input = {
        TableName: 't_discoteca_eventos',
        ExpressionAttributeNames: {
            "#id": "id",
            "#aforo": "aforo",
            "#nombre": "nombre",
            "#fecha": "fecha"
        },
        ProjectionExpression: "#id, #aforo, #nombre, #fecha"
    }
    const command = new ScanCommand(input);
    const response = await client.send(command);
    return response.Items;
}