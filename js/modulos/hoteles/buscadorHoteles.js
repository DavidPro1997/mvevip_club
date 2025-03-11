function mostrarValoresDefaultHoteles(idBuscador){
    var lista = `
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('CTG - Cartagena - Colombia','`+idBuscador+`');return false;" style="white-space: normal;">
                <strong>CTG - Cartagena</strong> 
                <span class="text-muted" style="font-size: small;">Colombia</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('PTY - Ciudad de Panama - Panama','`+idBuscador+`');return false;" style="white-space: normal;">
                <strong>PTY - Ciudad de Panama</strong> 
                <span class="text-muted" style="font-size: small;">Panama</span>
            </a>
        </div>
         <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('ADZ - San Andres - Colombia','`+idBuscador+`');return false;" style="white-space: normal;">
                <strong>ADZ - San Andres</strong> 
                <span class="text-muted" style="font-size: small;">Colombia</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('MDE - Medellin - Colombia','`+idBuscador+`');return false;" style="white-space: normal;">
                <strong>MDE - Medellin</strong> 
                <span class="text-muted" style="font-size: small;">Colombia</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('PUJ - Punta Cana - Republica Dominicana','`+idBuscador+`');return false;" style="white-space: normal;">
                <strong>PUJ - Punta Cana</strong> 
                <span class="text-muted" style="font-size: small;">Republica Dominicana</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('CUN - Cancún - México','`+idBuscador+`');return false;" style="white-space: normal;">
                <strong>CUN - Cancún </strong> 
                <span class="text-muted" style="font-size: small;">México</span>
            </a>
        </div>
    `
    $("#listaDestinosHoteles_"+idBuscador).html(lista)
}




var proteccionHoteles = true
function buscadorDestinosHotel(event, idBuscador){
    $("#spinnerContenidoHotel_"+idBuscador).show()
    $("#buscadorContenidoHotel_"+idBuscador).hide()
    
    setTimeout(function() {
        let textoIngresado = document.getElementById("destinoHotel_"+idBuscador).value;
        let numero = parseInt(textoIngresado.length)
        if(numero > 0 && proteccionHoteles){
            proteccionHoteles = false
            mostrarDestinosHoteles(textoIngresado, idBuscador)
        }else if(numero <= 0){
            $("#spinnerContenidoHotel_"+idBuscador).hide()
            $("#buscadorContenidoHotel_"+idBuscador).show() 
            mostrarValoresDefaultHoteles(idBuscador)
        }       
    }, 2000);
    
}


function mostrarDestinosHoteles(buscador, idBuscador){
    proteccionHoteles = false
    Obtener_API_Vuelos(null, '/api/hotelbeds/destinos?buscador='+buscador, datos => {
        var destinos = []
        if (datos.estado) {
            proteccionHoteles = true
            datos.consulta.forEach((element) => {
                let existe = destinos.some(aux => aux.id === element.destinationId)
                if(!existe){
                        let nuevoDestino = {
                            id: element.code,
                            ciudad: element.destino,
                            pais: element.pais
                        }
                        destinos.push(nuevoDestino)
                }
            });
            armarDestinosHoteles(destinos, idBuscador)
            $("#spinnerContenidoHotel_"+idBuscador).hide()
            $("#buscadorContenidoHotel_"+idBuscador).show()  
        }
        else{
            mensajeUsuario("error","Ooops...",datos.error)

        }

    })
}


function armarDestinosHoteles(destinos, idBuscador){
    var lista = ""
    destinos.forEach((element) => {
        lista += `
                <div class="col-lg-12 col-sm-12">
                    <a class="dropdown-item text-wrap" href="#" onclick="escogerSalida('`+element.id+` - `+element.ciudad+` - `+element.pais+`', '`+idBuscador+`');return false;" style="white-space: normal;">
                        <strong>`+element.id+` - `+element.ciudad+`</strong> 
                        <span class="text-muted" style="font-size: small;">`+element.pais+`</span>
                    </a>
                </div>
        `
        $("#listaDestinosHoteles_"+idBuscador).html(lista)
        return
    });
}



function escogerSalida(ciudadEscogida, idBuscador){
    document.getElementById("destinoHotel_"+idBuscador).value = ciudadEscogida.toUpperCase()
    var dropdown = document.getElementById("dropdownHoteles_"+idBuscador);
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}



function establecerSalidaHoteles(){
    flatpickr("#chekInHotel", {
        minDate: "today", // Bloquear fechas anteriores a hoy
        dateFormat: "Y-m-d",
        disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
    }) 
}

function establecerRegresoHotel(){
    var fechaSalida = document.getElementById("chekInHotel").value
    
    let fechaMaximaAux = new Date(fechaSalida);
    fechaMaximaAux.setDate(fechaMaximaAux.getDate() + 30); 
    let fechaMaxima = fechaMaximaAux.toISOString().split('T')[0];

    let fechaSalidaDate = new Date(fechaSalida);
    fechaSalidaDate.setDate(fechaSalidaDate.getDate() + 1); 
    let fechaMinima = fechaSalidaDate.toISOString().split('T')[0];
    flatpickr("#chekOutHotel", {
        minDate: fechaMinima, 
        maxDate: fechaMaxima,
        dateFormat: "Y-m-d",
        disableMobile: true,
        defaultDate: fechaMinima,
        onReady: function(selectedDates, dateStr, instance) {
            instance.open(); 
    }
    });
}


var occupancies = [
    {
        rooms: 1,
        adults: 2,
        children: 0,
        paxes: []
    }
]

function agregarHabitacion(){
    let nuevahabitacion = {
        rooms: 1,
        adults: 2,
        children: 0,
        paxes: []
    }
    occupancies.push(nuevahabitacion)  
    mostrarHabitaciones()
}




function mostrarHabitaciones(){
    var lista =""
    occupancies.forEach((element,index) => {
        if(index > 0){
            lista += `
            <hr>
                <div id="habitacion`+index+`" class="mt-2">
                    <div  class="d-flex justify-content-between align-items-center">
                        <h6 class="dropdown-header" style="font-size: 16px; color: black;">
                            <i class="fas fa-building"></i>
                            Habitación `+(index+1)+`
                        </h6>
                        <button type="button" class="btn" style="background-color: red; margin-right:10px" onclick="eliminarHabitacion();  event.stopPropagation();">
                            <i class="fas fa-plus" style="transform: rotate(45deg); color: white;"></i>
                        </button>
                    </div>
                    <div class="row" style="margin-left: 15px; margin-right: 5px; align-items: center;">


                        <div class="col-6">
                            <div class="form-group">
                                <label>Adultos</label>
                                <div class="d-flex align-items-center">
                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(-1, 'numeroAdulto`+(index)+`',0,'`+(index)+`',2,0,6)"><i class="icon-minus" style="color: #aaa9a9;"></i></button></button>
                                    <input type="text" value="`+(element.adults)+`" id="numeroAdulto`+(index)+`" class="form-control form-control-lg" style="width:43px; background-color: white;" readonly  onchange="actualizarPersonas(0,`+(index)+`);">                                                                                    
                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(1, 'numeroAdulto`+(index)+`',0,'`+(index)+`',2,0,6)"><i class="icon-plus" style="color: #aaa9a9;"></i></button>
                                </div>
                            </div>
                        </div>
                        


                        <div class="col-6">
                            <div class="form-group">
                                <label>Niños</label>
                                <div class="d-flex align-items-center">
                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(-1, 'numeroNino`+(index)+`',1,'`+(index)+`',2,0,4)"><i class="icon-minus" style="color: #aaa9a9;"></i></button></button>
                                    <input type="text" value="`+(element.children)+`" id="numeroNino`+(index)+`" class="form-control form-control-lg" style="width:43px; background-color: white;" readonly onchange="actualizarPersonas(1,`+(index)+`);">
                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(1, 'numeroNino`+(index)+`',1,'`+(index)+`',2,0,4)"><i class="icon-plus" style="color: #aaa9a9;"></i></button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-sm-12" `
                        if(element.children <0){
                            lista += `style="display: none;"`
                        }
                        lista +=` id="edadesNinos_`+(index)+`">
                            <span>Edades niños</span>
                            <div class="row">`
                                let contador = 0
                                element.paxes.forEach(edades => {
                                    lista += `
                                        <div class="col-4" style="display: flex; align-items: center; display: none;" id="ninoC_`+(index)+`_`+(contador)+`">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(-1, 'nino_`+(index)+`_`+(contador)+`',`+(index)+`,`+(contador)+`,1,0,11)"><i class="icon-minus" style="color: #aaa9a9;"></i></button></button>
                                                    <input type="text" value="`+(edades.age)+`" id="nino_`+(index)+`_`+(contador)+`" class="form-control" onchange="actualizarEdad(`+(index)+`,`+(contador)+`)" style="width:43px; background-color: white;" readonly>
                                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(1, 'nino_`+(index)+`_`+(contador)+`',`+(index)+`,`+(contador)+`,1,0,11)"><i class="icon-plus" style="color: #aaa9a9;"></i></button>
                                                </div>
                                                <p style="text-align:center; font-size:13px;">años</p>
                                            </div>
                                        </div>
                                    `
                                    contador = contador+1
                                })
                                for(let i=contador; i<4; i++){
                                    lista += `

                                        <div class="col-4" style="display: flex; align-items: center; display: none;" id="ninoC_`+(index)+`_`+i+`">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(-1, 'nino_`+(index)+`_`+i+`',`+(index)+`,`+i+`,1,0,11)"><i class="icon-minus" style="color: #aaa9a9;"></i></button></button>
                                                    <input type="text" value="2" id="nino_`+(index)+`_`+i+`" class="form-control" onchange="actualizarEdad(`+(index)+`,`+i+`)" style="width:43px; background-color: white;" readonly>
                                                    <button type="button" class="btn border-gray rounded" onclick="actualizarValor(1, 'nino_`+(index)+`_`+i+`',`+(index)+`,`+i+`,1,0,11)"><i class="icon-plus" style="color: #aaa9a9;"></i></button>
                                                </div>
                                                <p style="text-align:center; font-size:13px;">años</p>
                                            </div>
                                        </div>

                                    `
                                }
                                lista +=
                                `
                               
                            </div>
                        </div>
                    </div>
                </div> 
                `
        }
    });
    
    $("#habitaciones").html(lista)

    let contenedor = document.getElementById("dropdownPersonasHoteles");
    if (contenedor) {
        setTimeout(() => {
            contenedor.scrollTop = contenedor.scrollHeight;
        }, 50);
        
    }
    
    
}


function eliminarHabitacion(){
    // let ultimoValor = occupancies[occupancies.length - 1];
    if(occupancies.length > 1){
        occupancies.pop()
        mostrarHabitaciones()

    }
    
}

function actualizarPersonas(tipo,numero){
    let valor=""
    if(tipo == 0){
        valor = document.getElementById("numeroAdulto"+numero).value
        occupancies[numero].adults = parseInt(valor)
    }else if(tipo == 1){
        valor = document.getElementById("numeroNino"+numero).value
        editarEdades(parseInt(valor),numero)
        if(parseInt(valor)>0){
            $("#edadesNinos_"+numero).show()
            for(let i=0;i<4;i++){                                        
                if(parseInt(valor)>i){
                    $("#ninoC_"+numero+"_"+i).show()
                }else{
                    $("#ninoC_"+numero+"_"+i).hide()

                }
            }
        }
        else{
            $("#edadesNinos_"+numero).hide()
        }
        occupancies[numero].children = parseInt(valor)
    }
}




function editarEdades(valor,numero){
    if(occupancies[numero].paxes.length > valor){
        occupancies[numero].paxes.pop()
    }else if(occupancies[numero].paxes.length < valor){
        let nuevaEdad = {
                type: "CH",
                age: 2
            }
        occupancies[numero].paxes.push(nuevaEdad) 
    }
}

function actualizarEdad(numeroItem,numeroEdad){
    let valor = document.getElementById("nino_"+numeroItem+"_"+numeroEdad).value
    occupancies[numeroItem].paxes[numeroEdad].age = parseInt(valor)        
}


function cargarPersonasHoteles() {
    let personas = 0
    let habitaciones = occupancies.length
    occupancies.forEach(element => {
        personas= personas+element.adults+element.children
    });
    document.getElementById("personasHoteles").value = "👤 "+personas+" PERSONAS Y 🏠 "+habitaciones+" HABITACIONES"
    var dropdown = document.getElementById("dropdownPersonasHoteles");
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}



// function cargarPersonasHoteles(index) {
//     let personas = 0
//     let habitaciones = itemsCotizaciones[index].formularioHotel.occupancies.length
//     itemsCotizaciones[index].formularioHotel.occupancies.forEach(element => {
//         personas= personas+element.adults+element.children
//     });
//     document.getElementById("personasHoteles_"+index).value = "👤 "+personas+" PERSONAS Y 🏠 "+habitaciones+" HABITACIONES"
//     var dropdown = document.getElementById("dropdownPersonasHoteles_"+index);
//     if (dropdown) {
//         dropdown.classList.remove('show');
//     }
// }

function buscarHoteles(idBuscador){
    
    let destino = ""
    let fechaLlegada = ""
    let fechaSalida = ""
    let datos = {}
    if(validarDatos(idBuscador)){
        let result = mergeUniqueRooms(occupancies);
        destino = (document.getElementById("destinoHotel_"+idBuscador).value).substring(0, 3);
        fechaLlegada = document.getElementById("chekInHotel").value
        fechaSalida = document.getElementById("chekOutHotel").value
        datos = 
        {
            destinationId: destino,
            stay: {
                checkIn: fechaLlegada,
                checkOut: fechaSalida
            },
            occupancies: result
        }
        
        let datosString = encodeURIComponent(JSON.stringify(datos));
        var url = window.location.origin + "/listaHoteles?datos=" + datosString
        window.location.href = url;
    }
    else{
        mensajeUsuario('info','Oops...','Debe llenar todos los campos')
    }
    
}



// function buscarHoteles(){
//     let destino = ""
//     let fechaLlegada = ""
//     let fechaSalida = ""
//     let datos = {}
//     if(validarDatos()){
//         let result = mergeUniqueRooms(occupancies);
//         destino = (document.getElementById("destinoHotel").value).substring(0, 3);
//         fechaLlegada = document.getElementById("chekInHotel").value
//         fechaSalida = document.getElementById("chekOutHotel").value
//         datos = 
//         {
//             destinationId: destino,
//             stay: {
//                 checkIn: fechaLlegada,
//                 checkOut: fechaSalida
//             },
//             occupancies: result
//         }
//         let datosString = encodeURIComponent(JSON.stringify(datos));
//         var url = window.location.origin + "/listaHoteles?datos=" + datosString
//         window.location.href = url;
//     }
//     else{
//         mensajeUsuario('info','Oops...','Debe llenar todos los campos')
//     }
    
// }




function validarDatos(idBuscador){
    if(
        document.getElementById("destinoHotel_"+idBuscador).value &&
        document.getElementById("chekInHotel").value &&
        document.getElementById("chekOutHotel").value
    ){
        return true
    }
    return false
}




// function validarDatos(){
//     if(
//         document.getElementById("destinoHotel").value &&
//         document.getElementById("chekInHotel").value &&
//         document.getElementById("chekOutHotel").value
//     ){
//         return true
//     }
//     return false
// }



function mergeUniqueRooms(arr) {
    const uniqueArray = [];
    arr.forEach(item => {
        const found = uniqueArray.find(el =>
            el.adults === item.adults &&
            el.children === item.children &&
            JSON.stringify(el.paxes) === JSON.stringify(item.paxes)
        );
        if (found) {
            found.rooms += item.rooms;
        } else {
            uniqueArray.push({ ...item });
        }
    });
    return uniqueArray;
}