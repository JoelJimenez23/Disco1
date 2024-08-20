// const axios = require("axios");

// const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/login-disco';

// const userInfo = {
//   nombre_discoteca: "disco",
//   correo : "joel@joel.com",
//   password : "1234",
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/login-disco",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();




// const axios = require("axios");
// url = 'https://7fopajvnr5.execute-api.us-east-1.amazonaws.com/dev/register-coordinador'
// const coordinador = {
//   nombre_discoteca: 'disco',
//   dni: '73641477',
//   correo: 'joeljc2004@gmail.com',
//   telefono : '926782404'
// }

// const body = {
//   coordinador: coordinador,
//   nombre_discoteca : 'disco',
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyOTA1NjA3LCJleHAiOjE3MDI5MDkyMDd9.0cjhAHKaoYaNJjlvfKNtFUhUFK0CVmIShAg7R0Jfq5M"
// }

// const json_data = {
//   httpMethod: "POST",
//   path:'/register-coordinador',
//   body: JSON.stringify(body)
// }

// const headers = {
//   'Content-Type':'application/json'
// }

// const test = () => {
//   axios({
//     method:'POST',
//     url:url,
//     data:json_data,
//     headers:headers
//   }).then(response => {
//     console.log(response);
//   }).catch(error => {
//     console.error('ERROR: ', error);
//   })
// }

// test();



// const axios = require("axios");
// url = 'https://7fopajvnr5.execute-api.us-east-1.amazonaws.com/dev/register-cabeza'
// const cabeza = {
//   nombre_discoteca: 'disco',
//   dni: '73641477',
//   correo: 'joeljc2004@gmail.com',
//   telefono : '926782404'
// }

// const body = {
//   cabeza: cabeza,
//   nombre_discoteca : 'disco',
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAxOTU1OTk0LCJleHAiOjE3MDE5NTk1OTR9.RPYUJty2s8_b69swWU0Y22DOc_33LjgDoOePqkqz9ic"
// }

// const json_data = {
//   httpMethod: "POST",
//   path:'/register-cabeza',
//   body: JSON.stringify(body)
// }

// const headers = {
//   'Content-Type':'application/json'
// }

// const test = () => {
//   axios({
//     method:'POST',
//     url:url,
//     data:json_data,
//     headers:headers
//   }).then(response => {
//     console.log(response);
//   }).catch(error => {
//     console.error('ERROR: ', error);
//   })
// }

// test();



// const axios = require("axios");
// url = 'https://7fopajvnr5.execute-api.us-east-1.amazonaws.com/dev/register-promotor'
// const promotor = {
//   nombre_discoteca: 'disco',
//   dni: '73641477',
//   correo: 'joeljc2004@gmail.com',
//   telefono : '926782404'
// }

// const body = {
//   promotor: promotor,
//   nombre_discoteca : 'disco',
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyMzQxOTQ4LCJleHAiOjE3MDIzNDU1NDh9.POzCUPdXlJ0dsqe9TIZHSs2wcTymfjp1l-bL0KTQl4U"
// }

// const json_data = {
//   httpMethod: "POST",
//   path:'/register-promotor',
//   body: JSON.stringify(body)
// }

// const headers = {
//   'Content-Type':'application/json'
// }

// const test = () => {
//   axios({
//     method:'POST',
//     url:url,
//     data:json_data,
//     headers:headers
//   }).then(response => {
//     console.log(response);
//   }).catch(error => {
//     console.error('ERROR: ', error);
//   })
// }

// test();






// const axios = require("axios");
// url = 'https://7fopajvnr5.execute-api.us-east-1.amazonaws.com/dev/register-staff'
// const staff = {
//   nombre_discoteca: 'disco',
//   dni: '40423263',
//   correo: 'carmen@gmail.com',
//   telefono : '991318566'
// }

// const body = {
//   staff: staff,
//   nombre_discoteca : 'disco',
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAxOTY3OTYyLCJleHAiOjE3MDE5NzE1NjJ9.GXXnfcRpp7c770j77gn1NMtmlwJhmxNkSyAHJNKbKI0"
// }

// const json_data = {
//   httpMethod: "POST",
//   path:'/register-staff',
//   body: JSON.stringify(body)
// }

// const headers = {
//   'Content-Type':'application/json'
// }

// const test = () => {
//   axios({
//     method:'POST',
//     url:url,
//     data:json_data,
//     headers:headers
//   }).then(response => {
//     console.log(response);
//   }).catch(error => {
//     console.error('ERROR: ', error);
//   })
// }

// test();



// const axios = require("axios");

// const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const userInfo = {
//   nombre_discoteca: "disco",
//   correo : "joel@joel.com",
//   password : "1234",
// };


// const json_data = {
//  httpMethod:"GET",
//  path:"/health",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'GET',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();





// const axios = require("axios");

// const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/login-personal';

// const userInfo = {
//   rango: 'promotor',
//   nombre_discoteca: "disco",
//   correo : "joeljc2004@gmail.com",
//   dni : "73641477",
// };

// const json_data = {
//  httpMethod:"POST",
//  path:"/login-personal",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();




// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/crear-evento';
// // const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const eventoInfo = {
//   nombre_discoteca: "disco",
//   nombre : "quiero-ser-normal",
//   fecha : "2023-12-28",
//   aforo: "400",
//   estado: "pendiente"
// };

// const body = {
//   eventoInfo:eventoInfo,
//   nombre_discoteca: 'disco',
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAzNzA2NTc5LCJleHAiOjE3MDM3OTI5Nzl9.b19tO_2X5pbN5n94b5CTqnVlM0jNpEbmrZrAKvT91tE"
// }

// const json_data = {
//  httpMethod:"POST",
//  path:"/crear-evento",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();


// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/crear-evento';
// // const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const eventoInfo = {
//   nombre_discoteca: "disco",
//   nombre : "MAKANAKY",
//   fecha : "2023-12-15",
//   aforo: "1000",
//   estado: "pendiente"
// };

// const body = {
//   eventoInfo:eventoInfo,
//   nombre_discoteca: 'disco',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyMDkzNDQxLCJleHAiOjE3MDIwOTcwNDF9.hn9RZkxeYqSYiNAPCevX7ESfsILSHHtN5QrrYz8cLwY'
// }

// const json_data = {
//  httpMethod:"POST",
//  path:"/crear-evento",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();





// const axios = require("axios");

// const url = "https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/listar-eventos";

// const body = {
//   estado:'pendiente',
//   nombre_discoteca: 'disco',
//   token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAzNzA3Njc3LCJleHAiOjE3MDM3OTQwNzd9.gfaVNKWLgb3kVYOV1r31HWj9NLxVLVBrcMwNTZjvEA8"
// }

// const json_data = {
//  httpMethod:"GET",
//  path:"/listar-eventos",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();




// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/mod-cantqr';
// // const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const params = {
//   rango : "cabeza",
//   dni : "73641477",
//   cant : "100"
// };

// const body = {
//   params: params,
//   nombre_discoteca: 'disco',
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyMzEzODY0LCJleHAiOjE3MDIzMTc0NjR9.PmrZ9bhBBNqdelCfh6OsOqpZmlsfPO5pus17ArZYmb8"
// }

// const json_data = {
//  httpMethod:"PATCH",
//  path:"/mod-cantqr",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'PATCH',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();





// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/delete-personal';
// // const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const params = {
//   rango : "coordinador",
//   dni : "73641477"
// };

// const body = {
//   params: params,
//   nombre_discoteca: 'disco',
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyMzA4MTIwLCJleHAiOjE3MDIzMTE3MjB9.KvWd60RZNB5R-hEjyLcm7YbC_jvS0Px1JjMHYGEm3dE"
// }

// const json_data = {
//  httpMethod:"DELETE",
//  path:"/delete-personal",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'DELETE',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();





// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/mod-evento';

// const params = {
//   key : "estado",
//   value: "finalizado",
//   id : "714ab5fd-f9a1-417d-a1b8-3d0575dedc0b"
// };

// const body = {
//   params: params,
//   nombre_discoteca: 'disco',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyMzIwMjk4LCJleHAiOjE3MDIzMjM4OTh9.R7_4zondjxlQG6V2kJFfHsu8CBcEuG5DegplGv8NhVc'
// }

// const json_data = {
//  httpMethod:"PATCH",
//  path:"/mod-evento",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'PATCH',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();-





// const axios = require("axios");


// const url = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/eventos-disponibles';
// const body = {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJwcm9tb3RvciIsImlhdCI6MTcwMzg4MzkyMiwiZXhwIjoxNzAzOTcwMzIyfQ.IQ5kFfM7iHrLgc4lJ5EEqx1El6XecRfQvkOsWgQc6zQ", "user": {"correo": "joeljc2004@gmail.com", "dni": "73641477", "nombre_discoteca": "disco", "rango": "promotor"}}
// const json_data = {
//  httpMethod:"POST",
//  path:"/eventos-disponibles",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response.data);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();















// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/crear-evento';
// // const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const eventoInfo = {
//   nombre_discoteca: "disco",
//   nombre : "moneyTrees",
//   fecha : "2024-01-14",
//   aforo: "250",
//   estado: "pendiente"
// };

// const body = {
//   eventoInfo:eventoInfo,
//   nombre_discoteca: 'disco',
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyNDMzMzU2LCJleHAiOjE3MDI0MzY5NTZ9.Xesg3IPuR3W-yZ3Nfyr65hf6EA2O_EjapHl-HDM3io0"
// }

// const json_data = {
//  httpMethod:"POST",
//  path:"/crear-evento",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();





// const axios = require("axios");

// const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/login-disco';

// const userInfo = {
//   nombre_discoteca: "disco",
//   correo : "joel@joel.com",
//   password : "1234",
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/login-disco",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();






// const axios = require("axios");
// const url = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/entrar-evento'


// const userInfo = {"dni": "09616991", "eventoId": "64763a6c-ea32-4488-92af-2fbdffc8b3a8", "nameEvento": "quiero ser normal", "nombre_discoteca": "disco", "rango": "coordinador", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjA5NjE2OTkxIiwicmFuZ28iOiJjb29yZGluYWRvciIsImlhdCI6MTcwMzg4NDg3NywiZXhwIjoxNzAzOTcxMjc3fQ.5aJ-Y-MlxV_0qku5UegAKEA3QGAgcWnoWRBjsWxVfVE"}

// const json_data = {
//  httpMethod:"POST",
//  path:"/entrar-evento",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();




// // // 14ab5fd-f9a1-417d-a1b8-3d0575dedc0b







// const axios = require("axios");
// const url = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/gen-qr'


// const userInfo = {
//   nombre_discoteca: "disco",
//   dni : "09616991",
//   rango: "coordinador",
//   eventoName:"feelme?",
//   cant_qrs: 1,
//   t_lista: "general",
//   eventoId: "6d7c842f-fe7a-468e-a82d-29659e579b3b",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjA5NjE2OTkxIiwicmFuZ28iOiJjb29yZGluYWRvciIsImlhdCI6MTcwMzU1MzgwNSwiZXhwIjoxNzAzNjQwMjA1fQ.Oyxm49LXf4PHvWKMTldy6pj0hOFfk1OW81tCzKBIBvI"
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/gen-qr",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();











// ========================================================================================



// const axios = require("axios");


// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/crear-evento';
// // const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/health';

// const tipo_lista = {
//   total: "400",
//   general: "250",
//   vip: "100",
//   pro: "50"
// }

// const qrs_rango = {
//   promotor : {
//     total:"20" ,
//     general:"10",
//     vip:"5",
//     pro:"5",
//   },
//   cabeza : {
//     total:"50",
//     general:"25",
//     vip:"15",
//     pro:"10",
//   },
//   coordinador: {
//     total:"100",
//     general:"50",
//     vip:"30",
//     pro:"20",
//   }
// }


// const eventoInfo = {
//   nombre_discoteca: "disco",
//   nombre : "quiero ser normal",
//   fecha : "2023-12-31",
//   aforo: "400",
//   estado: "pendiente",
//   tipo_lista: tipo_lista,
//   qrs_rango: qrs_rango
// };

// const body = {
//   eventoInfo:eventoInfo,
//   nombre_discoteca: 'disco',
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAzNzA2NTc5LCJleHAiOjE3MDM3OTI5Nzl9.b19tO_2X5pbN5n94b5CTqnVlM0jNpEbmrZrAKvT91tE"
// }

// const json_data = {
//  httpMethod:"POST",
//  path:"/crear-evento",
//  body: JSON.stringify(body)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();











// const axios = require("axios");
// const url = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/entrar-evento'


// const userInfo = {"dni": "73641477", "eventoId": "64763a6c-ea32-4488-92af-2fbdffc8b3a8", "nameEvento": "quiero ser normal", "nombre_discoteca": "disco", "rango": "coordinador", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJjb29yZGluYWRvciIsImlhdCI6MTcwMzg3ODg2OSwiZXhwIjoxNzAzOTY1MjY5fQ.1VHOfexY4D8DI9vx7GjBm_FMh71fDr8q2iwf8HStGb0"}


// const json_data = {
//  httpMethod:"POST",
//  path:"/entrar-evento",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();







// const axios = require("axios");
// const url = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/gen-qr'


// const userInfo = {
//   nombre_discoteca: "disco",
//   dni : "73641477",
//   rango: "promotor",
//   cant_qrs: 5,
//   t_lista: "vip",
//   eventoId: "64763a6c-ea32-4488-92af-2fbdffc8b3a8",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJwcm9tb3RvciIsImlhdCI6MTcwMzczMTE3OSwiZXhwIjoxNzAzODE3NTc5fQ.Je59-y0LvSFCJEzRkVHLdYwymY0mAZw2aGClB2N4C2o"
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/gen-qr",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();






// const axios = require("axios");
// const url = "https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/evento-qrs";


// const userInfo = {
//   nombre_discoteca: "disco",
//   dni : "73641477",
//   rango: "promotor",
//   eventoId: "64763a6c-ea32-4488-92af-2fbdffc8b3a8",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJwcm9tb3RvciIsImlhdCI6MTcwMzczMTc2NiwiZXhwIjoxNzAzODE4MTY2fQ.Dcy5ki-mmzjnoVmgFWoHSSe4MWHLala9aNBdZe_DGvI"
// };


// const json_data = {
//  httpMethod:"GET",
//  path:"/evento-qrs",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAyOTA1NjA3LCJleHAiOjE3MDI5MDkyMDd9.0cjhAHKaoYaNJjlvfKNtFUhUFK0CVmIShAg7R0Jfq5M



// const axios = require("axios");
// const url = "https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/add-cabeza";


// const userInfo = {
//   nombre_discoteca: "disco",
//   dni : "09616991",
//   rango: "coordinador",
//   dni_cabeza: "1977",
//   token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjA5NjE2OTkxIiwicmFuZ28iOiJjb29yZGluYWRvciIsImlhdCI6MTcwMjk1ODQwNiwiZXhwIjoxNzAyOTYyMDA2fQ.iDPb5HsqOGB3PjbL5zdysuykEDtB1xq1M-P39VNdQZg"
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/add-cabeza",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();




// const axios = require("axios");
// const url = "https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/scan-qr";


// const userInfo = {
//   nombre_discoteca: "disco",
//   dni : "73641477",
//   rango: "staff",
//   eventoId: "6d7c842f-fe7a-468e-a82d-29659e579b3b",
//   qr : "6ae1e0fe-0410-4ed2-b246-38632a01ec10",
//   correo_user: "joel.jimenez@utec.edu.pe",
//   dni_user: "202110173",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJzdGFmZiIsImlhdCI6MTcwMzMxNTM4NiwiZXhwIjoxNzAzNDAxNzg2fQ.8FJXALVcciecp3CwUL1EZZPfzHAMyvjAyBfAgEIbvFY"
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/scan-qr",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();





// const axios = require("axios");
// const url = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/list-disco';

// const json_data = {
//  httpMethod:"GET",
//  path:"/list-disco",
//  body: ''
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response.data.statusCode);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();



// const axios = require("axios");

// const url = "https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/listar-eventos";

// const body = {
//   estado: 'pendiente',
//   nombre_discoteca: 'disco',
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAzNzA3Njc3LCJleHAiOjE3MDM3OTQwNzd9.gfaVNKWLgb3kVYOV1r31HWj9NLxVLVBrcMwNTZjvEA8"
// }

// const json_data = {
//   httpMethod: "GET",
//   path: "/listar-eventos",
//   body: JSON.stringify(body)
// }

// const headers = {
//   'Content-Type': 'application/json'
// }

// const test = async () => {
//   try {
//     const response = await axios({
//       method: 'POST',
//       url: url,
//       data: json_data,
//       headers: headers
//     });

//     // Check if the content type is application/json
//     const contentType = response.headers['content-type'];
//     if (contentType && contentType.toLowerCase().includes('application/json')) {
//       // Parse the response body as JSON
//       const eventos = JSON.parse(response.data.body);
//       console.log(eventos);
//       return eventos;
//     } else {
//       console.error('Unexpected response content type:', contentType);
//     }
//   } catch (error) {
//     console.error("ERROR: ", error);
//   }
// }

// // Call the test function
// test();







// const MisEventosUrl = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/mis-eventos';

// const axios = require("axios");
// const { json } = require("react-router-dom");

// const headers = {
//   'Content-Type': 'application/json'
// }
// const body = {
//   nombre_discoteca: "disco",
//   dni: "73641477",
//   rango: "promotor",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJwcm9tb3RvciIsImlhdCI6MTcwMzcyODk0NSwiZXhwIjoxNzAzODE1MzQ1fQ.QBZOtJzj4tODoVM3iOxFJ4qXTX195YtpEfSxPSa4iKo"
// }
// const json_data = {
//   httpMethod: "GET",
//   path: "/mis-eventos",
//   body: JSON.stringify(body)
// }
// axios({
//   method:"POST",
//   url: MisEventosUrl,
//   data: json_data,
//   headers:headers
// }).then(response => {
//   console.log('\n\n\n\n\n')
//   console.log(response.data);
//   const json_data = JSON.parse(response.data.body);
//   console.log(json_data);
//   console.log('\n');
//   console.log(json_data.misEventos);
//   console.log('\n');
//   console.log(Object.entries(json_data.misEventos));
//   console.log('\n');
//   // console.log(Object.entries(json_data.misEventos).map([id,data]));
//   console.log('\n\n\n\n');
// })


// const axios = require("axios");
// const urlListDisco = 'https://9e0liqazgl.execute-api.us-east-1.amazonaws.com/dev/list-disco';


// const getData = () =>{
//     const json_data = {
//         httpMethod:"GET",
//         path:"/list-disco",
//         body:""
//     };
//     const headers = {
//         'Content-Type': 'application/json'
//     };
//     const method = 'POST';

//     axios({
//         method: method,
//         url: urlListDisco,
//         headers: headers,
//         data: json_data
//     }).then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.error("ERROR: ", error);
//     });

// }


// getData();







// const axios = require("axios");
// const url = 'https://s8fyfen1v3.execute-api.us-east-1.amazonaws.com/dev/get-lista';


// const userInfo = {
//   nombre_discoteca: "disco",
//   dni : "73641477",
//   eventoId: "6d7c842f-fe7a-468e-a82d-29659e579b3b",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsamMyMDA0QGdtYWlsLmNvbSIsImRuaSI6IjczNjQxNDc3IiwicmFuZ28iOiJwcm9tb3RvciIsImlhdCI6MTcwMzgyNDM4MiwiZXhwIjoxNzAzOTEwNzgyfQ.O7Z-khpcQaH68nLr8-OVDyvt4eUX2lvqrFNF8LP8RJ4"
// };


// const json_data = {
//  httpMethod:"POST",
//  path:"/get-lista",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();






// const axios = require("axios");
// const url = 'https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/list-personal-evento';


// const userInfo = {
//   nombre_discoteca: "disco",
//   eventoId: "64763a6c-ea32-4488-92af-2fbdffc8b3a8",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAzOTAwMzM4LCJleHAiOjE3MDM5ODY3Mzh9.6bXzd3BfkE9udoDrVcgyL7MYzWRDNsIl2HkDbNUiaeY"
// };


// const json_data = {
//  httpMethod:"GET",
//  path:"/list-personal-evento",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();








// const axios = require("axios");
// const url = "https://qkznebe5df.execute-api.us-east-1.amazonaws.com/dev/personal-qrs-info";


// const userInfo = {
//   nombre_discoteca: "disco",
//   eventoId: "64763a6c-ea32-4488-92af-2fbdffc8b3a8",
//   dni_rol : "73641477",
//   rol: "promotor",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfZGlzY290ZWNhIjoiZGlzY28iLCJjb3JyZW8iOiJqb2VsQGpvZWwuY29tIiwiaWF0IjoxNzAzOTAwMzM4LCJleHAiOjE3MDM5ODY3Mzh9.6bXzd3BfkE9udoDrVcgyL7MYzWRDNsIl2HkDbNUiaeY"
// };


// const json_data = {
//  httpMethod:"GET",
//  path:"/personal-qrs-info",
//  body: JSON.stringify(userInfo)
// }

// const headers = {
//  'Content-Type':'application/json'
// }


// const test = () => {
//  axios({
// 	method: 'POST',
// 	url: url,
// 	data: json_data,
// 	headers: headers
//  }).then(response =>{
// 	console.log(response);
//  }).catch(error => {
// 	console.error("ERROR: ",error);
//  })
// }

// test();



