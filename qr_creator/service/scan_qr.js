const util = require('../utils/util');
const auth = require('../utils/auth');

const { DynamoDBClient, GetItemCommand , UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region: 'us-east-1'
});


// nombre_discoteca, eventoId, qr , correo_user , dni_user ,token

async function scan_qr(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.rango || !requestBody.eventoId || !requestBody.qr || !requestBody.correo_user || !requestBody.dni_user || !requestBody.token) {
        return util.buildResponse(401, { message : "Faltan datos"});
    }
    const nombre_discoteca = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const rango = requestBody.rango;
    const eventoId = requestBody.eventoId;
    const qr = requestBody.qr;
    const correo_user = requestBody.correo_user;
    const dni_user = requestBody.dni_user;
    const token = requestBody.token;

    const verifyTokenStaffResponse = auth.verifyTokenStaff(nombre_discoteca,dni,rango,token);
    if (!verifyTokenStaffResponse.verified) {
        return util.buildResponse(401, { message : 'datos contrastan con token',token : verifyTokenStaffResponse});
    }
    
    const getEventoResponse = await getEvento(nombre_discoteca,eventoId);
    if (getEventoResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(401, {message: 'problemas en funcion getEvento'});
    }

    const qrInfo = unmarshall(getEventoResponse.Item).estadisticas.QRS[qr]
    if (qrInfo == null){ 
        return util.buildResponse(401, {message: "QR no existe"});
    }
    if (qrInfo.scan == 'true'){
        return util.buildResponse(401, {message:'QR usado anteriormente'})
    }

    const userInfo = {
        correo : correo_user,
        dni: dni_user
    }

    const InsertDataQrResponse = await InsertDataQr(nombre_discoteca,eventoId,userInfo,qrInfo,qr);
    if (InsertDataQrResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(401, { message: 'problemas en InsertDataQr'});
    }

    const InsertScannedParamResponse = await InsertScannedParam(nombre_discoteca,eventoId,qr);
    if (InsertScannedParamResponse.$metadata.httpStatusCode !== 200) {
        return util.buildResponse(401,{message: 'problemas en InsertScannedParam'});
    }

    return util.buildResponse(200, { message: "QR VALIDO", "lista":qrInfo.t_lista});
}

async function getEvento(nombre_discoteca,eventoId) {
    const input = {
        TableName: "t_discoteca_eventos",
        Key: {
            "nombre_discoteca": {
                "S": nombre_discoteca
            },
            "id":{
                "S": eventoId
            }
        },
        ProjectionExpression: "estadisticas"
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    return response;
}

async function InsertScannedParam(nombre_discoteca,eventoId,qr){
    const input = {
        TableName: "t_discoteca_eventos",
        Key : {
            "nombre_discoteca": {"S":nombre_discoteca},
            "id": {"S":eventoId}
        },
        UpdateExpression: "SET estadisticas.QRS.#qrKey.#scanned = :scannedVal",
        ExpressionAttributeNames: {
            '#qrKey': qr,
            '#scanned': 'scan'
        },
        ExpressionAttributeValues:{
            ":scannedVal": {"S":'true'}
        }
    }


    const command = new UpdateItemCommand(input);
    const response = await client.send(command);

    return response;
}


async function InsertDataQr(nombre_discoteca,eventoId,userInfo,qrInfo,qr) {
    let dynamodbTable;
    if (qrInfo.rango == 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores';
    }
    else if (qrInfo.rango == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }
    else if (qrInfo.rango == 'promotor') {
        dynamodbTable = 't_discoteca_promotores';
    }

    const fechaActual = new Date();

    const input = {
        TableName : dynamodbTable,
        Key: {
            'nombre_discoteca': {
                "S": nombre_discoteca
            },
            'dni': {
                "S" : qrInfo.dni
            }
        },
        UpdateExpression : "SET eventos.#eventosKey.QRS.#qrKey.#f_scan = :f_scanVal, eventos.#eventosKey.QRS.#qrKey.#user_correo = :user_correoVal, eventos.#eventosKey.QRS.#qrKey.#user_dni = :user_dniVal",
        ExpressionAttributeNames: {
            '#eventosKey': eventoId,   
            '#qrKey': qr,
            '#f_scan': 'fecha_scan',
            '#user_correo': 'user_correo',
            '#user_dni': 'user_dni'
        },
        ExpressionAttributeValues: {
            ":f_scanVal": {
                "S": fechaActual
            },
            ":user_correoVal": {
              "S": userInfo.correo
            },
            ":user_dniVal": {
                "S": userInfo.dni
            }
        }
    }

    const input_2 = {
        TableName: "t_discoteca_eventos",
        Key : {
            "nombre_discoteca": {"S":nombre_discoteca},
            "id": {"S":eventoId}
        },
        UpdateExpression: "SET estadisticas.QRS.#qrKey.#scanned = :scannedVal",
        ExpressionAttributeNames: {
            '#qrKey': qr,
            '#scanned': 'scan'
        },
        ExpressionAttributeValues:{
            ":scannedVal": {"S":'true'}
        }
    }


    const command = new UpdateItemCommand(input);
    const response = await client.send(command);

    return response;
}

module.exports.scan_qr = scan_qr;