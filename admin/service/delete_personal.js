const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient ,DeleteItemCommand } = require('@aws-sdk/client-dynamodb')
const client = new DynamoDBClient({
    region:'us-east-1'
})

async function delete_personal(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.token || !requestBody.params) {
        return util.buildResponse(401, {
            message : "Faltan datos"
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const params = requestBody.params;
    const verification = auth.verifyToken(nombre_discoteca_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }
    if (params == null || params.rango === "" || params.dni === ""){
        return util.buildResponse(401, 'revise el rango, correo o dni');
    }


    const deletePersonalResponse = await deletePersonal(nombre_discoteca_token.toLowerCase().trim(),params);
    if (deletePersonalResponse.httpStatusCode !== 200) {
        return util.buildResponse(503, {message : "Error en el servidor. Porfavor intente luego", response: deletePersonalResponse});
    }
    return util.buildResponse(200 , {response : deletePersonalResponse});
}

async function deletePersonal(nombre_discoteca , params) {
    let dynamodbTable = "";

    if (params.rango === "coordinador") {
        dynamodbTable = "t_discoteca_coordinadores"
    }
    else if (params.rango === "cabeza") {
        dynamodbTable = "t_discoteca_cabezas"
    }
    else if (params.rango === "promotor") {
        dynamodbTable = "t_discoteca_promotores"
    }

    const input = {
        Key: {
            "nombre_discoteca": {
                "S": nombre_discoteca
            },
            "dni": {
                "S":params.dni
            }
        },
        TableName: dynamodbTable
    }
    const  command = new DeleteItemCommand(input);
    const response = await client.send(command);
    return response.$metadata;
}

module.exports.delete_personal = delete_personal;