const { DynamoDBClient, ScanCommand} = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region: 'us-east-1'
})
const util = require('../utils/util');


async function list_disco() {
    const discos = await getDiscos();
    return util.buildResponse(200,{response : discos});
}

async function getDiscos() {
    const input = {
        TableName: "discotecas",
        ProjectionExpression: "nombre_discoteca"
    }

    const command = new ScanCommand(input);
    const response = await client.send(command);

    let hola = response.Items;
    let array = [""];
    console.log(hola.length);
    for( let i = 0;i < hola.length; i++){
        array.push(unmarshall(hola[i]).nombre_discoteca);
    }
    return array;
}

module.exports.list_disco = list_disco;
