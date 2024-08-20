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


function verifyToken(nombre_discoteca, token) {
    console.log("nombre_discoteca: ", nombre_discoteca);
    console.log("token: ",token);

    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verified: false,
                message: 'invalid token'
            }
        }
        if (response.nombre_discoteca !== nombre_discoteca){
            return {
                verified : false,
                message: 'invalid user'
            }
        }
        return {
            verified: true,
            messsage: 'verified'
        }
    })
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;