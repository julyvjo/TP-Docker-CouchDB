const URL = '/mensajes'

async function fetchMensajesJSON() {
    const response = await fetch(URL);
    const mensajes = await response.json();
    console.log(mensajes)
    return mensajes;
}

fetchMensajesJSON().then(mensajes => {
    const div = document.getElementById("div-mensajes");
    let innerHTML = "";
    for(let i=0; i<mensajes.length ; i++){
        innerHTML += `<div class="container my-3">
                        <div class="msg-header">
                            <h5>${mensajes[i].user}</h5>
                        </div>
                        <div class="p-3 msg-body">
                            <div class="container">
                                <span class="lead"><b>Mensaje: &nbsp</b>${mensajes[i].data}</span>
                            </div>
                        </div>
                    </div>`;
        console.log(innerHTML);
    }
    div.innerHTML = innerHTML;
});