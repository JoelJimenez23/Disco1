const jwt = require('jsonwebtoken');

function generateToken(disco_info) {
    console.log(disco_info);
    if (!disco_info){
        return null;
    }
    return jwt.sign(disco_info,process.env.JWT_SECRET, {
        expiresIn:'1h'
    })
}


function verifyToken(nombre_discoteca,dni, token) {
    console.log("nombre_discoteca: ", nombre_discoteca);
    console.log("dni: ", dni);
    console.log("token: ",token);

    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verified: false,
                message: 'invalid token'
            }
        }
        if (response.nombre_discoteca !== nombre_discoteca || response.dni !== dni){
            return {
                verified : false,
                message: 'invalid user'
            }
        }
        return {
            verified: true,
            messsage: 'verified',
            response: response
        }
    })
}

function verifyTokenAddPromotor(nombre_discoteca,dni,rango,token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        console.log(response);
        if (error) {
            return {
                verified: false,
                message: 'invalid token'            }
        }
        if (response.nombre_discoteca !== nombre_discoteca || response.dni !== dni || response.rango !== rango || response.rango == 'promotor'){
            return {
                verified : false,
                message: 'invalid user',
                response : response
            }
        }
        return {
            verified: true,
            messsage: 'verified',
            response: response
        }
    })
}


function verifyTokenAddCabeza(nombre_discoteca,dni,rango,token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verified: false,
                message: 'invalid token'
            }
        }
        if (response.nombre_discoteca !== nombre_discoteca || response.dni !== dni || response.rango !== rango || response.rango == 'promotor' || response.rango == 'cabeza'){
            return {
                verified : false,
                message: 'invalid user'
            }
        }
        return {
            verified: true,
            messsage: 'verified',
            response: response
        }
    })
}

function verifyTokenStaff(nombre_discoteca,dni,rango,token) {
    return jwt.verify(token,process.env.JWT_SECRET, (error,response) => {
        if (error) {
            return {
                verified: false,
                message: 'invalid Token'
            }
        }
        if (response.nombre_discoteca !== nombre_discoteca || response.dni !== dni || response.rango !== rango) {
            return {
                verified: false,
                message: 'invalid user'
            }
        }
        return {
            verified: true,
            message: 'verfified'
        }
    })
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
module.exports.verifyTokenAddPromotor = verifyTokenAddPromotor;
module.exports.verifyTokenAddCabeza = verifyTokenAddCabeza;
module.exports.verifyTokenStaff = verifyTokenStaff;