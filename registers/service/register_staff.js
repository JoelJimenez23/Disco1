const AWS = require('aws-sdk');
AWS.config.update({
    region : 'us-east-1'
})
const util = require('../utils/util');
const auth = require('./../utils/auth');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const staffTable = 't_discoteca_staff';

async function register_staff(requestBody) {
    if (!requestBody.staff || !requestBody.nombre_discoteca || !requestBody.token) {
        return util.buildResponse(401, {
            message : 'incorrect request body'
        })
    }
    const nombre_discoteca_token = requestBody.nombre_discoteca;
    const token = requestBody.token;
    const verification = auth.verifyToken(nombre_discoteca_token, token);
    if (!verification.verified) {
        return util.buildResponse(401 ,verification);
    }

    const nombre_discoteca = requestBody.staff.nombre_discoteca;
    const dni = requestBody.staff.dni;
    const correo = requestBody.staff.correo;
    const telefono = requestBody.staff.telefono;
    
    if (!nombre_discoteca || !dni || !correo || !telefono) {
        return util.buildResponse(401 , {
            message : 'Los datos del staff deben estar completos'
        })
    }
    const dynamoStaff = await getStaff(nombre_discoteca,dni);
    if (dynamoStaff && dynamoStaff.nombre_discoteca && dynamoStaff.dni) {
        return util.buildResponse(401, {
            message: 'Existe un staff registrado con ese dni'
        })
    }

    const staff = {
        nombre_discoteca : nombre_discoteca.toLowerCase().trim(),
        dni: dni,
        correo: correo,
        telefono: telefono
    }
    const saveStaffResponse = await saveStaff(staff);
    if (!saveStaffResponse) {
        return util.buildResponse(503, { message: 'Error en el servidor. Porfavor intente luego.'})
    }
    return util.buildResponse(200, { staff:staff});
}

async function getStaff(nombre_discoteca,dni){
    const params = {
        TableName: staffTable,
        Key: {
            nombre_discoteca: nombre_discoteca,
            dni: dni
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    },error => {
        console.log("There is an error: ",error);
    })
}

async function saveStaff(staff) {
    const params = {
        TableName: staffTable,
        Item: staff
    }
    return await dynamodb.put(params).promise().then(() =>{
        return true;
    }, error => {
        console.log('There is an error saving coordinator: ',error);
    })
}

module.exports.register_staff = register_staff;