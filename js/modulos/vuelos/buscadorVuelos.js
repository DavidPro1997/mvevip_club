var vuelosFormulario = [ 
    {desde:"", hasta:"", fecha:""},
    {desde:"", hasta:"", fecha:""}
] 

function validarDatosVuelos(){
    const datos = armarArray()
    if(datos){
        buscarVuelos(datos)
    }
    else{
        mensajeUsuario("info","Campos incorrectos","Hay algunos campos incorrectos, por favor revise la información")
    }    
}




function armarArray() {
    let tipo = document.getElementById("tipoVuelo").value
    tipo = parseInt(tipo)
    let datos = [];
    let aux = true;
    for (let indice = 0; indice < vuelosFormulario.length; indice++) {
        // let element = itemsCotizaciones[index].formularioVuelo.vuelos[indice];
        let salida = document.getElementById("salida_" + indice).value.substring(0, 3);
        let destino = document.getElementById("destino_" + indice).value.substring(0, 3);
        let fechaSalida = document.getElementById("salida-datepicker_" + indice).value;

        if (!salida || !destino || !fechaSalida) {
            aux = false;
            return false;
        }

        let infoAux = {
            desde: salida,
            hasta: destino,
            fecha: fechaSalida,
        };
        datos.push(infoAux);
        if(tipo == 0){
            
            let fechaRetorno = document.getElementById("retorno-datepicker_" + indice).value;
            if (!fechaRetorno) {
                aux = false;
                return false;
            }
            let infoAux = {
                desde: destino,
                hasta: salida,
                fecha: fechaRetorno,
                
            };
            datos.push(infoAux);
            break;
        }
    };

    return aux ? datos : false;
}



// function buscarVuelos(datos){
//     var personasString = JSON.stringify(personas)
//     var datosString = JSON.stringify(datos)
//     var personasEncode = encodeURIComponent(personasString)
//     var datosEncode = encodeURIComponent(datosString)
//     var url = window.location.origin + "/listaVuelos?datos=" + datosEncode+"&personas="+ personasEncode;
//     window.location.href = url;
// }




function buscarVuelos(vuelos){
    let datos = {
        vuelos: JSON.parse(JSON.stringify(vuelos)),
        pax: JSON.parse(JSON.stringify(personas))
    }
    // // vuelosFormulario = JSON.parse(JSON.stringify(datos.vuelos))
    // consultarVuelos(datos,index)


    // var personasString = JSON.stringify(personas)
    var datosString = JSON.stringify(datos)
    // var personasEncode = encodeURIComponent(personasString)
    var datosEncode = encodeURIComponent(datosString)
    var url = window.location.origin + "/listaVuelos?datos=" + datosEncode;
    window.location.href = url;


}





// document.getElementById("salida-datepicker").addEventListener("input", function() {
//     // Cambia el color y tamaño del texto dentro del input
//     this.style.fontSize = "18px"; // Cambia el tamaño del texto
//     this.style.textAlign = "center"
// });

// document.getElementById("retorno-datepicker").addEventListener("input", function() {
//     // Cambia el color y tamaño del texto dentro del input
//     this.style.fontSize = "18px"; // Cambia el tamaño del texto
//     this.style.textAlign = "center"

// });



var personas = {
    adultos: 2,
    ninos: 0,
    infantes: 0,
    adultos_mayores: 0,
    discapacitados: 0
};
// function cargarPersonas() {
//     let adultos = document.getElementById("numeroAdulto").value
//     let ninos = document.getElementById("numeroNino").value
//     let bebes = document.getElementById("numeroBebe").value
//     let viejos = document.getElementById("terceraEdad").value
//     let discapacitados = document.getElementById("discapacitados").value

//     if(parseInt(adultos,0) <= 0 || !adultos){
//         adultos = 1
//         document.getElementById("numeroAdulto").value = 1
//     }
//     if(!ninos){
//         ninos=0
//         document.getElementById("numeroNino").value = 0
//     }
//     if(!bebes){
//         bebes=0
//         document.getElementById("numeroBebe").value = 0
//     }
//     if(!viejos){
//         viejos=0
//         document.getElementById("terceraEdad").value = 0
//     }
//     if(!discapacitados){
//         discapacitados=0
//         document.getElementById("discapacitados").value = 0
//     }
//     personas.adultos = adultos
//     personas.ninos = ninos
//     personas.bebes = bebes
//     personas.viejos = viejos
//     personas.discapacitados = discapacitados
//     var total = parseInt(adultos,10) + parseInt(ninos) + parseInt(bebes) + parseInt(viejos) + parseInt(discapacitados)
//     document.getElementById("personas").value = total+" PERSONA(S)"
//     cerrarDropdown("dropdownPersonasContent")
// }



function cargarPersonas() {
    let adultos = document.getElementById("numeroAdulto").value
    let ninos = document.getElementById("numeroNino").value
    let infantes = document.getElementById("numeroBebe").value
    let adultos_mayores = document.getElementById("terceraEdad").value
    let discapacitados = document.getElementById("discapacitados").value

    
    if(!adultos){
        adultos = 0
        document.getElementById("numeroAdulto").value = 0
    }
    if(!ninos){
        ninos=0
        document.getElementById("numeroNino").value = 0
    }
    if(!infantes){
        infantes=0
        document.getElementById("numeroBebe").value = 0
    }
    if(!adultos_mayores){
        adultos_mayores=0
        document.getElementById("terceraEdad").value = 0
    }
    if(!discapacitados){
        discapacitados=0
        document.getElementById("discapacitados").value = 0
    }
    personas.adultos = adultos
    personas.ninos = ninos
    personas.infantes = infantes
    personas.adultos_mayores = adultos_mayores
    personas.discapacitados = discapacitados
    var total = parseInt(adultos,10) + parseInt(ninos) + parseInt(infantes) + parseInt(adultos_mayores) + parseInt(discapacitados)
    document.getElementById("personas").value = total+" PERSONA(S)"
    cerrarDropdown("dropdownPersonasContent")
}






function cerrarDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}






function mostrarValoresDefaultVuelos(id, index){
    var lista = `
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('UIO - Quito - Mariscal Sucre - Ecuador',`+id+`,'`+index+`');return false;" style="white-space: normal;">
                <strong style="font-size: 14px">UIO - Quito - Mariscal Sucre</strong> 
                <span class="text-muted" style="font-size: 12px;">Ecuador</span>
            </a>
        </div>
         <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('GYE - Guayaquil - Ecuador',`+id+`,'`+index+`');return false;" style="white-space: normal;">
                <strong style="font-size: 14px">GYE - Guayaquil</strong> 
                <span class="text-muted" style="font-size: 12px;">Ecuador</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('CTG - Cartagena - Colombia',`+id+`,'`+index+`');return false;" style="white-space: normal;">
                <strong style="font-size: 14px">CTG - Cartagena</strong> 
                <span class="text-muted" style="font-size: 12px;">Colombia</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('ADZ - San Andres - Colombia',`+id+`,'`+index+`');return false;" style="white-space: normal;">
                <strong style="font-size: 14px">ADZ - San Andres</strong> 
                <span class="text-muted" style="font-size: 12px;">Colombia</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('MDE - Medellin - Colombia',`+id+`,'`+index+`');return false;" style="white-space: normal;">
                <strong style="font-size: 14px">MDE - Medellin</strong> 
                <span class="text-muted" style="font-size: 12px;">Colombia</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('PTY - Ciudad de Panamá - Tocumen Internacional - Panama',`+id+`,'`+index+`');return false;" style="white-space: normal;">
                <strong style="font-size: 14px">PTY - Ciudad de Panamá - Tocumen Internacional</strong> 
                <span class="text-muted" style="font-size: 12px;">Panama</span>
            </a>
        </div>
    `
    if(id == 0){
        $("#listaDestinos_"+index).html(lista)

    }else if(id == 1){
        $("#listaDestinos_d_"+index).html(lista)

    }
}






var proteccion = true
function buscadorDestinosVuelos(event, id, indice){
    if(id == 0){
        $("#spinnerContenidoVuelos_"+indice).show()
        $("#buscadorContenidoVuelos_"+indice).hide()
        
        setTimeout(function() {
            let textoIngresado = document.getElementById("salida_"+indice).value;
            // textoIngresado = textoIngresado.replace(/"/g, '\\"');
            let numero = parseInt(textoIngresado.length)
            if(numero >= 1 && proteccion){
                proteccion = false
                mostrarDestinosVuelos(textoIngresado, id, indice)
            }else if(numero<3){
                mostrarValoresDefaultVuelos(id, indice)
                $("#spinnerContenidoVuelos_"+indice).hide()
                $("#buscadorContenidoVuelos_"+indice).show() 
            }       
        }, 1000);
    }
    
    else if(id == 1){
        $("#spinnerContenidoVuelos_d_"+indice).show()
        $("#buscadorContenidoVuelos_d_"+indice).hide()
        
        setTimeout(function() {
            let textoIngresado = document.getElementById("destino_"+indice).value;
            textoIngresado = textoIngresado.replace(/"/g, '\\"');
            let numero = parseInt(textoIngresado.length)
            if(numero >= 1 && proteccion){
                proteccion = false
                mostrarDestinosVuelos(textoIngresado, id, indice)
            }else if(numero<3){
                mostrarValoresDefaultVuelos(id, indice)
                $("#spinnerContenidoVuelos_d_"+indice).hide()
                $("#buscadorContenidoVuelos_d_"+indice).show() 
            }       
        }, 1000);
    }
    
}




function mostrarDestinosVuelos(buscador, id, indice){
    proteccion = false
    Obtener_API_Vuelos(null, '/api/chequeando/prebusqueda?buscador='+buscador, datos => {
        if (datos.estado) {
            let lista =""
            proteccion = true
            datos.consulta.forEach((element) => {
                lista += `
                <div class="col-12">
                    <a 
                        class="dropdown-item" 
                        href="#" 
                        onclick="escogerSalidaVuelos('`+element.code.replace(/'/g, "\\'")+ `-` 
                        +element.city.replace(/'/g, "\\'")+ `-` 
                        +element.country.replace(/'/g, "\\'")+`',  '`+id+`'  ,  '`+indice+`' );return false;">
                        <strong>`+element.code+`-`+element.city+`</strong> 
                        <span class="text-muted" style="font-size: small;">`+element.country+`</span>
                    </a>                
                </div> `
            });
            let titulo = `<i class="fas fa-building"></i> Se ha encontrado:`
            if(id == 0){
                $("#tituloSalida_"+indice).html(titulo)
                $("#listaDestinos_"+indice).html(lista)
                $("#buscadorContenidoVuelos_"+indice).show()  
                $("#spinnerContenidoVuelos_"+indice).hide()
            }
            else if(id == 1){
                $("#tituloDestino_"+indice).html(titulo)
                $("#listaDestinos_d_"+indice).html(lista)
                $("#buscadorContenidoVuelos_d_"+indice).show()  
                $("#spinnerContenidoVuelos_d_"+indice).hide()
            }
            
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



function escogerSalidaVuelos(ciudadEscogida, id, indice){
    if(id == 0){
        document.getElementById("salida_"+indice).value = ciudadEscogida.toUpperCase()
        // document.getElementById("salida_"+index).style.fontSize = "15px"        
        // document.getElementById("salida_"+index).style.textAlign = "center"        
        document.getElementById("dropdownSalida_"+indice).classList.remove("show");
    }
    else if (id == 1){
        document.getElementById("destino_"+indice).value = ciudadEscogida.toUpperCase()
        // document.getElementById("destino_"+indice).style.fontSize = "15px"        
        document.getElementById("dropdownDestino_"+indice).classList.remove("show");
        // document.getElementById("destino_"+indice).style.textAlign = "center"        
    }
}



// document.addEventListener('click', function (event) {
//     const dropdownMenu = document.querySelector('.dropdown-menu');
//     const inputSalida = document.getElementById('salida');
//     const inputDestino = document.getElementById('destino');
//     const inputPersonas = document.getElementById('personas');
//     if(inputSalida){
//         if (inputSalida.contains(event.target)) {
//             const dropdown = bootstrap.Dropdown.getInstance(inputSalida);
//             if (dropdown) {
//                 dropdown.show();
//             }
//         } else if (!dropdownMenu.contains(event.target)) {
//             // Ocultar el dropdown si el clic está fuera del dropdown
//             const dropdown = bootstrap.Dropdown.getInstance(inputSalida);
//             if (dropdown) {
//                 dropdown.hide();
//             }
//         }
//     }
//     if(inputDestino){
//         if (inputDestino.contains(event.target)) {
//             const dropdown_d = bootstrap.Dropdown.getInstance(inputDestino);
//             if (dropdown_d) {
//                 dropdown_d.show();
//             }
//         } else if (!dropdownMenu.contains(event.target)) {
//             // Ocultar el dropdown si el clic está fuera del dropdown
//             const dropdown_d = bootstrap.Dropdown.getInstance(inputDestino);
//             if (dropdown_d) {
//                 dropdown_d.hide();
//             }
//         }
//     }

//     if(inputPersonas){
//         if (inputPersonas.contains(event.target)) {
//             const dropdown_p = bootstrap.Dropdown.getInstance(inputPersonas);
//             if (dropdown_p) {
//                 dropdown_p.show();
//             }
//         } else if (!dropdownMenu.contains(event.target)) {
//             // Ocultar el dropdown si el clic está fuera del dropdown
//             const dropdown_p = bootstrap.Dropdown.getInstance(inputPersonas);
//             if (dropdown_p) {
//                 dropdown_p.hide();
//             }
//         }
//     }
// });


// function establecerSalida(){
//     flatpickr("#salida-datepicker", {
//         minDate: "today", // Bloquear fechas anteriores a hoy
//         dateFormat: "Y-m-d",
//         disableMobile: true, // Opcional: evita que el selector se convierta en un selector móvil
//         locale: "es"
//     }) 
// }



function establecerSalida(indice,fechaInicio, fechaDefault){
    
    flatpickr("#salida-datepicker_"+indice, {
        minDate:fechaInicio, // Bloquear fechas anteriores a hoy
        dateFormat: "Y-m-d",
        disableMobile: true, // Opcional: evita que el selector se convierta en un selector móvil
        locale: "es",
        default: fechaDefault
    }) 
}




function establecerRegreso(indice, fechaInicio, fechaSalida, abrir){
    flatpickr("#retorno-datepicker_"+indice, {
        minDate: fechaInicio, 
        dateFormat: "Y-m-d",
        disableMobile: true,
        locale: "es",
        defaultDate: fechaSalida,
        onReady: function(selectedDates, dateStr, instance) {
            if(abrir){
                instance.open(); 
            }
    }
    });
}




function actualizarBuscador(from, to){
    var busqueda = JSON.parse(localStorage.getItem("busqueda"))
    busqueda.fecha_inicio = from
    busqueda.fecha_final = to 
    localStorage.setItem("busqueda", JSON.stringify(busqueda))  
}







function onDropdownClose() {
    cargarPersonas()
}

var dropdown = document.getElementById('dropdownPersonas');
var isDropdownOpen = false;

// Maneja el foco cuando el dropdown gana el foco
if (dropdown) {
    dropdown.addEventListener('focusin', () => {
        isDropdownOpen = true;
    });

    // Maneja el foco cuando el dropdown pierde el foco
    dropdown.addEventListener('focusout', () => {
        // Retrasar la ejecución para asegurar que el dropdown se haya cerrado
        setTimeout(() => {
            if (!isDropdownOpen) {
                onDropdownClose();
            }
        }, 100);
    });

    // Detectar clics fuera del dropdown
    document.addEventListener('mousedown', (event) => {
        if (!dropdown.contains(event.target)) {
            if (isDropdownOpen) {
                isDropdownOpen = false;
                onDropdownClose();
            }
        }
    });

    // Reestablece el estado de apertura cuando se hace clic dentro del dropdown
    dropdown.addEventListener('mousedown', () => {
        isDropdownOpen = true;
    });
}



function plasmarTipoBuscadorVuelos(tipo){
    // 0 = ida y vuelta 
    // 1 = multidestinos
    // 2 = solo ida
    let lista = ""
    for (let indice = 0; indice < vuelosFormulario.length; indice++) {
        let element = vuelosFormulario[indice];
        lista += `
        <div class="col-md-3">
            <div class="form-group">
                <label><i class="icon-airport" style="transform: rotate(45deg); display: inline-block; font-size: 22px;"></i>Salida</label>
                <div class="dropdown" style="width: 100%;">
                    <input type="text" value="`
                    if(tipo == 1 && vuelosFormulario[indice-1]){
                        lista += vuelosFormulario[indice-1].hasta
                    }
                    else{
                        lista += element.desde
                    }
                    lista += 
                    `" id="salida_${indice}" placeholder="Escriba una ciudad de su preferencia..." class="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" autocomplete="new-destination" data-bs-display="static" oninput="buscadorDestinosVuelos(event,0,'${indice}')"  onfocus="this.nextElementSibling.classList.add('show')">
                    <div class="dropdown-menu" style="width: 100%; max-height: 45vh; overflow-y: auto;" id="dropdownSalida_${indice}">
                        <div id="spinnerContenidoVuelos_${indice}" style="text-align: center; display: none;">                
                            <div class="spinner-border avatar-lg m-2" role="status" style="color: var(--color-primario);"></div>
                        </div>
                        <div id="buscadorContenidoVuelos_${indice}" style="display: block;">
                            <div>
                                <h6 class="dropdown-header" style="font-size: 16px; color: var(--color-primario);" id="tituloSalida_${indice}">
                                    <i class="fas fa-building"></i>
                                    Principales Ciudades</h6>
                                <div class="row" id="listaDestinos_${indice}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label><i class="icon-airport" style="transform: rotate(135deg); display: inline-block; font-size: 22px;"></i>Destino</label>
                <input type="text" value="${element.hasta}" id="destino_${indice}" placeholder="Escriba una ciudad de su preferencia..." class="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" autocomplete="new-destination" data-bs-display="static" oninput="buscadorDestinosVuelos(event,1,'${indice}')"  onfocus="this.nextElementSibling.classList.add('show')">
                <div class="dropdown-menu" style="width: 100%; max-height: 45vh; overflow-y: auto;" id="dropdownDestino_${indice}">
                    <div id="spinnerContenidoVuelos_d_${indice}" style="text-align: center; display: none;">                
                        <div class="spinner-border avatar-lg m-2" role="status" style="color: var(--color-primario);"></div>
                    </div>
                    <div id="buscadorContenidoVuelos_d_${indice}" style="display: block;">
                        <div>
                            <h6 class="dropdown-header" style="font-size: 16px; color: var(--color-primario);" id="tituloDestino_${indice}">
                                <i class="fas fa-building"></i>
                                Principales Ciudades</h6>
                            <div class="row" id="listaDestinos_d_${indice}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                
        <div class="col-md-3">
            <div class="form-group">
                <label><i class="icon-calendar-7" style="font-size: 22px;"></i> Fecha Salida</label>
                <input type="text" value="${element.fecha}" id="salida-datepicker_${indice}" class="form-control" placeholder="Fecha de salida" autocomplete="off" onchange="abrirRetorno('${indice}')" style="background-color: white;">
            </div>
        </div>`;
        if (tipo == 0) {
            lista += `
                <div class="col-md-3">
                    <div class="form-group">
                        <label><i class="icon-calendar-7" style="font-size: 22px;"></i> Fecha retorno</label>
                        <input type="text" id="retorno-datepicker_${indice}" value="${vuelosFormulario[indice + 1].fecha}" class="form-control" placeholder="Fecha de regreso" autocomplete="off" readonly style="background-color: white;">
                    </div>
                </div>`;
                break
        } else if (tipo == 1 && indice == 0) {
            lista += `
                <div class="col-md-3" style="display:flex; align-items: center; justify-content: center;">
                    <button class="btn btn-primary" onclick="agregarVuelo_buscador()">Agregar otro vuelo</button>
                </div>`;
        } else if (tipo == 1 && indice > 0) {
            lista += `
                <div class="col-md-3" style="display:flex; align-items: center; justify-content: center;">
                    <button class="btn btn-danger" onclick="eliminarVuelo_buscador('${indice}')">Eliminar vuelo</button>
                </div>`;
        } else if (tipo == 2){
            lista += `
                <div class="col-md-3" style="display: flex; align-items: center; justify-content: center;">
                    <div style="visibility: hidden; width: 100%; height: 100%;">Contenido invisible</div>
                    <button class="btn btn-primary" style="visibility: hidden;" onclick="agregarVuelo_buscador()">Agregar otro vuelo</button>
                </div>`;
        }
    }
    lista += `
        <div class="col-md-12 mt-3" style="text-align: center;">
            <button class="btn_1 green" style="background-color: var(--color-primario);" onclick="validarDatosVuelos()"><i class="icon-search"></i>Buscar ahora</button>
        </div>
    `
    $("#buscadorVuelosDOM").html(lista)
    setearValores()
}




function agregarVuelo_buscador(){
    const tipo = document.getElementById("tipoVuelo").value

    if(vuelosFormulario.length<4){
        vuelosFormulario.forEach((element,indice) => {
            let datos = {
                desde: document.getElementById("salida_"+indice).value,
                hasta: document.getElementById("destino_"+indice).value,
                fecha: document.getElementById("salida-datepicker_"+ indice).value
            }
            vuelosFormulario[indice] = datos
        });

        setTimeout(() => {
            const data = {desde:"", hasta:"", fecha:""}
            vuelosFormulario.push(data)
            plasmarTipoBuscadorVuelos(tipo)
        }, 100);
    }
}




function eliminarVuelo_buscador(indice){
    vuelosFormulario.splice(indice, 1);
    plasmarTipoBuscadorVuelos(1);
}





function setearValores(){
    vuelosFormulario.forEach((element,indice) => {
        mostrarValoresDefaultVuelos(0,indice)
        mostrarValoresDefaultVuelos(1,indice)
        if(vuelosFormulario[indice-1]){
            establecerSalida(indice,vuelosFormulario[indice-1].fecha,vuelosFormulario[indice-1].fecha);
        }
        else{
            establecerSalida(indice,"today","today");
        }
    });
}



function abrirRetorno(indice){
    let tipo = document.getElementById("tipoVuelo").value
    tipo = parseInt(tipo)
    if(tipo == 0){
        var fechaSalida = document.getElementById("salida-datepicker_"+indice).value
        establecerRegreso(indice, fechaSalida, fechaSalida, true)
    }
}





function revisarTipoVuelo(){
    let tipo = document.getElementById("tipoVuelo").value
    tipo = parseInt(tipo)
    if(tipo == 0){
        vuelosFormulario = [{desde:"", hasta:"", fecha:""},{desde:"", hasta:"", fecha:""}]
    }
    else if(tipo == 1){
        vuelosFormulario = [{desde:"", hasta:"", fecha:""}]
    }
    else if(tipo == 2){
        vuelosFormulario = [{desde:"", hasta:"", fecha:""}]
    }
    plasmarTipoBuscadorVuelos(tipo)
}



function verificarPasajerosVuelos(){
    let adultos = document.getElementById("numeroAdulto").value
    let ninos = document.getElementById("numeroNino").value
    let infantes = document.getElementById("numeroBebe").value
    let adultos_mayores = document.getElementById("terceraEdad").value
    let discapacitados = document.getElementById("discapacitados").value
    let total = parseInt(adultos) + parseInt(ninos) + parseInt(infantes) + parseInt(adultos_mayores) + parseInt(discapacitados)
    return total
}