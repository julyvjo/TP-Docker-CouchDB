var PouchDB = require('pouchdb');
const prompt = require('prompt-sync')();
require('dotenv').config()

const remote_db = new PouchDB(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
const local_db = new PouchDB('software-libre-databse-local')

sincro()

/**
 * Levanta el modo manual o automatico dependiendo de la variable de entorno MODE.
 */
if (process.env.MODE == 'manual'){
    menu();
}
else{
    timer();
}

/**
 * Ofrece un menu al usuario para que elija si crear posts, verlos o salir.
 */

async function menu() {

    const user = prompt('Bienvenido, Ingrese su nombre: ');

    console.log(`>>Logueado como: ${user}`);

    var res = prompt('Que desea hacer? [1. Postear, 2. Ver Posteos, 0. Salir]: ')

    while (res != 0){
        await sleep(100);
        switch (res) {
            case '1':
                console.log('Crear Post >> (Escribir EXIT para salir)');
                var mensaje = prompt('Mensaje: ')
                await local_db.post({'user':`${user}`,'data':`${mensaje}`,'timestamp':`${Date.now()}`})
                    .catch('Hubo un error, no se pudo crear el mensaje!')
                    await sleep(100);
                    console.log('Mensaje creado con exito: ', mensaje)
                    break;
            case '2':
                console.log('Mostrando todos los posts');
                await local_db.allDocs({include_docs: true})
                    .then((docs)=>{
                        docs.rows.forEach((doc)=>console.log(doc.doc))
                    })
                    .catch(err => console.log(err))
                break;
            default:
                console.log('Lo siento esa opcion no existe');
                
        }
        res = prompt('Que desea hacer? [1. Postear, 2. Ver Posteos, 0. Salir]: ')
    }
}

/**
 * El modo automatico crea un post cada X cantidad de tiempo.
 */
async function timer() {
    var i=0;
    var user = "auto";
    var mensaje;
    while (i<10) {
        mensaje = Math.floor(Math.random()*10000000)
        await local_db.post({'user':`${user}`,'data':`${mensaje}`,'timestamp':`${Date.now()}`})
                        .catch('Hubo un error, no se pudo crear el mensaje!')
        await sleep(12000);
        console.log('Mensaje creado!');
        i++;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function sincro(){
    local_db.sync(remote_db, {
        live: true,
        retry: true
      }).on('change', function (change) {
        //se detectan cambios en la BD
        console.log('>> Actualizando BD');
      }).on('error', function (err) {
        //error
        console.error('>> Ocurrio un error de conexion', err);
    });
}