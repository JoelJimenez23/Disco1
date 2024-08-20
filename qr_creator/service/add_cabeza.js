const util = require('../utils/util');
const auth = require('../utils/auth');
const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function add_cabeza(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.rango || !requestBody.token || !requestBody.dni_cabeza) {
        return util.buildResponse(401, { response: "Faltan datos"});
    }
    if (requestBody.dni === requestBody.dni_cabeza) {
        return util.buildResponse(401, { response: "No te puedes agregar a ti mismo -_-"});
    }
    if (requestBody.rango !== 'coordinador') {
        return util.buildResponse(401, { response : "Ingrese un rango valido"});
    }

    const nombre_discoteca = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const rango = requestBody.rango;
    const token = requestBody.token;
    const dni_cabeza = requestBody.dni_cabeza;

    const verifyTokenPromotor = auth.verifyTokenAddCabeza(nombre_discoteca,dni,rango,token);
    if (!verifyTokenPromotor.verified) {
        return util.buildResponse(401, { response: "datos contrastan con token"});
    }

    const getCabezaResponse = await getCabeza(nombre_discoteca,dni_cabeza);
    if(getCabezaResponse == null){
        return util.buildResponse(401, {response: "cabeza no existe"});
    }

    const getCabezaItemResponse = await getCabezaItem(nombre_discoteca,dni);
    if (getCabezaItemResponse == null) {
        const putCabezaNewResponse = await putCabezaNew(nombre_discoteca,dni,dni_cabeza);
        if (putCabezaNewResponse.$metadata.httpStatusCode !== 200) {
            return util.buildResponse(401, { response: "problemas en funcion putCabezaNew"});
        }
    }
    else {
        const putCabezaExistsResponse = await putCabezaExists(nombre_discoteca,dni,dni_cabeza);
        if (putCabezaExistsResponse.$metadata.httpStatusCode !== 200) {
            return util.buildResponse(401, { response : "problemas en funcion putCabezaExists"})
        }
    }

    const putSuperiorResponse = await putSuperior(nombre_discoteca,dni,dni_cabeza);
    if (putSuperiorResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(401, { response : "problemas en funcion putSuperior"});
    }

    return util.buildResponse(503, { response:  "Agregado Exitosamente"});

}

async function getCabeza(nombre_discoteca,dni_cabeza) {
    const input = {
        TableName: "t_discoteca_cabezas",
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni_cabeza
            }
        }
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);

    return response.Item;
}

async function getCabezaItem(nombre_discoteca,dni){
    const input = {
        TableName: "t_discoteca_coordinadores",
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

    return response.Item.cabezas;
}


async function putCabezaExists(nombre_discoteca,dni,dni_cabeza){
    const input = {
        TableName: "t_discoteca_coordinadores",
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni
            }
        },
        UpdateExpression: "ADD cabezas :val",
        ExpressionAttributeValues : {
            ":val": {
                "SS": [dni_cabeza]
            }
        }
    };
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}

async function putCabezaNew(nombre_discoteca,dni,dni_cabeza){
    const input = {
        TableName: "t_discoteca_coordinadores",
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni
            }
        },
        UpdateExpression: "SET cabezas = :val",
        ExpressionAttributeValues : {
            ":val": {
                "SS": [dni_cabeza]
            }
        }
    };
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}

async function putSuperior(nombre_discoteca,dni,dni_cabeza){
    const input = {
        TableName: 't_discoteca_cabezas',
        Key: {
            "nombre_discoteca": {
                "S":nombre_discoteca
            },
            "dni": {
                "S":dni_cabeza
            }
        },
        UpdateExpression: "SET encargado = :val",
        ExpressionAttributeValues: {
            ":val": {
                "S": dni
            }
        }
    }
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
}

module.exports.add_cabeza = add_cabeza;