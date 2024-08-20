const { DynamoDBClient, GetItemCommand} = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region: 'us-east-1'
})


const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth');

async function login_personal(user) {

    let table = '';

    const rango = user.rango;
    const nombre_discoteca = user.nombre_discoteca;
    const correo = user.correo;
    const dni = user.dni;
    
    if (!user || !rango || !nombre_discoteca || !correo || !dni) {
        return util.buildResponse(401, {
            message : 'Todos los parametros son necesarios'
        })
    }


    if (rango == 'coordinador'){
        table = 't_discoteca_coordinadores'
    }
    else if(rango == 'cabeza'){
        table = 't_discoteca_cabezas'
    }
    else if(rango == 'promotor'){
        table = 't_discoteca_promotores'
    }
    else if(rango == 'staff'){
        table = 't_discoteca_staff'
    }

    const dynamoUser = await getPersonal(table,nombre_discoteca,dni);
    console.log(dynamoUser);
    if (!dynamoUser) {
        return util.buildResponse(403, { message : rango + ' no existe'});
    }
    
    if (dynamoUser.correo !== correo) {
        return util.buildResponse(403,{ message: "correo o contrasena no coincide"});
    }

    const user_info = {
        nombre_discoteca: dynamoUser.nombre_discoteca,
        correo: dynamoUser.correo,
        dni : dynamoUser.dni,
		rango : rango
    }
    console.log(user_info);
    const token = auth.generateToken(user_info);
    const response = {
        user: user_info,
        token: token
    }
    console.log(user_info);
    console.log(token);
    return util.buildResponse(200,response)
}

async function getPersonal(table,nombre_discoteca,dni) {
    const input = {
        TableName: table,
        Key: {
            'nombre_discoteca':{
                "S":nombre_discoteca
            },
            'dni' : {
                "S":dni
            }
        }
    }
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    
    if (response.Item === null) {
        return null;
    }
    else {
        return unmarshall(response.Item);    
    }
}

module.exports.login_personal = login_personal;
