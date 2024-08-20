const EntrarEventoService = require('./service/entrar_evento');
const GenQrService = require('./service/gen_qr');
const EventoQrService = require('./service/evento_qrs');
const EventosDisponiblesService = require('./service/eventos_disponbiles');
const addPromotorService = require('./service/add_promotor');
const addCabezaService = require('./service/add_cabeza');
const ScanQrService = require('./service/scan_qr');
const MisEventosService = require('./service/mis_eventos');
const GetListaService = require('./service/getLista');
const GetSubordinadosService = require('./service/get_subordinados');
const GetSubordinadoInfoService = require('./service/get_subordinado_info');


const util = require('./utils/util');

const healthPath = '/health';
const entrarEventoPath = '/entrar-evento';
const genQrPath = '/gen-qr';
const eventoQrsPath = '/evento-qrs';
const eventosDisponiblesPath = '/eventos-disponibles';
const addPromotorPath = '/add-promotor';
const addCabezaPath = '/add-cabeza';
const ScanQrPath = '/scan-qr';
const MisEventosPath = '/mis-eventos';
const GetListaPath = '/get-lista';
const GetSubordinadosPath = '/get-subordinados';
const GetSubordinadoInfoPath = '/subordinado-info';

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200, event.body);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === entrarEventoPath:
            const entrarEventoBody = JSON.parse(event.body);
            response = EntrarEventoService.entrar_evento(entrarEventoBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === genQrPath:
            const genQrBody = JSON.parse(event.body);
            response = GenQrService.gen_qr(genQrBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === eventoQrsPath:
            const eventoQrsBody = JSON.parse(event.body);
            response = EventoQrService.evento_qrs(eventoQrsBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === eventosDisponiblesPath:
            const eventosDisponiblesBody = JSON.parse(event.body);
            response = EventosDisponiblesService.evento_disponible(eventosDisponiblesBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === addPromotorPath:
            const addPromotorBody = JSON.parse(event.body);
            response = addPromotorService.add_promotor(addPromotorBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === addCabezaPath:
            const addCabezaBody = JSON.parse(event.body);
            response = addCabezaService.add_cabeza(addCabezaBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === ScanQrPath:
            const ScanQrBody = JSON.parse(event.body);
            response = ScanQrService.scan_qr(ScanQrBody);
            console.log(response);
            break;
        case event.httpMethod === 'GET' && event.path === MisEventosPath:
            const  MisEventosBody = JSON.parse(event.body);
            response = MisEventosService.mis_eventos(MisEventosBody);
            console.log(response);
            break;
        case event.httpMethod === 'POST' && event.path === GetListaPath:
            const GetListaBody = JSON.parse(event.body);
            response = GetListaService.get_lista(GetListaBody);
            console.log(response);
            break;
        case event.httpMethod === 'GET' && event.path === GetSubordinadosPath:
            const GetSubordinadosBody = JSON.parse(event.body);
            response = GetSubordinadosService.get_subordinados(GetSubordinadosBody);
            console.log(response);
            break;
        case event.httpMethod === 'GET' && event.path === GetSubordinadoInfoPath:
            const GetSubordinadoInfoBody = JSON.parse(event.body);
            response = GetSubordinadoInfoService.get_subordinado_info(GetSubordinadoInfoBody);
            console.log(response);
            break;
        default:
            response = util.buildResponse(404, '404 NOT FOUND');
            console.log(response);
    }
    return response;
}