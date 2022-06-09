const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000;
const HOST = '0.0.0.0';
//const __dirname = "/public"
//app.use(express.static("/public"))
app.use('/', express.static(path.join(__dirname, 'public')))
//app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))
//BD
var PouchDB = require('pouchdb')
var local_db = new PouchDB('software-libre-database-local')
var remote_db = new PouchDB('http://127.0.0.1:5984/software-libre-database')

app.get('/mensajes', function (req, res) {

  //al recibir un request obtiene todos los docs y arma un json con usuario y data
  local_db.allDocs({include_docs: true}).then(result => {
    let data = []
    for(let i=0; i<result.total_rows; i++){
      let mensaje = {
        'user': result.rows[i].doc.user,
        'data': result.rows[i].doc.data
      }
      data.push(mensaje);
    }
    res.json(data)  
  })
  
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//DATABASE
local_db.sync(remote_db, {
  live: true,
  retry: true
}).on('change', function (change) {
  //se detectan cambios en la BD
  console.log('actualizando BD');
}).on('error', function (err) {
  //error
  console.error('Ocurrio un error', err);
});


