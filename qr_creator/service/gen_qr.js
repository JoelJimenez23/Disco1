const util = require('../utils/util');
const auth = require('../utils/auth');
const  { v4:uuidv4 }  = require('uuid');


const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({
    region:'us-east-1'
});

// a la hora de generar un qr , se debe insertar en dos lugares,
//1. dentro de estadisticas en la tabla t_discoteca_eventos, se debe crear un a map llamado qrs
// ahi se inserta el codigo del qr como un map y dentro el rango y dni de la persona que lo genero

//2. dentro de la tabla del personal que lo creo en el apartados eventos, dentro del uuid del evento
// ahi estara uno de los qrs que genero, una vez el qr sea escaneado se agregara un apartado que diga
// escaneado y la fecha en la q fue escaneado


async function gen_qr(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.token || !requestBody.eventoId  || !requestBody.cant_qrs || !requestBody.t_lista || !requestBody.rango){
        return util.buildResponse(401, { message : "Faltan datos"});
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const dni_token = requestBody.dni;
    const token = requestBody.token;
    const eventoId = requestBody.eventoId;
    const cant_qrs =requestBody.cant_qrs;
    const t_lista = requestBody.t_lista;
    const rango = requestBody.rango;

    const verification = auth.verifyToken(nombre_discoteca_token,dni_token,token);
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }
    let dynamodbTable = "";

    if ( rango === 'promotor') {
        dynamodbTable = 't_discoteca_promotores'
    }
    else if ( rango === 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas'
    }
    else if ( rango === 'coordinador') {
        dynamodbTable = 't_discoteca_coordinadores'
    }

    let qrs = [];
    for (let i = 0;i < cant_qrs ; i++) {
        let qr = uuidv4();
        qrs.push(qr);
    }

    const qrs_lim_gen = await checkLimQrs(nombre_discoteca_token,dni_token,dynamodbTable,eventoId,t_lista);

    console.log('qrs_lim_gen',qrs_lim_gen);
    console.log('cant_qrs',cant_qrs);
    console.log('qrs_limite',qrs_lim_gen.qrs_limite);

    console.log('parseInt qrs gen', parseInt(qrs_lim_gen.qrs_gen));
    console.log('parseInt(qrs_lim_gen.qrs_gen_total)', parseInt(qrs_lim_gen.qrs_gen_total));

    console.log('-=======-');
    console.log(parseInt(qrs_lim_gen.qrs_gen) + cant_qrs, ' vamo ', parseInt(qrs_lim_gen.qrs_limite));

    if (parseInt(qrs_lim_gen.qrs_gen) + parseInt(cant_qrs) >  parseInt(qrs_lim_gen.qrs_limite)){

        return util.buildResponse(401,{message: " cantidad de qrs supera el limite, contacte con su administrador si puede obtener mas."})
    }

    if (parseInt(qrs_lim_gen.qrs_gen_total) + parseInt(cant_qrs) > parseInt(qrs_lim_gen.qrs_limite_total)) {
        return util.buildResponse(401,{message: "cantidad de qrs supera el limite, contacte con su administrador si puede obtener mas."})
    }

    const genQrResponse = await genQR(nombre_discoteca_token,dni_token,dynamodbTable, eventoId,qrs,t_lista,rango,qrs_lim_gen);

    if (!genQrResponse) {
        return util.buildResponse(503, { message: "Error en el servido. Porfavor intente luego", response: genQrResponse});
    }   

    return util.buildResponse(200, {response: genQrResponse, qrs: qrs});
}


async function checkLimQrs(nombre_discoteca,dni,dynamodbTable,eventoId,t_lista) {
    const input = {
        TableName: dynamodbTable,
        Key:{
            "nombre_discoteca":{
                "S":nombre_discoteca
            },
            "dni":{
                "S":dni
            }
        },
        ProjectionExpression: "eventos"
    }

    const command = new GetItemCommand(input);
    const response = await client.send(command);
    const response_1 = unmarshall(response.Item.eventos.M)[eventoId]

    console.log(response_1);


    const qrs_lim_gen = {
        qrs_gen: response_1.QRS_GEN[t_lista],
        qrs_gen_total : response_1.QRS_GEN.total,
        qrs_limite: response_1.QRS_Limite[t_lista],
        qrs_limite_total: response_1.QRS_Limite.total
    }
    console.log(qrs_lim_gen);
    return qrs_lim_gen;
}

async function genQR(nombre_discoteca,dni,dynamodbTable,eventoId,qrs,t_lista,rango,qrs_lim_gen){
    const len_qrs = qrs.length;
    const fechaActual = new Date();

    console.log("dentro de la funcion");
    console.log(qrs_lim_gen);


    let update_genQRS_lista = parseInt(qrs_lim_gen.qrs_gen) + len_qrs;
    update_genQRS_lista = update_genQRS_lista.toString();

    let update_genQRS_total = parseInt(qrs_lim_gen.qrs_gen_total) + len_qrs;
    update_genQRS_total = update_genQRS_total.toString();

    for (let i = 0; i< len_qrs ;i++) { // inserta dentro del personal.eventos.eventoID
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
            UpdateExpression: "SET eventos.#eventosKey.QRS.#newKey = :eventosValue", 
            ExpressionAttributeNames: {
                "#eventosKey": eventoId, 
                "#newKey": qrs[i] 
            },
            ExpressionAttributeValues: {
                ":eventosValue": { 
                    "M": {
                    "fecha_gen":{ 
                        "S": fechaActual
                    },//falta cambiar fecha
                    "t_lista": {
                        "S": t_lista
                    },
                    "fecha_scan":{
                        "S":""
                    }
                    } 
                } 
            }
        }
        const command = new UpdateItemCommand(input);
        const response = await client.send(command);
        if(response.$metadata.httpStatusCode !== 200){
            return response.$metadata;
        }

        const input_2 = {
            TableName: "t_discoteca_eventos", // inserta dentro de estadisticas.QRS
            Key: {
                'nombre_discoteca' :{
                    "S": nombre_discoteca
                },
                "id": {
                    "S": eventoId
                }
            },
            UpdateExpression : "SET estadisticas.QRS.#newQR = :qrValue",
            ExpressionAttributeNames: {
                "#newQR": qrs[i]
            },
            ExpressionAttributeValues: {
                ":qrValue": {
                    "M": {
                        "dni": {"S": dni},
                        "rango": {"S": rango},
                        "t_lista": {"S":t_lista}
                    }
                }
            }
        }
        const command_2 = new UpdateItemCommand(input_2);
        const response_2 = await client.send(command_2);
        if( response_2.$metadata.httpStatusCode !== 200){
            return response.$metadata;
        }
    }

    const input_3 = {
        TableName: dynamodbTable,
        Key: {
            'nombre_discoteca': {
                "S": nombre_discoteca
            },
            'dni': {
                "S": dni
            }
        },
        UpdateExpression: "SET eventos.#eventosKey.QRS_GEN.#tipo_lista = :newValue_gen , eventos.#eventosKey.QRS_GEN.#general = :newValueTotal",
        ExpressionAttributeNames: {
            "#tipo_lista": t_lista,
            "#eventosKey": eventoId,
            "#general": "total"
        },
        ExpressionAttributeValues: {
            ":newValue_gen" :{
                "S": update_genQRS_lista
            },
            ":newValueTotal": {
                "S":update_genQRS_total
            }
        }
    }

    const command_3 = new UpdateItemCommand(input_3);
    const response_3 = await client.send(command_3);

    if (response_3.$metadata.httpStatusCode !== 200){
        return response_3;
    }

    return true;
}

module.exports.gen_qr = gen_qr;

