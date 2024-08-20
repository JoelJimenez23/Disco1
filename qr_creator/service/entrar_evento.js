const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function entrar_evento(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.token || !requestBody.rango || !requestBody.eventoId || !requestBody.nameEvento){
        return util.buildResponse(401, { message: "Faltan datos"});
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const dni_token = requestBody.dni;
    const rango = requestBody.rango;
    const token = requestBody.token;
    const eventoId =requestBody.eventoId;
    const nameEvento = requestBody.nameEvento;

    const verification = auth.verifyToken(nombre_discoteca_token,dni_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    let dynamodbTable = '';
    if (rango === 'promotor') {
        dynamodbTable = 't_discoteca_promotores';
    }
    else if (rango === 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }
    else if (rango === 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores';
    }
    // Object.keys(getEventoResponse).length !== 0
    const getEventoResponse = await getEvento(nombre_discoteca_token,dni_token,dynamodbTable,eventoId);
    if (getEventoResponse !== null && getEventoResponse !== undefined) {
        return util.buildResponse(401,{response : getEventoResponse});
    }

    const qrs_limite = await getLimQrs(nombre_discoteca_token,eventoId,rango);
    console.log("QRS LIMITE");
    console.log(qrs_limite);
    if(!qrs_limite){
        return util.buildResponse(503, {message: "error del sv", response : qrs_limite});
    }

    let qrs_gen = unmarshall(qrs_limite.M);
    qrs_gen = resetValuesToZero(qrs_gen);
    console.log(qrs_gen);
    const marshal_qrs_gen = marshall(qrs_gen); // qrs_limite val en 0

    console.log(marshal_qrs_gen);

    const eventoFecha = await getFecha(nombre_discoteca_token.toLowerCase().trim(),eventoId);

    const entrarEventoResponse = await entrarEvento(nombre_discoteca_token.toLowerCase().trim(),dni_token,dynamodbTable,eventoId,qrs_limite,marshal_qrs_gen,nameEvento,eventoFecha);
    if (entrarEventoResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(503, { message: "Error en el servido. Porfavor intente luego, funcion entrarEvento", response: entrarEventoResponse});
    }

    const putPersonalEventoResponse = await putPersonalEvento(nombre_discoteca_token.toLowerCase().trim(),dni_token,rango,eventoId);
    if (putPersonalEventoResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(503, { message: "Error en el servidor, fucion putPersonalEventoREsponse", response : putPersonalEventoResponse});
    }


    return util.buildResponse(200, {response : "Entraste al evento!!!"});
}

async function getLimQrs(nombre_discoteca,eventoId,rango) {
    const input = {
        TableName: "t_discoteca_eventos",
        Key:{
            "nombre_discoteca" : {
                "S":nombre_discoteca
            },
            "id": {
                "S": eventoId
            }
        },
        ProjectionExpression: "qrs_rango"
    }

    const command = new GetItemCommand(input);
    const response = await client.send(command);
    const value = (response.Item).qrs_rango.M[rango];
    console.log(value);
    return value;
}


async function getFecha(nombre_discoteca,eventoId) {
    const input = {
        TableName: "t_discoteca_eventos",
        Key:{
            "nombre_discoteca" : {
                "S":nombre_discoteca
            },
            "id": {
                "S": eventoId
            }
        },
        ProjectionExpression: "fecha"
    }

    const command = new GetItemCommand(input);
    const response = await client.send(command);
    
    if (response.Item === null) {
        return null;
    }
    else {
        return unmarshall(response.Item).fecha;    
    }
}

async function getEvento(nombre_discoteca,dni,dynamodbTable,eventoId){
    const input = {
        TableName: dynamodbTable,
        Key: {
            'nombre_discoteca': {
                "S":nombre_discoteca
            },
            'dni': {
                "S":dni
            }
        },
        ProjectionExpression: "eventos"
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    console.log("reponse ", response);
    const data = unmarshall(response.Item).eventos;
    console.log(data);
    return data[eventoId];    // se puede modificar para luego insertar el nombre dentro del array que va en las estadisticas del evento
}

function resetValuesToZero(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = "0";
      }
    }
    return obj;
  }
// falta registrar en la tabla del evento 
async function entrarEvento(nombre_discoteca,dni,dynamodbTable,eventoId,limite_qrs,marshal_qrs_gen,nameEvento,eventoFecha){
    const input = {
        TableName: dynamodbTable,
        Key: {
            "nombre_discoteca": {
                "S": nombre_discoteca
            },
            "dni": {
                "S": dni
            }
        },
        UpdateExpression: "SET eventos.#eventosKey = :eventosValue", 
        ExpressionAttributeNames: {
            "#eventosKey": eventoId, 
        },
        ExpressionAttributeValues: {
            ":eventosValue": {
                "M": {
                    "QRS": {
                        "M": {}
                    },
                    "QRS_Limite":{
                        "M": limite_qrs.M
                    },
                    "QRS_GEN":{
                        "M":marshal_qrs_gen
                    },
                    "Nombre": {
                        "S": nameEvento
                    },
                    "Fecha": {
                        "S": eventoFecha
                    }
                } 
            }
        }
    }
    console.log(input);
    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    console.log("entrarEventoResponse: ");
    console.log(response);

    return response;
}


async function putPersonalEvento(nombre_discoteca,dni,rango,eventoId) {
    const input_2 = {
        TableName: "t_discoteca_eventos",
        Key: {
            "nombre_discoteca": {
                "S": nombre_discoteca
            },
            "id": {
                "S": eventoId
            }
        },
        UpdateExpression: "ADD estadisticas.personal  :val",
        ExpressionAttributeValues: {
            ":val": { "SS": [dni + '/' + rango] } 
        }
    }
    const command_2 = new UpdateItemCommand(input_2);
    const response_2 = await client.send(command_2);
    return response_2;

}


module.exports.entrar_evento = entrar_evento;

