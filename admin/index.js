const CrearEventoService = require('./service/crear_evento');
const ListarEventosService = require('./service/listar_eventos');
const ModQrService = require('./service/modificar_qrs');
const DeletePersonalService = require('./service/delete_personal');
const ModEventoService = require('./service/mod_evento');
const ListarPersonalEventoService = require('./service/listar_personal_evento');
const GetPersonalQrsInfoService = require('./service/get_personal_qrs_info');
const AllEventosService = require('./service/all_eventos');

const util = require('./utils/util');

const healthPath = '/health';
const crearEventoPath = '/crear-evento';
const listarEventosPath = '/listar-eventos';
const modQrPath = '/mod-cantqr';
const deletePersonalPath = '/delete-personal';
const modEventoPath = '/mod-evento';
const listarPersonalEventoPath = '/list-personal-evento';
const GetPersonalQrsInfoPath = '/personal-qrs-info';
const AllEventosPath = 'all-eventos';

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200,event.body);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === crearEventoPath:
            const crearEventoBody = JSON.parse(event.body);
            response = CrearEventoService.crear_evento(crearEventoBody);
            console.log(response);
            break;
        case event.httpMethod === 'GET' && event.path === listarEventosPath:
            const listarEventosBody = JSON.parse(event.body);
            response = ListarEventosService.listar_eventos(listarEventosBody);
            console.log(response);
            break;
        case event.httpMethod === 'PATCH' && event.path === modQrPath:
            const modQrBody = JSON.parse(event.body);
            response = ModQrService.modificar_qrs(modQrBody);
            console.log(response);
            break;
        case event.httpMethod === 'DELETE' && event.path === deletePersonalPath:
            const deletePersonalBody = JSON.parse(event.body);
            response = DeletePersonalService.delete_personal(deletePersonalBody);
            console.log(response);
            break;
        case event.httpMethod === 'PATCH' && event.path === modEventoPath:
            const modEventoBody = JSON.parse(event.body);
            response = ModEventoService.mod_evento(modEventoBody);
            console.log(response);
            break;
        case event.httpMethod === 'GET' && event.path === listarPersonalEventoPath:
            const listarPersonalEventoBody = JSON.parse(event.body);
            response = ListarPersonalEventoService.listar_personal_evento(listarPersonalEventoBody);
            console.log(response);
            break
        case event.httpMethod === 'GET' && event.path === GetPersonalQrsInfoPath:
            const GetPersonalQrsInfoBody = JSON.parse(event.body);
            response = GetPersonalQrsInfoService.get_personal_qrs_info(GetPersonalQrsInfoBody);
            console.log(response);
            break;
        case event.httpMethod === 'GET' && event.path === AllEventosPath:
            const AllEventosBody = JSON.parse(event.body);
            response = AllEventosService.all_eventos(AllEventosBody);
            console.log(response);
            break;
        default:
            response = util.buildResponse(404,'404 NOT FOUND');
            console.log(response);
    }
    return response;
}