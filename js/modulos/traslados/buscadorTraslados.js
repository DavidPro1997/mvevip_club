function iniciarDatesTraslados(){
    inicarFechaTraslados()
    iniciarHoraTraslados()
    bloquearInputPersonas()
}


function bloquearInputPersonas(){
    const inputElement = document.getElementById("personasTraslados");
    if (inputElement) {
        inputElement.addEventListener("keypress", function(event) {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (this.value.length === 0 && charCode === 48) {
                event.preventDefault(); // Bloquear la entrada de '0' al inicio
            }
            if (charCode < 48 || charCode > 57) {
                event.preventDefault(); // Bloquear la entrada
            }
        });
        inputElement.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, ''); // Reemplazar todo lo que no sea un número
        });
    } else {
        console.error(`No se encontró el elemento con ID: ${inputId}`);
    }
}


function inicarFechaTraslados(){
    flatpickr("#fechaTraslado", {
        minDate: new Date().fp_incr(1), // Bloquear fechas anteriores a hoy
        dateFormat: "Y-m-d",
        disableMobile: true,
        defaultDate: new Date().fp_incr(1)
    });
}


function iniciarHoraTraslados(){
    let fechaInput = document.getElementById("fechaTraslado").value;  // Capturamos el valor del input de fecha
    let ahora = new Date();  // Obtenemos la fecha actual completa (con horas)
    let hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()); 
    let manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);
    let [year, month, day] = fechaInput.split('-');  // Asumiendo que el input es tipo "YYYY-MM-DD"
    let fechaTraslado = new Date(year, month - 1, day);  // Crear un objeto Date con solo año, mes, día
    if (fechaTraslado.getTime() === manana.getTime()) {
        let horaMinima = ahora.getHours() + ':' + ahora.getMinutes();
        flatpickr("#horaTraslado", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            defaultDate: horaMinima,
            minTime: horaMinima  // Bloquear horas menores a las actuales si es mañana
        });
    } else {
        flatpickr("#horaTraslado", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            defaultDate: "00:00"
        });
    }

}


function mostrarValoresDefaultTraslados(){
    var lista = `
             <div class="col-lg-12 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irTraslado(8,'Nueva York','Estados Unidos');return false;" style="white-space: normal;">
                    <strong>Nueva York</strong> 
                    <span class="text-muted" style="font-size: small;">Estados Unidos</span>
                </a>
            </div>
            <div class="col-lg-12 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irTraslado(27,'Miami','Estados Unidos');return false;" style="white-space: normal;">
                    <strong>Miami</strong> 
                    <span class="text-muted" style="font-size: small;">Estados Unidos</span>
                </a>
            </div>
            <div class="col-lg-12 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irTraslado(125,'Punta Cana','Republica Dominicana');return false;" style="white-space: normal;">
                    <strong>Punta Cana</strong> 
                    <span class="text-muted" style="font-size: small;">Republica Dominicana</span>
                </a>
            </div>
            <div class="col-lg-12 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irTraslado(168,'Orlando','Estados Unidos');return false;" style="white-space: normal;">
                    <strong>Orlando</strong> 
                    <span class="text-muted" style="font-size: small;">Estados Unidos</span>
                </a>
            </div>
            <div class="col-lg-12 col-sm-12">
                <a class="dropdown-item text-wrap" href="#" onclick="irTraslado(237,'Cartagena','Colombia');return false;" style="white-space: normal;">
                    <strong>Cartagena</strong> 
                    <span class="text-muted" style="font-size: small;">Colombia</span>
                </a>
            </div>
        `
        $("#listaDestinosTralados").html(lista)

    
}



function verTraslados(){
    if(validarDatosTraslados()){
        let origen = document.getElementById("desdeTraslados")
        let destino = document.getElementById("hastaTraslados")
        let valorOrigen = origen.value
        let valorDestino = destino.value
        let textoOrigen = origen.options[origen.selectedIndex].text;
        let textoDestino = destino.options[destino.selectedIndex].text;
        let personas = ""
        if(!document.getElementById("personasTraslados").value){
            personas = 1
        }else{
            personas = document.getElementById("personasTraslados").value
        }

        let datos ={
            ciudad: ciudadGlobal,
            origen : valorOrigen,
            origenName: textoOrigen,
            destino : valorDestino,
            destinoName: textoDestino,
            fecha: document.getElementById("fechaTraslado").value,
            hora: document.getElementById("horaTraslado").value,
            personas : personas
        }
        console.log(datos)
        var datosString = JSON.stringify(datos)
        var datosEncode = encodeURIComponent(datosString)
        var url = window.location.origin + "/listaTraslados?datos=" + datosEncode
        window.location.href = url
    }else{
        mensajeUsuario("info","Ooops...","Por favor llene todos los campos")
    }
    
}



function validarDatosTraslados(){
    if(
        document.getElementById("desdeTraslados").value &&            
        document.getElementById("hastaTraslados").value &&
        document.getElementById("fechaTraslado").value &&
        document.getElementById("horaTraslado").value
    ){
        return true
    }
    return false
}




var proteccionTraslados = true
    function buscadorDestinosTraslados(event){
        $("#spinnerContenidoTraslados").show()
        $("#buscadorContenidoTraslados").hide()
        
        setTimeout(function() {
            let textoIngresado = document.getElementById("ciudadTraslados").value;
            let numero = parseInt(textoIngresado.length)
            if(numero > 3 && proteccionTraslados){
                proteccionTraslados = false
                mostrarDestinosTraslados(textoIngresado)
            }else if(numero < 3){
                $("#spinnerContenidoTraslados").hide()
                $("#buscadorContenidoTraslados").show() 
                mostrarValoresDefaultTraslados()
            }       
        }, 2000);
        
    }


    function mostrarDestinosTraslados(buscador){
        proteccionTraslados = false
        Obtener_API_Vuelos(null, '/api/civitatis/buscador?parametro='+buscador, datos => {
            var destinos = []
            if (datos.estado) {
                proteccionTraslados = true
                datos.consulta.forEach((element, index) => {
                    let existe = destinos.some(aux => aux.id === element.destinationId)
                    if(!existe && destinos.length<4){
                        // if(element.city.toLowerCase() === buscador.toLowerCase()){
                            let nuevoDestino = {
                                id: element.destinationId,
                                ciudad: element.city,
                                pais: element.country
                            }
                            destinos.push(nuevoDestino)
                        // }
                    }
                });
                armarDestinosTraslados(destinos)
                $("#spinnerContenidoTraslados").hide()
                $("#buscadorContenidoTraslados").show()  
            }
            else{
                mensajeUsuario("error","Ooops...",datos.error)

            }

        })
    }


    function armarDestinosTraslados(destinos){
        console.log(destinos)
        var lista = ""
        destinos.forEach((element, index) => {
            lista += `
                    <div class="col-lg-6 col-sm-12">
                        <a class="dropdown-item text-wrap" href="#" onclick="irTraslado('`+element.id+`','`+element.ciudad+`','`+element.pais+`');return false;" style="white-space: normal;">
                            <strong>`+element.ciudad+`</strong> 
                            <span class="text-muted" style="font-size: small;">`+element.pais+`</span>
                        </a>
                    </div>
            `
            $("#listaDestinosTralados").html(lista)
            return
        });
    }
    
    var ciudadGlobal = ""
    function irTraslado(id,ciudad,pais) {
        $("#spinnerTraslado").show()
        $("#faqTraslados").show()
        $("#linkContenido").hide()
        document.getElementById("ciudadTraslados").value = ciudad.toUpperCase() +" - "+ pais.toUpperCase()
        var dropdown = document.getElementById("dropdownTraslados");
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        ciudadGlobal = id
        cargarInformacion(id)
        cargarFAQs(id,ciudad,pais)
    }

    
    var zonasGlobal=[]
    function cargarInformacion(id){
        Obtener_API_Vuelos(null, '/api/civitatis/zonas/'+id, datos => {
            if (datos.estado) {
                zonasGlobal = datos.consulta.zones 
                armarOrigenDestino()
            }
            else{
                mensajeUsuario("error","Ooops...",datos.error)
            }
        })
    }



    function armarOrigenDestino(){
        var lista = ""
        zonasGlobal.forEach(element => {
            lista +=`<option value="`+element.id+`">`+element.label.toUpperCase()+`</option>`
        });
        $("#desdeTraslados").html(lista)
        $("#desdeTraslados").html(lista).prop("disabled", false);
        actualizarDestino()

    }



    function actualizarDestino(){
        var lista = ""
        var idOrigen = document.getElementById("desdeTraslados").value
        zonasGlobal.forEach(element => {
            if(element.id == idOrigen){
                element.related.forEach(relacion => {
                    lista += `<option value="`+relacion.id+`">`+relacion.label.toUpperCase()+`</option>`
                });
                $("#hastaTraslados").html(lista).prop("disabled", false);
                return
            }
        });
    }



    function cargarFAQs(id,ciudad, pais){
        Obtener_API_Vuelos(null, '/api/civitatis/faqs/'+id, datos => {
            if (datos.estado) {
                armarFAQs(datos.consulta, ciudad, pais)
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



    function armarFAQs(datos,ciudad,pais){
        var lista = ""
        datos.forEach((element, index) => {
            lista += `
                <div class="card">
                    <div class="card-header">
                        <h4>
                        <a class="accordion-toggle" data-bs-toggle="collapse" data-bs-parent="#payment" href="#numero`+index+`">`+element.title+`<i class="indicator icon-plus float-end"></i></a>
                        </h4>
                    </div>
                    <div id="numero`+index+`" class="collapse" data-bs-parent="#payment">
                        <div class="card-body">
                            `+element.answer+`
                        </div>
                    </div>
                </div>
            `
        });
        $("#listaFAQ").html(lista)
        $("#fullWidthModalLabel").html("FAQs TRASLADOS- "+ciudad.toUpperCase()+", "+pais.toUpperCase())
        $("#linkContenido").show()
        $("#linkContenido").html("¿Tienes dudas sobre como reservar traslados en "+ciudad+"? Revisa las FAQs aquí.")
        $("#spinnerTraslado").hide()

    }
