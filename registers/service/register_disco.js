const AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const discoTable = 'discotecas';

async function register_disco(discoInfo) {
    const nombre_discoteca = discoInfo.nombre_discoteca;
    const correo = discoInfo.correo;
    const password = discoInfo.password;
    const ubicacion_geografica = discoInfo.ubicacion_geografica;
    
    if (!nombre_discoteca || !correo || !password || !ubicacion_geografica) {
        return util.buildResponse(401, { message : 'Todos los campos son necesarios'})
    }

    const dynamoDisco = await getDisco(nombre_discoteca.toLowerCase().trim());
    if (dynamoDisco && dynamoDisco.nombre_discoteca) {
        return util.buildResponse(401, {
            message : 'El nombre de la discoteca ya existe, elija otro.'
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(),10);
    const discoteca = {
        nombre_discoteca : nombre_discoteca.toLowerCase().trim(),
        correo : correo,
        password : encryptedPW,
        ubicacion_geografica : ubicacion_geografica
    }
    const saveDiscotecaResponse = await saveDisco(discoteca);
    if(!saveDiscotecaResponse) {
        return util.buildResponse(503, {message: 'Error del servidor. Porfavor intente luego'});
    }

    return util.buildResponse(200, {discoteca :discoteca});
}

async function getDisco(nombre_discoteca){
    const params = {
        TableName: discoTable,
        Key : {
            nombre_discoteca:nombre_discoteca
        } 
    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.log('There is an error: ', error);
    })
}

async function saveDisco(discoteca) {
    const params = {
        TableName: discoTable,
        Item: discoteca
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.log('There is an error saving user: ', error)
    });
}
module.exports.register_disco = register_disco;
