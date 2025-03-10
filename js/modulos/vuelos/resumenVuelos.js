function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const idResumen = urlParams.get('idResumen');
    const person = urlParams.get('personas');
    if (idResumen && person) {

        const personasDecoded = decodeURIComponent(person);
        const personasObj = JSON.parse(personasDecoded);
        const arrayDePares = Object.entries(personasObj);
        let personas = transformArrayToObject(arrayDePares)
        
        // Decodificar y parsear el objeto personas
        const idResumenDecoded = decodeURIComponent(idResumen);
        const idResumenObj = JSON.parse(idResumenDecoded);
        
        consultarResumen(idResumenObj, personas)
        
    } 
    else {
        console.log ('Datos de reserva no especificados');
    }
}



function consultarResumen(idResumen, personas){
    abrirSpinner("Cargando...")
    Obtener_API_Vuelos(null, '/api/chequeando/resumen/'+idResumen, datos => {
        if (datos.estado) { 
            setearNumReserva(datos.consulta.pnr)
            let buscador = {
                salida: datos.consulta.completo.cluster.segments[0].origin.code,
                destino: datos.consulta.completo.cluster.segments[0].destination.code,
                fechaSalida: datos.consulta.completo.cluster.segments[0].departure_date,
                fechaRetorno: datos.consulta.completo.cluster.segments[1].destination.date
            }
            let vuelo = [datos.consulta.completo.cluster]
            plasmarVuelos(vuelo, buscador, personas)
            armarPasajeros(datos.consulta.completo.passengers)  
            cerrarSpinner()
        }
        else {
            cerrarSpinner()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: datos.error
            })
            return false;  
        }
    })
}

function setearNumReserva(pnr){
    lista = "PNR: "+pnr
    $("#numReserva").html(lista)
}


function plasmarVuelos(vuelos, buscador, personas){
    var datos = armarVuelos(vuelos, buscador, personas, "")
    $("#listaVuelos").html(datos)
}

function armarPasajeros(pasajeros){
    pasajeros.forEach(element => {
        var lista = ""
        lista = `
                <tr>
                    <th>`+element.firstname+` `+element.lastname+`</th>
                    <td>`+element.document.type+` - `+element.document.number+`</td>
                    <td>`+element.birth+`</td>
                    <td>`+element.nationality+`</td>
                </tr>`
        $('#listaPasajeros').html(lista);
    });
}



function finalizar(){
    mensajeUsuario('success','¡Genial...!','Gracias por reservar, vuelva pronto.')
    goBack()
}

function goBack() {
    // Regresar a la búsqueda de vuelos
    window.location.href = '/';
}