const { DynamoDBClient, GetItemCommand} = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = new DynamoDBClient({
    region: 'us-east-1'
})

const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth')

const discoTable = 'discotecas';


async function login_disco(disco) {
    const nombre_discoteca = disco.nombre_discoteca;
    const correo = disco.correo;
    const password = disco.password;

    if (!disco || !correo || !password) {
        return util.buildResponse(401, { 
            message : "correo y password son necesarios"
        })
    }

    const dynamoDisco = await getDisco(nombre_discoteca);
    console.log(dynamoDisco);
    if (!dynamoDisco || !dynamoDisco.nombre_discoteca) {
        return util.buildResponse(403, { message : "discoteca no existe."});
    }

    if(!bcrypt.compareSync(password,dynamoDisco.password)){
        return util.buildResponse(403, { message : 'password incorrecta'});
    }

    const disco_info = {
        nombre_discoteca : dynamoDisco.nombre_discoteca,
        correo : dynamoDisco.correo
    }
    const token = auth.generateToken(disco_info);
    const response = {
        disco : disco_info,
        token : token
    }
    console.log(disco_info);
    console.log(token);
    return util.buildResponse(200,response);
}

async function getDisco(nombre_discoteca){
    const input = {
        TableName : discoTable,
        Key : {
            "nombre_discoteca": {
                "S":nombre_discoteca
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

module.exports.login_disco = login_disco;