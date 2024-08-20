const RegisterDiscoService = require('./service/register_disco');
const RegisterCoordinadorService = require('./service/register_coordinador');
const RegisterCabezaService = require('./service/register_cabeza');
const RegisterPromotorService = require('./service/register_promotor');
const RegisterStaffService = require('./service/register_staff');


const util = require('./utils/util');


const healthPath = '/health';
const register_discoPath = '/register-disco';

const registerCoordinadorPath = '/register-coordinador';
const registerCabezaPath = '/register-cabeza';
const registerPromotorPath = '/register-promotor';

const registerStaffPath = '/register-staff';

exports.handler = async (event) => {
    console.log('Request Event: ',event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200,event.body);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === register_discoPath:
            const register_discoBody = JSON.parse(event.body);
            console.log(register_discoBody);
            response = RegisterDiscoService.register_disco(register_discoBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === registerCoordinadorPath:
            const register_coordinadorBody = JSON.parse(event.body);
            console.log(register_coordinadorBody);
            response = RegisterCoordinadorService.register_coordinador(register_coordinadorBody); 
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === registerCabezaPath:
            const registerCabezaBody = JSON.parse(event.body);
            console.log(registerCabezaBody);
            response = RegisterCabezaService.register_cabeza(registerCabezaBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === registerPromotorPath:
            const registerPromotorBody = JSON.parse(event.body);
            console.log(registerPromotorBody);
            response = RegisterPromotorService.register_promotor(registerPromotorBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === registerStaffPath:
            const registerStaffBody = JSON.parse(event.body);
            console.log(registerStaffBody);
            response = RegisterStaffService.register_staff(registerStaffBody);
            console.log(response);
            break;
        default:
            response = util.buildResponse(404,'404 NOT FOUND');
            break;
    }
    return response;
};