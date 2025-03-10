var personas = {}
    var info = {
        vueloIda: "",
        vueloVuelta:""
    }
function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const idVueloIda = urlParams.get('idVueloIda');
    const idVueloVuelta = urlParams.get('idVueloVuelta');
    const person = urlParams.get('personas');
    info.vueloIda = idVueloIda;
    info.vueloVuelta = idVueloVuelta;
    if (idVueloIda && idVueloVuelta && person) {
        const personasDecoded = decodeURIComponent(person);
        const personasObj = JSON.parse(personasDecoded);
        const arrayDePares = Object.entries(personasObj);
        personas = arrayDePares
        consultarVuelos(idVueloIda, idVueloVuelta, transformArrayToObject(personas));
        construirCards(personas)

    } else {
        console.log('Datos Vuelo no especificado');
        setTimeout(() => {
            goBack()
        }, 2000);
        
    }
    
}


function formatDateToDMY(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}


function hacerReserva(){
    let datosReserva =  {
            origin: info.vueloIda,
            destination: info.vueloVuelta,
            passengers: []
        }
    let vuelosArray = {
        vuelos:[]
    }
    let aux=true  
    let texto = ""
    personas.forEach(([clave, valor],index) => {
        const numero = parseInt(valor, 10); 
        if (numero > 0) { // Solo imprimir si el valor es mayor a 0
            for (let i = 1; i <= numero; i++) {
                var tipo = ""
                if(clave == "adultos" || clave == "viejos" || clave == "discapacitados"){
                    tipo = "ADT"
                }else if(clave == "ninos"){
                    tipo = "CHD"
                }else if(clave == "bebes"){
                    tipo = "INF"
                }
                
                var nacimiento = formatDateToDMY(document.getElementById("fechaNacimiento"+index+i).value)
                let newPassenger = {
                    birth: nacimiento,
                    document:{
                        number: document.getElementById("numDocumento"+index+i).value,
                        type: document.getElementById("tipoDocumento"+index+i).value,
                        issuing_country: "EC",
                        valid_thru: document.getElementById("fechaCaducidad"+index+i).value

                    },
                    firstname: document.getElementById("nombres"+index+i).value,
                    lastname: document.getElementById("apellidos"+index+i).value,
                    gender: document.getElementById("genero"+index+i).value,
                    nationality: "EC",
                    type: tipo
                }
                datosReserva.passengers.push(newPassenger);
                texto += validarDato("fechaNacimiento"+index+i);
                texto += validarDato("numDocumento"+index+i);
                texto += validarDato("fechaCaducidad"+index+i);
                texto += validarDato("nombres"+index+i);
                texto += validarDato("apellidos"+index+i);
                if(
                    !newPassenger.birth || !newPassenger.firstname || !newPassenger.lastname || 
                    !newPassenger.gender || !newPassenger.document.number || !newPassenger.document.type || !newPassenger.document.valid_thru 
                ){
                    aux = false
                }
            }
        }
    });
    vuelosArray.vuelos.push(datosReserva)
    if(aux){
        const datoFactura = arrayFacturacion()
        if(verificarArray(datoFactura)){
            realizarReserva(vuelosArray, datoFactura)
        }
        else{
            Swal.fire({
                icon: 'info',
                title: 'Mensaje:',
                text: 'Debe llenar los campos',
                confirmButtonText: 'Entendido'
            })
        }
    }else{
        Swal.fire({
                icon: 'info',
                title: 'Mensaje:',
                text: 'Debe llenar los campos '+texto,
                confirmButtonText: 'Entendido'
            })
    }
}


function arrayFacturacion(){
    const datos = {
        nombre: document.getElementById("nombreFacturacion").value,
        cedula: document.getElementById("ciFacturacion").value,
        correo: document.getElementById("correoFacturacion").value,
        telefono: document.getElementById("telefonoFacturacion").value,
        direccion: document.getElementById("direccionFacturacion").value
    }
    return datos
}


var contador=1;
function verificarReserva(idBooking){
    if(contador <= 3){
        Obtener_API_Vuelos(null, '/api/chequeando/booking/'+idBooking, datos => {
            if (datos.estado) {
                contador = 1
                console.log("VERIFICADO. todo salio bien")
                cerrarSpinner()
                var idResumen = datos.consulta.reservation_id
                var idResumenJSON = JSON.stringify(idResumen)
                var idResumenEncode = encodeURIComponent(idResumenJSON)

                var person = transformArrayToObject(personas)
                var personasString = JSON.stringify(person)
                var personasEncode = encodeURIComponent(personasString)

                var url = window.location.origin + "/resumenVuelos?idResumen="+ idResumenEncode+"&personas="+ personasEncode;
                window.location.href = url;
            }
            else {
                setTimeout(() => {
                    contador = contador+1
                    verificarReserva(idBooking);
                }, 10000);
            }
        })
    }
    else{
        cerrarSpinner()
        contador = 1
        mensajeUsuario('error', 'Oops...', 'Error en generar reserva')
        setTimeout(() => {
            goBack()
        }, 2000);
    }
}

function validarDato(idCampo){
    let value = document.getElementById(idCampo).value
    let texto = ""
    if(!value){
        document.getElementById(idCampo+"_").classList.add("text-danger")
        texto = document.getElementById(idCampo+"_").textContent;
        document.getElementById(idCampo+"_").textContent = texto+"*"
        texto += ", "
    }else{
        document.getElementById(idCampo+"_").classList.remove("text-danger")
        let aux= document.getElementById(idCampo+"_").textContent.slice(0,-1);
        document.getElementById(idCampo+"_").textContent = aux
    }
    return texto
}



function realizarReserva(datosReserva, datosFactura){
    // console.log(datosFactura)
    // console.log(detallesArray)
    // console.log(datosReserva)
    let datos = {
        vuelos: detallesArray,
        pasajeros: {
            holder: datosFactura,
            pasajeros: datosReserva.vuelos[0].passengers
        }
    }
    console.log(datos)
    abrirSpinner("Realizando reserva...")
    Enviar_API(JSON.stringify(datos), 'leads/vuelos-leads', datos => {
        if (datos.estado){
            // console.log("Reserva realizada,vamos a verificar si se hizo...")
            // var idReserva = datos.consulta.id
            // setTimeout(() => {
            //     verificarReserva(idReserva);
            // }, 10000);
            setTimeout(() => {
                cerrarSpinner()
            }, 2000);
            
        }else{
            // cerrarSpinner()
            // mensajeUsuario('error','Oooops...', 'Error en generar reserva')
            setTimeout(() => {
                cerrarSpinner()
            }, 2000);
        }
    })


    //ESTO ES PARA RESERVAR DIRECTAMENTE 
    // abrirSpinner("Realizando reserva...")
    // Enviar_API_Vuelos(JSON.stringify(datosReserva), '/api/chequeando/booking', datos => {
    //     if (datos.estado){
    //         console.log("Reserva realizada,vamos a verificar si se hizo...")
    //         var idReserva = datos.consulta.id
    //         setTimeout(() => {
    //             verificarReserva(idReserva);
    //         }, 10000);
            
    //     }else{
    //         cerrarSpinner()
    //         mensajeUsuario('error','Oooops...', 'Error en generar reserva')
    //         setTimeout(() => {
    //             goBack()
    //         }, 2000);
    //     }
    // })
}


function cotizarReserva(id) {
    $("#cotizacionTitulo").show()
    $("#descripcionCotizacion").show()
    generarPDF(id)
    setTimeout(function() {
        $("#cotizacionTitulo").hide()
        $("#descripcionCotizacion").hide()
    }, 10); 
    
}



function generarPDF(id){
    const contenido = document.getElementById(id);
    const opciones = {
        margin: [15, 15, 15, 15], // Margenes del PDF
        filename: 'cotizacion.pdf', // Nombre del archivo PDF
        image: { type: 'jpeg', quality: 1 }, // Configuración de imagen
        html2canvas: { scale: 2 }, // Configuración de html2canvas
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Configuración de jsPDF
    };
    html2pdf().from(contenido).set(opciones).save();
}





function consultarVuelos(idIda, idVuelta, personas){
    abrirSpinner("Cargando información, por favor espere...")
    const date = { 
        items: {
        "departure": idIda,
        "arrival": idVuelta
        }
    }
    Enviar_API_Vuelos(JSON.stringify(date), '/api/chequeando/confirma', datos => {
        if (datos.estado){
            cerrarSpinner()
            armarResumenCostos(datos.consulta.price, personas)
            armarResumenIda(datos.consulta,0)
            armarResumenVuelta(datos.consulta,1)
            armarArrayDetalles(datos.consulta, personas)

        }else{
            cerrarSpinner()
            mensajeUsuario("error","Ooops...","Los vuelos seleccionados no estan disponibles")
            setTimeout(() => {
                goBack()
            }, 2000);
        }
    })
}


var detallesArray = {}
function armarArrayDetalles(datos, personas){
    // detallesArray = {
    //     aereolina: resumenNombreAereolina(datos.validating_carrier.name),
    //     precioTotal: datos.price.total,
    //     detalleVueloIda: "",
    //     detalleVueloVuelta: ""
    // }

    detallesArray = {
        aereolina: resumenNombreAereolina(datos.validating_carrier.name),
        precioTotal: actualizarFeePrecios(personas, datos.price),
        vueloIda : {
            idVueloIda: info.vueloIda,
            detalles: datos.segments[0]
        },
        vueloVuelta : {
            idVueloVuelta: info.vueloVuelta,
            detalles: datos.segments[1]
        } 
    }

}




function armarResumenCostos(precios, personas){
    let lista = armarCostos(precios, personas, "")
    $("#costosForm").html(lista)
    $("#costos").show()
}




function armarResumenIda(datos,tipo){
    var lista =""
    lista += `
        <div class="row">
            <hr style="margin: 0;">
            <div class="col-12" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <span style="font-size:14px; margin-right: 40px;">Aereolina: <strong> <img src="`+sacarLogoAereolina(datos.validating_carrier.code)+`" alt="" height="20" width="20"> `+resumenNombreAereolina(datos.validating_carrier.name)+`</strong></span>`
                lista += `<span style="font-size:14px; margin-right: 40px;">Fecha: <strong>`+datos.segments[tipo].options[0].departure_date+`</strong></span>`
                lista += `<span style="font-size:14px; margin-right: 40px;">Equipaje: `+revisarEquipajes(datos.segments[tipo].options[0].baggage_allowances)+`</span>`
                lista += `<span style="font-size:14px;">Duración Total: <strong>`+formatoHora(datos.segments[tipo].options[0].duration)+`</strong></span>`
                lista +=`
            </div>
            <hr style="margin: 0;">        
        </div>`
    lista += armarDetalleEscala(datos.segments[tipo].options[0].legs,1)
    
    $('#cardCollpase1').html(lista);
    
}



function armarResumenVuelta(datos,tipo){
    var lista =""
    lista += `
        <div class="row">
             <hr style="margin: 0;">
            <div class="col-12" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size:14px; margin-right: 40px;">Aereolina: <strong> <img src="`+sacarLogoAereolina(datos.validating_carrier.code)+`" alt="" height="20" width="20"> `+resumenNombreAereolina(datos.validating_carrier.name)+`</strong></span>`
                lista += `<span style="font-size:14px; margin-right: 40px;">Fecha: <strong>`+datos.segments[tipo].options[0].arrival_date+`</strong></span>`
                lista += `<span style="font-size:14px; margin-right: 40px;">Equipaje: `+revisarEquipajes(datos.segments[tipo].options[0].baggage_allowances)+`</span>`
                lista += `<span style="font-size:14px;">Duración Total: <strong>`+formatoHora(datos.segments[tipo].options[0].duration)+`</strong></span>`
                lista +=`
            </div>
            <hr style="margin: 0;">      
        </div>  `
    lista += armarDetalleEscala(datos.segments[tipo].options[0].legs,1)
    
    $('#cardCollpase2').html(lista);
    
}






function construirCards(personas){
    const descripciones = {
        adultos: 'Adulto',
        ninos: 'Niño',
        bebes: 'Bebé',
        viejos: 'Tercera Edad',
        discapacitados: 'Discapacitado'
    };
    personas.forEach(([clave, valor],index) => {
        const numero = parseInt(valor, 10); 
        if (numero > 0) { // Solo imprimir si el valor es mayor a 0
            const descripcion = descripciones[clave] || clave; // Obtener la descripción o usar la clave como fallback
            for (let i = 1; i <= numero; i++) {
                var lista = `
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                    <h4 class="card-title mb-3">${descripcion} ${i}</h4>
                                </div>
                                <div class="col-6" style ="display: flex; justify-content: end;">
                                    <a data-bs-toggle="collapse" href="#card${index}${i}" role="button" aria-expanded="false" aria-controls="cardCollpase1"><i class="mdi mdi-minus" style="font-size:30px"></i></a>
                                </div>        
                            </div>
                            <div id="card${index}${i}" class="collapse show">
                                <div class="row">
                                    <div class="col-lg-6 mb-3">
                                        <label for="simpleinput" class="form-label" id="nombres${index}${i}_">Nombres</label>
                                        <input type="text" id="nombres${index}${i}" class="form-control" placeholder="Ingrese los nombres">
                                    </div>

                                    <div class="col-lg-6 mb-3">
                                        <label for="simpleinput" class="form-label" id="apellidos${index}${i}_">Apellidos</label>
                                        <input type="text" id="apellidos${index}${i}" class="form-control" placeholder="Ingrese los apellidos">
                                    </div>

                                    <div class="col-lg-6 mb-3">
                                        <label for="example-select" class="form-label">Género</label>
                                        <select class="form-select" id="genero${index}${i}">
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                        </select>
                                    </div>

                                    <div class="col-lg-6 mb-3">
                                        <label for="example-select" class="form-label">Tipo de Documento de Identidad</label>
                                        <select class="form-select" id="tipoDocumento${index}${i}">
                                            <option value="CI">Cédula de Identidad</option>
                                            <option value="TP">Pasaporte</option>
                                        </select>
                                    </div>

                                    <div class="col-lg-6 mb-3">
                                        <label for="simpleinput" class="form-label" id="numDocumento${index}${i}_">Número de Documento de Identidad</label>
                                        <input type="text" id="numDocumento${index}${i}" class="form-control" placeholder="Ingrese el número de documento">
                                    </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="example-date" class="form-label" id="fechaNacimiento${index}${i}_">Fecha de Nacimiento</label>
                                    <input class="form-control" id="fechaNacimiento${index}${i}" type="text" autocomplete="off" placeholder="Fecha de nacimiento" style=" background-color: white;">
                                </div>

                            
                                <div class="col-lg-6 mb-3">
                                    <label for="example-date" class="form-label" id="fechaCaducidad${index}${i}_">Fecha de caducidad</label>
                                    <input class="form-control" id="fechaCaducidad${index}${i}" type="text" placeholder="Fecha de caducidad del documento de identidad" autocomplete="off" style=" background-color: white;">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>`

                $('#informacionClientes').append(lista)
                iniciarDatePickers(index, i, clave)
            }
        }
    });
}



function iniciarDatePickers(index, i, descripcion){
    let today = new Date();
    let minDate = new Date();
    if(descripcion == "adultos"){
        minDate.setFullYear(today.getFullYear() - 64);
        minDate.setMonth(today.getMonth() - 11);

        // Calcula la fecha máxima permitida (12 años antes de hoy)
        let maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 12);

        // Inicializa Flatpickr para el input con ID dinámico
        flatpickr(`#fechaNacimiento${index}${i}`, {
            dateFormat: "Y-m-d",
            minDate: minDate.toISOString().split('T')[0], // Convierte la fecha mínima a formato YYYY-MM-DD
            maxDate: maxDate.toISOString().split('T')[0], // Convierte la fecha máxima a formato YYYY-MM-DD
            disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
        });

    }else if(descripcion == "ninos"){
        minDate.setFullYear(today.getFullYear() - 11);
        minDate.setMonth(today.getMonth() - 11);

        // Calcula la fecha máxima permitida (2 años antes de hoy)
        let maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 2);

        // Inicializa Flatpickr para el input con ID dinámico
        flatpickr(`#fechaNacimiento${index}${i}`, {
            dateFormat: "Y-m-d",
            minDate: minDate.toISOString().split('T')[0], // Convierte la fecha mínima a formato YYYY-MM-DD
            maxDate: maxDate.toISOString().split('T')[0], // Convierte la fecha máxima a formato YYYY-MM-DD
            disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
        });

    }else if(descripcion == "bebes"){
        minDate.setFullYear(today.getFullYear() - 1);
        minDate.setMonth(today.getMonth() - 11);
        flatpickr(`#fechaNacimiento${index}${i}`, {
            minDate: minDate.toISOString().split('T')[0], // Convierte la fecha mínima a formato YYYY-MM-DD
            maxDate: today.toISOString().split('T')[0],
            dateFormat: "Y-m-d",
            disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
        }) 

    }else if(descripcion == "viejos"){
        let maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 65);

        // Inicializa Flatpickr para el input con ID dinámico
        flatpickr(`#fechaNacimiento${index}${i}`, {
            dateFormat: "Y-m-d",
            maxDate: maxDate.toISOString().split('T')[0], // Convierte la fecha máxima a formato YYYY-MM-DD
            disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
        });

    }else if(descripcion == "discapacitado"){
        flatpickr(`#fechaNacimiento${index}${i}`, {
        dateFormat: "Y-m-d",
        disableMobile: true 
    })  

    }
    flatpickr(`#fechaCaducidad${index}${i}`, {
        dateFormat: "Y-m-d",
        disableMobile: true 
    })     
}

document.querySelectorAll('input[name="customRadio"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var item = event.target.id;
        if(item == "copiar"){
            document.getElementById("nombreFacturacion").value = document.getElementById("nombres01").value +' '+ document.getElementById("apellidos01").value
            document.getElementById("ciFacturacion").value = document.getElementById("numDocumento01").value
        }else if (item == "limpiar"){
            document.getElementById("nombreFacturacion").value = ""
            document.getElementById("ciFacturacion").value = ""

        }
    });
});


function goBack(){
    var url = window.location.origin + "/listaVuelos"
    window.location.href = url;
}



