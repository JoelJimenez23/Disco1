const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({
    region:'us-east-1'
});
async function modificar_qrs(requestBody) {
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
    if (params === null || params.rango === "" || params.dni === "" || params.cant === "") {
        return util.buildResponse(401, 'revise el rango, correo o dni');
    }
    const modQRresponse = await modQR(nombre_discoteca_token.toLowerCase().trim(),params);
    if (modQRresponse.httpStatusCode !== 200)  {
        return util.buildResponse(503, { message : "Error en el servidor. Porfavor intente luego", response: modQRresponse});
    }
    return util.buildResponse(200 , { response : modQRresponse});
}

async function modQR(nombre_discoteca, params) {
    console.log(params);
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
        ExpressionAttributeNames: {
            "#QR":"qrs"
        },
        ExpressionAttributeValues: {
            ":q" : {
                "S":params.cant
            }
        },
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni" :  {
                "S": params.dni
            }
        },
        TableName: dynamodbTable,
        UpdateExpression : "SET #QR = :q"
    }

    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    return response.$metadata;
}

module.exports.modificar_qrs = modificar_qrs;