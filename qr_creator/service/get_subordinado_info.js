const util = require('../utils/util');
const auth = require('../utils/auth');
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region:'us-east-1'
});

async function get_subordinado_info(requestBody) {
    if (!requestBody.nombre_discoteca || !requestBody.dni || !requestBody.rango || !requestBody.rol || !requestBody.dni_rol || !requestBody.token ) {
        return util.buildResponse(401 , { response : "Faltan datos"});
    }
    if (requestBody.rango === 'promotor') {
        return util.buildResponse(401, {response : 'No estas autorizado'});
    }

    const nombre_discoteca   = requestBody.nombre_discoteca;
    const dni = requestBody.dni;
    const rango = requestBody.rango;
    const rol = requestBody.rol;
    const dni_rol = requestBody.dni_rol;
    const token = requestBody.token;

    if (rango == 'cabeza') {
        const verifyTokenPromotor = auth.verifyTokenAddPromotor(nombre_discoteca,dni,rango,token);
        if (!verifyTokenPromotor) {
            return util.buildResponse(401, { response : 'datos no contrastan con el token y acceso, rango cabeza'});
        }
    }
    else if (rango == 'coordinador') {
        const verifyTokenAddCabeza = auth.verifyTokenAddCabeza(nombre_discoteca,dni,rango,token);
        if (!verifyTokenAddCabeza) { 
            return util.buildResponse(401, { response : 'datos no contrastan con el token y acceso, rango coordinador'});
        }
    }

    const getSubordinadoInfoResponse  = await getSubordinadoInfo(nombre_discoteca,dni_rol,rol);    
    return util.buildResponse(200, { response : {eventos_id : getSubordinadoInfoResponse[0] , eventos_info : getSubordinadoInfoResponse[1] }});
}

async function getSubordinadoInfo(nombre_discoteca,dni_rol,rol) {
    let dynamodbTable;
    if (rol == 'promotor') {
        dynamodbTable = 't_discoteca_promotores';
    }
    else if (rol == 'cabeza') {
        dynamodbTable = 't_discoteca_cabezas';
    }

    const input = {
        TableName : dynamodbTable, 
        Key: {
            'nombre_discoteca' : {
                "S": nombre_discoteca
            },
            "dni" : {
                "S" : dni_rol
            }
        },
        ProjectionExpression: "eventos"
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    
    const unmarshall_response = unmarshall(response.Item).eventos;
    const Keys_unmarshall_response = Object.keys(unmarshall_response);
    let json_data = {};
    
    for (let i=0;i< Keys_unmarshall_response.length;i++) {
        json_data[Keys_unmarshall_response[i]] = { 
            'QRS_GEN' : unmarshall_response[Keys_unmarshall_response[i]].QRS_GEN,
            'QRS_Limite': unmarshall_response[Keys_unmarshall_response[i]].QRS_Limite,
            'Nombre': unmarshall_response[Keys_unmarshall_response[i]].Nombre,
            'Fecha': unmarshall_response[Keys_unmarshall_response[i]].Fecha
        }
    }
    const r_response = [Keys_unmarshall_response,json_data];

    return r_response;
}

module.exports.get_subordinado_info = get_subordinado_info;