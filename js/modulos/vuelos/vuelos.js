async function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('datos');
    if (date) {
        // const personasDecoded = decodeURIComponent(person);
        // const personasObj = JSON.parse(personasDecoded);
        // const arrayDePares = Object.entries(personasObj);
        // let personas = transformArrayToObject(arrayDePares)

        const datosDecoded = decodeURIComponent(date);
        const datosObj = JSON.parse(datosDecoded);
        const arrayDePares2 = Object.entries(datosObj);
        let datos = transformArrayToObject(arrayDePares2)
        
        setearBuscadoresVuelos(datos)
        consultarVuelos(datos)
    } else {
        // console.log ('Datos de vuelos no especificados, revisando cache...')
        // let datos = await recuperarDatosCache("cacheVuelos");
        // let vuelosCache = datos.datos
        // if(vuelosCache){
        //     buscadorGlobalVuelos = vuelosCache.datos
        //     personasGlobalVuelos = vuelosCache.personas
        //     plasmarVuelos(vuelosCache.vuelos)
        //     sacarFiltros(vuelosCache.vuelos)
        //     seterBuscador(vuelosCache.personas,vuelosCache.datos)
        // }
        // else{
        //     console.log("No hay datos en la cache")
        // }
        
    }
}



function setearBuscadoresVuelos(datos){
    let tipo = 0
    if( datos.vuelos.length == 1){
        tipo = 2
    }
    else if ( datos.vuelos.length == 2){
        tipo = 0
    }
    else[
        tipo = 1
    ]
    
    document.getElementById("numeroAdulto").value = datos.pax.adultos 
    document.getElementById("numeroNino").value = datos.pax.ninos
    document.getElementById("numeroBebe").value = datos.pax.infantes
    document.getElementById("terceraEdad").value = datos.pax.adultos_mayores
    document.getElementById("discapacitados").value = datos.pax.discapacitados

    vuelosFormulario = JSON.parse(JSON.stringify(datos.vuelos))
    plasmarTipoBuscadorVuelos(tipo)
    cargarPersonas()
}




// function seterBuscador(personas, datos){
//     document.getElementById("salida").value = datos.salida
//     document.getElementById("destino").value = datos.destino
//     document.getElementById("tipo").value = datos.tipo
//     document.getElementById("claseVuelo").value = datos.clase
//     document.getElementById("salida-datepicker").value = datos.fechaSalida
//     establecerRegreso()
//     document.getElementById("numeroAdulto").value = personas.adultos 
//     document.getElementById("numeroNino").value = personas.ninos
//     document.getElementById("numeroBebe").value = personas.bebes
//     document.getElementById("terceraEdad").value = personas.viejos
//     document.getElementById("discapacitados").value = personas.discapacitados
//     cargarPersonas()
//     document.getElementById("retorno-datepicker").value = datos.fechaRetorno
//     var datePicker = flatpickr("#retorno-datepicker", {});
//     datePicker.close();
// }



var buscadorGlobalVuelos = ""
var personasGlobalVuelos = ""
// function consultarVuelos(personas,data){
//     abrirSpinner("Cargando sus vuelos, por favor espere...")
//     Obtener_API_Vuelos(null, '/api/chequeando/busqueda?from='
//         +data.fechaSalida+'&to='+data.fechaRetorno+'&departure='+data.salida+'&arrival='
//         +data.destino+'&adults='+parseInt(personas.adultos)+'&children='+parseInt(personas.ninos)+'&infants='
//         +parseInt(personas.bebes)+'&seniors='+parseInt(personas.viejos)+'&handicapped='+parseInt(personas.discapacitados)+'&type='
//         +data.tipo, datos => {
//             if (datos.estado) {
//                 cerrarSpinner()
//                 buscadorGlobalVuelos = data
//                 personasGlobalVuelos = personas
//                 plasmarVuelos(datos.consulta.vuelos)
//                 sacarFiltros(datos.consulta.vuelos)
//                 guardarDatosCache(personas, data, datos.consulta.vuelos)
//             }
//             else{
//                 cerrarSpinner()
//                 mensajeUsuario("error","Ooops...","Los vuelos seleccionados no estan disponibles")
//             }
//         })

// }




function consultarVuelos(data){
    console.log("------------------------")
    console.log("Se consultara estos vuelos: ")
    console.log(data)
    console.log("------------------------")
    abrirSpinner("Cargando sus vuelos, por favor espere...")
    Enviar_API_Vuelos(JSON.stringify(data), '/api/chequeando/busqueda', datos => {
        if (datos.estado){
            cerrarSpinner()
                // guardarDatosCache_vuelos(personas, data, datos.consulta.vuelos, idTab)
                buscadorGlobalVuelos = JSON.parse(JSON.stringify(data.vuelos))
                personasGlobalVuelos = JSON.parse(JSON.stringify(data.pax))
                plasmarVuelos(datos.consulta.vuelos)
                sacarFiltros(datos.consulta.vuelos)
        }else{
            cerrarSpinner()
            mensajeUsuario('error','Oops...',datos.error)     
        }
    })
    
    
}





function guardarDatosCache(personas, datos, vuelos){
    const datosCahe = {personas: personas, datos: datos, vuelos: vuelos}
    guardarCache(datosCahe, "cacheVuelos")
}




var vuelosGlobalFiltrados = {};
// var preciosGlobal = {min:0, max:0}
var vuelosGlobal = "";	

function sacarFiltros(vuelos){
    vuelosGlobal = JSON.parse(JSON.stringify(vuelos))
    let vuelosFiltrados = {
        aereolinas: "",
        escalas : ""
    }
    // let precios = {min:1000000, max:0}
    let vuelosAgrupados = {};
    let escalasAgrupadas = {}
    vuelos.forEach((element, index) => {
        element.id = index
        // //filtro por precio
        // if(element.price.total < precios.min){
        //     precios.min = element.price.total
        // }
        // if(element.price.total > precios.max){
        //     precios.max = element.price.total
        // }


        //filtro por escala
        let codigoEscala = ""
        element.segments.forEach(segmentos => {
            segmentos.options.forEach(opciones => {
                codigoEscala = (opciones.legs.length - 1)+"_Escala"
                if(!escalasAgrupadas[codigoEscala]){
                    escalasAgrupadas[codigoEscala] = []
                }
                const existe = escalasAgrupadas[codigoEscala].some(aux => aux.id  === element.id);
                if(!existe){
                    escalasAgrupadas[codigoEscala].push(element)
                }
            });
        });
        


        //filtro por aereolina
        const codigoAerolinea = element.validating_carrier.code;
        if (!vuelosAgrupados[codigoAerolinea]) {
            vuelosAgrupados[codigoAerolinea] = [];
        }
        vuelosAgrupados[codigoAerolinea].push(element);
    });
    // preciosGlobal.min = precios.min.toFixed(2)
    // preciosGlobal.max = precios.max.toFixed(2)
    vuelosFiltrados.aereolinas = vuelosAgrupados
    // vuelosFiltrados.precios = precios
    vuelosFiltrados.escalas = escalasAgrupadas
    vuelosGlobalFiltrados = JSON.parse(JSON.stringify(vuelosFiltrados))
    armarFiltros(vuelosFiltrados)
}




function armarFiltros(vuelosFiltrados){
    // armarFiltroPrecios_vuelos(vuelosFiltrados.precios.min, vuelosFiltrados.precios.max, index)
    armarFiltroAeriolinas(Object.values(vuelosFiltrados.aereolinas))
    armarFiltroEscalas(vuelosFiltrados.escalas)
}



function armarFiltroEscalas(filtro){
    let lista = "" 
    Object.keys(filtro).forEach(element => {
        lista += `
            <li>
                <label class="container_radio">`
                    if(parseInt(element[0]) == 0){
                        lista += `Directo`
                    }
                    else{
                        lista += (element[0])+` Escala(s)`
                    }
                    lista +=
                    `
                    <input type="radio" value="`+element[0]+`_Escala" name="escala">
                    <span class="checkmark"></span>
                </label>
            </li>
        `
    });
    $("#listaEscalas").html(lista)
}



function armarFiltroAeriolinas(filtro){
    let lista = "" 
    filtro.forEach(element => {
        lista += `
            <li>
                <label class="container_check">
                    <img src="`+sacarLogoAereolina(element[0].validating_carrier.code)+`" style="height: 15px; width: 20px;" alt="latam">
                    `+resumenNombreAereolina(element[0].validating_carrier.name)+`
                    <input type="checkbox" value="`+resumenNombreAereolina(element[0].validating_carrier.code)+`" class="checkbox-item">
                    <span class="checkmark"></span>
                </label>
            </li>
        `
    });
    $("#listaAereolinas").html(lista)
}



function armarFiltroPrecios(newMin, newMax) {
    let pasos = parseInt((newMax-newMin)/100)
    if(pasos == 0){
        pasos = 1
    }
    $("#range").data("ionRangeSlider").update({
        min: newMin.toFixed(2),
		max: newMax.toFixed(2),
		from: newMin,
		to: newMax,
		type: 'double',
		step: pasos
    });
}



function filtrar(){
    var vuelosFiltrados = {}
    vuelosFiltrados = validarEscala()
    vuelosFiltrados = validarAereolina(vuelosFiltrados)
    // vuelosFiltrados = validarPrecios(vuelosFiltrados, index)
    plasmarVuelos(vuelosFiltrados)

}



function validarPrecios(vuelosFiltrados){
    var vuelosFiltradosPrecios = []
    var sliderData = $("#range").data("ionRangeSlider");
    var fromValue = sliderData.result.from; // Valor 'from'
    var toValue = sliderData.result.to;     // Valor 'to
    if(preciosGlobal.min != fromValue || preciosGlobal.max != toValue){
        vuelosFiltrados.forEach(element => {
            if(element.price.total>=fromValue && element.price.total<=toValue){
                vuelosFiltradosPrecios.push(element)
            }
        });
        return vuelosFiltradosPrecios
    }else{
        return vuelosFiltrados
    }
}




function validarEscala(){
    let vuelosFiltrados = {}
    const escalaSelec = document.querySelector('input[name="escala"]:checked');
    if(escalaSelec){
        Object.keys(vuelosGlobalFiltrados.escalas).forEach(keyEscalasFiltrados => {
            if(keyEscalasFiltrados == escalaSelec.value){
                vuelosFiltrados = (vuelosGlobalFiltrados.escalas[keyEscalasFiltrados])
            }
        });
        return vuelosFiltrados
    }
    else{
        return vuelosGlobal
    }
}


// function validarEscala(indice){
//     let vuelosFiltrados = {}
//     const escalaSelec = document.querySelector('input[name="escala"]:checked');
//     if(escalaSelec){
//         Object.keys(vuelosGlobalFiltrados[indice].escalas).forEach(keyEscalasFiltrados => {
//             if(keyEscalasFiltrados == escalaSelec.value){
//                 vuelosFiltrados = (vuelosGlobalFiltrados[indice].escalas[keyEscalasFiltrados])
//             }
//         });
//         return vuelosFiltrados
//     }
//     else{
//         return vuelosGlobal[indice]
//     }
// }





function validarAereolina(vuelosFiltrados){
    var vuelosAereolina = []
    var filtroAereolina = [];
    $(".checkbox-item:checked").each(function() {
        filtroAereolina.push($(this).val()); // Agrega el valor al array
    });
    if(filtroAereolina.length>0){
        if(vuelosFiltrados.length>0){
            vuelosFiltrados.forEach(aereolinas => {
                filtroAereolina.forEach(aereolina => {
                    if(aereolinas.validating_carrier.code == aereolina){
                        vuelosAereolina.push(aereolinas)
                    }
                });
                
            });
        }
        return vuelosAereolina
    }
    else{
        return vuelosFiltrados
    }
    
}



function reservar(id){
    const group0Radios = document.getElementsByName('customRadio'+id+'_0');
    const group1Radios = document.getElementsByName('customRadio'+id+'_1');
    let vueloIdaId = null;
    let vueloVueltaId = null;
    for (let radio of group0Radios) {
        if (radio.checked) {
            vueloIdaId = radio.value;
            break;
        }
    }
    for (let radio of group1Radios) {
        if (radio.checked) {
            vueloVueltaId = radio.value;
            break;
        }
    }
    if (vueloIdaId && vueloVueltaId) {
        console.log("Hols")
        var personasString = JSON.stringify(personasGlobalVuelos)
        var personasEncode = encodeURIComponent(personasString)
        var url = window.location.origin + "/formularioVuelos?idVueloIda=" + encodeURIComponent(vueloIdaId)+"&idVueloVuelta="+ encodeURIComponent(vueloVueltaId)+"&personas="+ personasEncode;
        window.location.href = url;
    }

}


function plasmarVuelos(vuelos){
    var datos = ""
    if(vuelos.length>0){
         datos = armarVuelos(vuelos, buscadorGlobalVuelos, personasGlobalVuelos,5)
    }else if(vuelos.length == 0){
        datos = '<h3 style="text-align: center; color: var(--color-primario);">No se ha encontrado vuelos</h3>'
    }
    $("#listaVuelos").html(datos)
}

function quitarFiltro(){
    plasmarVuelos(vuelosGlobal)
    sacarFiltros(vuelosGlobal)
}


function goBack() {
    var url = window.location.origin + "/home"
    window.location.href = url;
}

