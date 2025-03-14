function regresarPrecios(){
    const url = window.location.origin + "/carritoPrecios"
    window.location.href = url; 
}

function avanzarPagar(){
    // const url = window.location.origin + "/carritoFormulario"
    // window.location.href = url; 
}


function armarFormulario(){
    console.log(jsonCarritoFormularioEjemplo)
    console.log(jsonCarritoPrecioEjemplo)
    llenarPreciosFormulario(jsonCarritoPrecioEjemplo)
    if(jsonCarritoFormularioEjemplo.vuelos.length>0){
        $("#nav_vuelos").show()
        jsonCarritoFormularioEjemplo.vuelos.forEach((element, index) => {
            let listaVuelos = `
                    <h6>VUELO `+(index+1)+` <p>`+element.identificador+`</p></h6>
                    <div id="vuelo_`+index+`"></div>
                    <hr><br><br>
            `
            $('#informacionClientesVuelos').append(listaVuelos)
            construirCardsVuelos(element, index)            
        });
    }
    if(jsonCarritoFormularioEjemplo.hoteles.length>0){
        $("#nav_hoteles").show()
        jsonCarritoFormularioEjemplo.hoteles.forEach((element, index) => {
            let listaHoteles = `
                    <h6>HOTEL `+(index+1)+` <p>`+element.identificador+`</p></h6>
                    <div id="hotel_`+index+`"></div>
                    <hr><br><br>
            `
            $('#informacionClientesHoteles').append(listaHoteles)
            construirCardsHoteles(element.ocupantes, index)
        });
    }
    if(jsonCarritoFormularioEjemplo.actividades.length>0){
        $("#nav_actividades").show()
        let listaActividades = ""
        jsonCarritoFormularioEjemplo.actividades.forEach((element, index) => {
            listaActividades +=`
                <div>
                    <h6>ACTIVIDAD `+(index+1)+` <p>`+element.identificador+`</p></h6>
                    <div class="row" id="booking`+removerPuntos(element.id)+`">
                    </div>
                    <div class="row" id="pasajeros`+removerPuntos(element.id)+`">
                    </div>
                    <hr><br><br>
                </div>
            `
        });
        $('#informacionClientesActividades').html(listaActividades)
        construirCardsActividades(jsonCarritoFormularioEjemplo.actividades)
    }
    if(jsonCarritoFormularioEjemplo.tranfer.length>0){
        $("#nav_tranfers").show()
        let listaTranfers = ""
        jsonCarritoFormularioEjemplo.tranfer.forEach((element, index) => {
            listaTranfers +=`
                <div>
                    <h6>TRANSFER `+(index+1)+` <p>`+element.identificador+`</p></h6>
                    <div class="row" id="booking`+removerPuntos(element.id)+`">
                    </div>
                    <div class="row" id="pasajeros`+removerPuntos(element.id)+`">
                    </div>
                    <hr><br><br>
                </div>
            `
        });
        $('#informacionClientestraslados').html(listaTranfers)
        construirCardsActividades(jsonCarritoFormularioEjemplo.tranfer)
    }
}


function llenarPreciosFormulario(precios){
    let lista = `
        <li class="table-header clearfix">
            <div class="col">
                <strong>Descripción</strong>
            </div>
            <div class="col">
                <strong>Total</strong>
            </div>
        </li>
    `
    if(precios.vuelos.length>0){
        lista += armarPrecioVuelos(precios.vuelos)
    }
    if(precios.hoteles.length>0){
        lista += armarPrecioHoteles(precios.hoteles)
    }
    if(precios.actividades.length>0){
        lista += armarPrecioActividades(precios.actividades)
    }
    if(precios.transfer.length>0){
        lista += armarPrecioTranfer(precios.transfer)
    }
    lista += armarPreciosTotales(precios.preciosTotal)
    $("#preciosFormulario").html(lista)
}



function armarPreciosTotales(precios){
    let lista = ""
    lista += `

        <li class="clearfix">
            <div class="col" style="text-transform:none;">
                SubTotal
            </div>
            <div class="col second">
                $`+(precios.subtotal).toFixed(2)+`
            </div>
        </li>
        <li class="clearfix total">
            <div class="col">
                <strong>Total a pagar</strong>
            </div>
            <div class="col second">
                <strong>$`+(precios.total).toFixed(2)+`</strong>
            </div>
        </li>
    `
    return lista;
}

function armarPrecioVuelos(vuelos){
    let lista = ""
    vuelos.forEach(element => {
        lista += `
            <li class="clearfix">
                <div class="col" style="text-transform:none;">
                    <img src="img/carrito/vuelo.jpg" width="50" height="50" alt=""> `+element.description+`
                </div>
                <div class="col second">
                    $`+(element.precio).toFixed(2)+`
                </div>
            </li>

        `
    });
    return lista;
}

function armarPrecioHoteles(hoteles){
    let lista = ""
    hoteles.forEach(element => {
        lista += `
            <li class="clearfix">
                <div class="col" style="text-transform:none;">
                    <img src="img/carrito/hotel.jpg" width="50" height="50" alt=""> `+element.description+`
                </div>
                <div class="col second">
                    $`+(element.precio).toFixed(2)+`
                </div>
            </li>
        `
    });
    return lista;
}

function armarPrecioActividades(actividades){
    let lista = ""
    actividades.forEach(element => {
        lista += `
            <li class="clearfix">
                <div class="col" style="text-transform:none;">
                    <img src="img/carrito/actividades.jpg" width="50" height="50" alt=""> `+element.description+`
                </div>
                <div class="col second">
                    $`+(element.precio).toFixed(2)+`
                </div>
            </li>

        `
    });
    return lista;
}

function armarPrecioTranfer(tranfer){
    let lista = ""
    tranfer.forEach(element => {
        lista += `

            <li class="clearfix">
                <div class="col" style="text-transform:none;">
                    <img src="img/carrito/transfers.jpg" width="50" height="50" alt=""> `+element.description+`
                </div>
                <div class="col second">
                    $`+(element.precio).toFixed(2)+`
                </div>
            </li>

        `
    });
    return lista;
}



function construirCardsActividades(items){
    let aux ={book: false, pasajeros: false}
    items.forEach((element, index) => {
        
        if(element.details.booking){
            aux.book = true
            armarbooking(element.details.booking, element.id, index)
        }
        if(element.details.passengers){
            aux.pasajeros = true
            armarPasajeros(element.details.passengers, element.id, index)
        }
        if(!aux.book && !aux.pasajeros){
            const lista = `<p>No debe llenar ningun formulario</p>`
            $("#booking"+removerPuntos(element.id)).html(lista)
            aux.book = false
            aux.pasajeros = false
        }
    });
}



function armarbooking(booking, id, index){
    let aux = removerPuntos(id)
    var lista = `
        <p>
            <u>Detalles de reserva</u>
        </p>
                `
    booking.forEach(element => {
        let idLabel = removerPuntos(element.id)
        lista += `
        <div class="col-6 mb-3">
            <label for="simpleinput" class="form-label">`+traducirPalabra(element.labelTranslated)+`</label>
            <input type="`+element.type+`" class="form-control" id="`+idLabel+`" placeholder="`+traducirPalabra(element.labelTranslated)+`"`
            if(element.required){
                lista += ` required />` 
            }
            else{
                lista += ` />`
            }
           lista += `
        </div>
        `
    });
    $("#booking"+aux).html(lista)

}




function armarPasajeros(pasajeros, id){
    let fechas = []
    let aux = removerPuntos(id)
    let contador = 0
    var lista = '<p>Detalles Pasajeros</p>'
    pasajeros.forEach((element, index) => {
        let idLabel = removerPuntos(element.id)
        if(obtenerTerceraPosicion(idLabel) == contador){
            contador = contador +1 
            lista += `<p><u>Pasajero `+contador+`</u></p>`
        }
        lista += `
        <div class="col-6 mb-3">
            <label for="simpleinput" class="form-label">`+element.label+`</label>
            <input type="`+element.type+`" class="form-control" style="background-color: white;" id="`+idLabel+`" placeholder="`+element.label+`"`
            if(element.required){
                lista += ` required />` 
            }
            else{
                lista += ` />`
            }
           lista += `
        </div>
        `
        if(element.type == "date"){
            fechas.push(idLabel)
        }
    });
    $("#pasajeros"+aux).html(lista)
    establecerDatePicker(fechas)

}




function obtenerTerceraPosicion(cadena) {
    const partes = cadena.split('-');
    if (partes.length >= 3) {
        return partes[2];
    } else {
        return null; 
    }
}



function establecerDatePicker(fechas){
    fechas.forEach(element => {
            flatpickr("#"+element, {
            dateFormat: "Y-m-d",
            disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
        }) 
    });
    
}







function construirCardsHoteles(ocupantes, numero){
    let lista = ""
    ocupantes.forEach((aux,auxIndex) => {
        lista += `
            <p><u>`+aux.rooms+` habitación(es) por `+aux.adults+` adulto(s)`
                if(aux.children){
                    lista += ` + `+aux.children+` niño(s) de `
                    aux.paxes.forEach(ninos => {
                        if(ninos.type == "CH"){
                            lista += ` `+ninos.age+` años `
                        }

                    });
                }
                lista += `
            </u>
                </p>                       
            
            <div class="row" id="id_`+auxIndex+`">`
                let id = armarId(0,aux.rooms,aux.adults, aux.children, aux.paxes)
                for(let j=0; j<aux.rooms; j++){
                    if(aux.rooms>1){
                        lista += `<span style="font-size: 12px;"><strong>HABITACIÓN `+(j+1)+`</strong></span><br><br>`
                    }
                    
                    for(let i=0; i<aux.adults; i++){
                        lista += `
                        <p><u>Adulto `+(i+1)+`</u></p>
                        <div class="col-lg-6 mb-3">
                            <label for="simpleinput" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombreAdulto`+(j+1)+(i+1)+`_`+id+`" placeholder="Escriba el nombre del adulto"/>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="simpleinput" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellidoAdulto`+(j+1)+(i+1)+`_`+id+`" placeholder="Escriba el apellido del adulto"/>
                        </div>
                        `
                    }
                    if(aux.children && aux.paxes){
                        aux.paxes.forEach((ninos, k) => {
                            lista += `
                            <p><u>Niño `+(k+1)+`</u></p>
                            <div class="col-lg-5 mb-3">
                                <label for="simpleinput" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombreNino`+(j+1)+(k+1)+`_`+id+`" placeholder="Escriba el nombre del niño"/>
                            </div>
                            <div class="col-lg-5 mb-3">
                                <label for="simpleinput" class="form-label">Apellido</label>
                                <input type="text" class="form-control" id="apellidoNino`+(j+1)+(k+1)+`_`+id+`" placeholder="Escriba el apellido del niño"/>
                            </div>
                            <div class="col-lg-2 col-sm-6 mb-3">
                                <label for="simpleinput" class="form-label">Edad</label>
                                <input type="text" class="form-control" id="edadNino`+(j+1)+(k+1)+`_`+id+`" value="`+ninos.age+` años" readonly/>
                            </div>
                            `
                        });
                    }
                }  
                lista +=`
            </div>`
    });
    $("#hotel_"+numero).html(lista)
}




function construirCardsVuelos(personasJson, indice){
    personas = Object.entries(personasJson)
    const descripciones = {
        adultos: 'Adulto',
        ninos: 'Niño',
        infantes: 'Infantes',
        adultos_mayores: 'Tercera Edad',
        discapacitados: 'Discapacitado'
    };
    
    personas.forEach(([clave, valor],index) => {
        const numero = parseInt(valor, 10); 
        if (numero > 0) { // Solo imprimir si el valor es mayor a 0
            const descripcion = descripciones[clave] || clave; // Obtener la descripción o usar la clave como fallback
            for (let i = 1; i <= numero; i++) {
                var lista = `
                    <div class="row">
                        <div class="col-12">
                            <p><u>${descripcion} ${i}</u></p>
                        </div>
                
                        <div class="col-lg-6 mb-3">
                            <label for="simpleinput" class="form-label" id="nombres${index}${i}_${indice}_">Nombres</label>
                            <input type="text" id="nombres${index}${i}_${indice}" class="form-control" placeholder="Ingrese los nombres">
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="simpleinput" class="form-label" id="apellidos${index}${i}_${indice}_">Apellidos</label>
                            <input type="text" id="apellidos${index}${i}_${indice}" class="form-control" placeholder="Ingrese los apellidos">
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="example-select" class="form-label">Género</label>
                            <select class="form-select" id="genero${index}${i}_${indice}">
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="example-select" class="form-label">Tipo de Doc. de ID</label>
                            <select class="form-select" id="tipoDocumento${index}${i}_${indice}">
                                <option value="CI">Cédula de Identidad</option>
                                <option value="TP">Pasaporte</option>
                            </select>
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="simpleinput" class="form-label" id="numDocumento${index}${i}_${indice}_">Número de Doc. de ID</label>
                            <input type="text" id="numDocumento${index}${i}_${indice}" class="form-control" placeholder="Ingrese el número de documento">
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="example-date" class="form-label" id="fechaNacimiento${index}${i}_${indice}_">Fecha de Nacimiento</label>
                            <input class="form-control" id="fechaNacimiento${index}${i}_${indice}" type="text" autocomplete="off" placeholder="Fecha de nacimiento" style=" background-color: white;">
                        </div>

                    
                        <div class="col-lg-6 mb-3">
                            <label for="example-date" class="form-label" id="fechaCaducidad${index}${i}_${indice}_">Fecha de caducidad</label>
                            <input class="form-control" id="fechaCaducidad${index}${i}_${indice}" type="text" placeholder="Fecha de caducidad del documento de identidad" autocomplete="off" style=" background-color: white;">
                        </div>
                    </div>
                    `
                $('#vuelo_'+indice).append(lista)
                iniciarDatePickers(index, i, clave)
            }
        }
    });
    $("#cardVuelos").show()
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
