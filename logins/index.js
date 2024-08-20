const LoginDiscoService = require('./service/login_disco');
const LoginPersonalService = require('./service/login_personal');
const ListDiscoService = require('./service/list_disco');

const util = require('./utils/util');

const healthPath = '/health';
const LoginDiscoPath = '/login-disco';
const LoginPersonalPath = '/login-personal';
const ListDiscoPath = '/list-disco';

exports.handler = async (event) => {
    console.log('Request Event', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            console.log(event);
            response = util.buildResponse(200,event.body);
            break;
        case event.httpMethod === 'POST' && event.path === LoginDiscoPath:
            const login_discoBody = JSON.parse(event.body);
            console.log(login_discoBody);
            response = LoginDiscoService.login_disco(login_discoBody);
            break;
        case event.httpMethod === 'POST' && event.path === LoginPersonalPath:
            const loginPersonalBody = JSON.parse(event.body);
            console.log(loginPersonalBody);
            response = LoginPersonalService.login_personal(loginPersonalBody);
            break;
        case event.httpMethod === 'GET' && event.path === ListDiscoPath:
            response = ListDiscoService.list_disco();
            break;
        case event.httpMethod === 'OPTIONS':
            response = util.buildResponse(200, 'OK');
            break;   
        default:
            response = util.buildResponse(404,'404 NOT FOUND');
    }
    return response;
}