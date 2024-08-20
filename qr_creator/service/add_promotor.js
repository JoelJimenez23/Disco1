const util = require('../utils/util');
const auth = require('../utils/auth');
const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function add_promotor(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.rango || !requestBody.token || !requestBody.dni_promotor) {
        return util.buildResponse(401, {response : "Faltan datos"});
    }
    // if (requestBody.dni === requestBody.dni_promotor) {
    //     return util.buildResponse(401, { response: "No te puedes agregar a ti mismo -_-"});
    // }
    if (requestBody.rango !== 'coordinador' && requestBody.rango !== 'cabeza') {
        return util.buildResponse(401, { response : "No estas autorizado"});
    }


    const nombre_discoteca = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const rango = requestBody.rango;
    const token = requestBody.token;
    const dni_promotor = requestBody.dni_promotor;

    const verifyTokenAddPromotor = auth.verifyTokenAddPromotor(nombre_discoteca,dni,rango,token);
    if (!verifyTokenAddPromotor.verified) {
        return util.buildResponse(401, { response: "datos contrastan con token",token:verifyTokenAddPromotor});
    }

    const getPromotorResponse = await getPromotor(nombre_discoteca,dni_promotor);
    console.log(getPromotorResponse);
    if(getPromotorResponse == null){
        return util.buildResponse(401, {response: "promotor no existe"});
    }


    const getPromotorItemResponse = await getPromotorItem(nombre_discoteca,dni,rango);
    if (getPromotorItemResponse == null) {
        const putPromotorNewResponse = await putPromotorNew(nombre_discoteca,dni,rango,dni_promotor);
        if (putPromotorNewResponse.$metadata.httpStatusCode !== 200) {
            return util.buildResponse(401, { response : "problemas en funcion putPromotorNew"});
        }
    }
    else {
        const putPromotorExistsResponse = await putPromotorExists(nombre_discoteca,dni,rango,dni_promotor);
        if (putPromotorExistsResponse.$metadata.httpStatusCode !== 200) {
            return util.buildResponse(401, { response: "problemas en funcion putPromotorExists"});
        }
    }

    const putSuperiorResponse = await putSuperior(nombre_discoteca,dni,dni_promotor,rango);
    console.log(putSuperiorResponse);
    if (putSuperiorResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(401, { response : "problemas en funcion putSuperior", putSuperiorResponse: putSuperiorResponse});
    }

    return util.buildResponse(200, { response : "Agregado Exitosamente"});
}

async function getPromotor(nombre_discoteca,dni_promotor) {
    const input = {
        TableName: "t_discoteca_promotores",
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni_promotor
            }
        }
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    console.log(response);

    return response.Item;
}

async function getPromotorItem(nombre_discoteca,dni,rango){
    let dynamodbTable = '';
    if (rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores'
    }
    else if (rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas'
    }

    const input = {
        TableName: dynamodbTable,
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni
            }
        }
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);

    return response.Item.promotores;
}

async function putPromotorNew(nombre_discoteca,dni,rango,dni_promotor){
    let dynamodbTable = '';
    if (rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores'
    }
    else if (rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas'
    }
    
    const input = {
        TableName: dynamodbTable,
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni
            }
        },
        UpdateExpression: "SET promotores = :val",
        ExpressionAttributeValues : {
            ":val": {
                "SS": [dni_promotor]
            }
        }
    };
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}

async function putPromotorExists(nombre_discoteca,dni,rango,dni_promotor){
    let dynamodbTable = '';
    if (rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores'
    }
    else if (rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas'
    }
    
    const input = {
        TableName: dynamodbTable,
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni
            }
        },
        UpdateExpression: "ADD promotores :val",
        ExpressionAttributeValues : {
            ":val": {
                "SS": [dni_promotor]
            }
        }
    };
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}
async function putSuperior(nombre_discoteca,dni,dni_promotor,rango){
    const input = {
        TableName: 't_discoteca_promotores',
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni_promotor
            }
        },
        UpdateExpression: "SET encargado = :val", // modificar entrar evento si es que esto fucniona
        ExpressionAttributeValues: {
            ":val": {
                "S": dni+'/'+rango
            }
        }
    }
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}

module.exports.add_promotor = add_promotor;