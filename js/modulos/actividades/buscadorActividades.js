function mostrarValoresDefaultActividades(){
    var lista = `
             <div class="col-lg-6 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irDestino(8);return false;" style="white-space: normal;">
                    <strong>Nueva York</strong> 
                    <span class="text-muted" style="font-size: small;">Estados Unidos</span>
                </a>
            </div>
            <div class="col-lg-6 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irDestino(27);return false;" style="white-space: normal;">
                    <strong>Miami</strong> 
                    <span class="text-muted" style="font-size: small;">Estados Unidos</span>
                </a>
            </div>
            <div class="col-lg-6 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irDestino(125);return false;" style="white-space: normal;">
                    <strong>Punta Cana</strong> 
                    <span class="text-muted" style="font-size: small;">Republica Dominicana</span>
                </a>
            </div>
            <div class="col-lg-6 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irDestino(93);return false;" style="white-space: normal;">
                    <strong>Cancún</strong> 
                    <span class="text-muted" style="font-size: small;">México</span>
                </a>
            </div>
            <div class="col-lg-6 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irDestino(168);return false;" style="white-space: normal;">
                    <strong>Orlando</strong> 
                    <span class="text-muted" style="font-size: small;">Estados Unidos</span>
                </a>
            </div>
            <div class="col-lg-6 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irDestino(237);return false;" style="white-space: normal;">
                    <strong>Cartagena</strong> 
                    <span class="text-muted" style="font-size: small;">Colombia</span>
                </a>
            </div>
        `
        $("#listaDestinosActividades").html(lista)

    
}

var proteccion = true
function buscadorDestinosActividad(event){
    $("#spinnerContenidoActividad").show()
    $("#buscadorContenidoActividad").hide()
    
    setTimeout(function() {
        let textoIngresado = document.getElementById("destinoActividad").value;
        let numero = parseInt(textoIngresado.length)
        if(numero > 3 && proteccion){
            proteccion = false
            mostrarDestinos(textoIngresado)
        }else if(numero < 3){
            $("#spinnerContenidoActividad").hide()
            $("#buscadorContenidoActividad").show() 
            mostrarValoresDefaultActividades()
        }       
    }, 2000);
    
}


    function mostrarDestinos(buscador){
        proteccion = false
        if(buscador == 0){
            buscador = document.getElementById("destino").value
        }
        Obtener_API_Vuelos(null, '/api/civitatis/buscador?parametro='+buscador, datos => {
            var destinos = []
            var actividades = []
            if (datos.estado) {
                proteccion = true
                datos.consulta.forEach((element, index) => {
                    let existe = destinos.some(aux => aux.id === element.destinationId)
                    if(!existe){
                        // if(element.city.toLowerCase() === buscador.toLowerCase()){
                            let nuevoDestino = {
                                id: element.destinationId,
                                ciudad: element.city,
                                pais: element.country
                            }
                            destinos.push(nuevoDestino)
                        // }
                    }
                    if(index<6){
                        let nuevaActividad = {
                            id: element.id,
                            titulo: element.title,
                            ciudad: element.city,
                            pais: element.country
                        }
                        actividades.push(nuevaActividad)
                    }
                });
                armarDestinos(destinos)
                armarActividadesBuscador(actividades)
                $("#spinnerContenidoActividad").hide()
                $("#buscadorContenidoActividad").show()  
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: datos.error
                })
            }

        })
    }


    function armarDestinos(destinos){
        var lista = ""
        destinos.forEach((element, index) => {
            lista += `
                    <div class="col-lg-6 col-sm-12">
                        <a class="dropdown-item text-wrap" href="#" onclick="irDestino(`+element.id+`);return false;" style="white-space: normal;">
                            <strong>`+element.ciudad+`</strong> 
                            <span class="text-muted" style="font-size: small;">`+element.pais+`</span>
                        </a>
                    </div>
            `
            $("#listaDestinosActividades").html(lista)
            return
        });
    }


    function armarActividadesBuscador(actividades){
        var lista = ""
        actividades.forEach((element, index) => {
            lista += `
                    <div class="col-lg-12">
                        <a class="dropdown-item" href="#" onclick="irActividad(`+element.id+`);return false;"><strong>`+element.titulo+`</strong> <span class="text-muted" style="font-size: small;">`+element.ciudad+` - `+element.pais+`</span></a>
                    </div>
            `
            if(index == 5){
                $("#listaActividadesUnicas").html(lista)
                return
            }       
        });
    }


    function irDestino(id) {
        var destinoString = JSON.stringify(id)
        var destinoEncode = encodeURIComponent(destinoString)
        var url = window.location.origin + "/listaActividades?idDestino=" + encodeURIComponent(destinoEncode);
        window.location.href = url;
    }
