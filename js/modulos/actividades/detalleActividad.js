var idActividadGlobal = ""
function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const idActividad = urlParams.get('idActividad');
    if (idActividad) {
        const actividadDecoded = decodeURIComponent(idActividad);
        const actividadObj = JSON.parse(actividadDecoded);
        idActividadGlobal = actividadObj
        console.log(actividadObj)
        verActividad(actividadObj)
        mostrarCalendario(actividadObj)
        // setTimeout(function() {
        //     mostrarCalendario()
        //     }, 1000);
    } else {
        console.log('ID del Vuelo no especificado');
    }
}



function hacerReservaActividad(){
    // let url = window.location.origin + "/carrito"
    // const date = verificarDatos()
    // if(date){
    //     abrirSpinner("Añadiendo a su carrito, por favor espere...")
    //     let carritoCivitatis = localStorage.getItem('carritoCivitatis');
    //     let numeroItemsCivitatis = verificarNumeroItems()
    //     if(carritoCivitatis){
    //         Enviar_API_Vuelos(JSON.stringify(date), '/api/civitatis/actividad/'+carritoCivitatis, datos => {
    //             if (datos.estado){
    //                 cerrarSpinner()
    //                 localStorage.setItem("numCivitatis",numeroItemsCivitatis+1)
    //                 window.location.href = url;
    //             }else{
    //                 cerrarSpinner()
    //                 mensajeUsuario('info','Oops...','Los horarios seleccionados no estan disponibles, eliga otros')
    //             }
    //         })
    //     }else{
    //         Enviar_API_Vuelos(JSON.stringify(date), '/api/civitatis/actividad', datos => {
    //             if (datos.estado){
    //                 cerrarSpinner()
    //                 localStorage.setItem("numCivitatis",numeroItemsCivitatis+1)
    //                 carritoCivitatis = datos.consulta.cartId
    //                 localStorage.setItem('carritoCivitatis', carritoCivitatis);
    //                 window.location.href = url;
    //             }else{
    //                 cerrarSpinner()
    //                 mensajeUsuario('info','Oops...','Los horarios seleccionados no estan disponibles, eliga otros')
    //             }
    //         })
    //     }
    // }
    // else{
    //     mensajeUsuario('info','Oops...','Error en la lectura de datos, intentelo nuevamente')
    // }
    
}


function verificarNumeroItems(){
    let numCivitatis = localStorage.getItem("numCivitatis")
    if(!numCivitatis){
        numCivitatis = 0
    }
    return numCivitatis
}




function verificarDatos(){
    let fecha = document.getElementById("calendario").value
    let selectElement = document.getElementById("tiempos")
    let hora = selectElement.options[selectElement.selectedIndex].text;
    if(hora == "Eliga una fecha"){
        hora = ""
    }
    let idTarifa = document.getElementById("listaTarifas").value
    let cat = []
    if(auxGlobal){
        let nuevaCategoria = {
            id: (document.getElementById("selectCosto").value).toString(),
            quantity: ""
        }
        cat.push(nuevaCategoria)
    }else{
        categoriasGlobal.forEach((element, index) => {
            if(!element.quantity == 0){
                cat.push(element)
            }
        });
    }       
    let date = {
        activityId: parseInt(idActividadGlobal),
        date: fecha,
        rate: {
            id: idTarifa.toString(),
            categories: cat
        },
        time: hora
    }
    return date
}




function verActividad(idActividad){
    abrirSpinner("Cargando actividad...")
    Obtener_API_Vuelos(null, '/api/civitatis/actividad-info/'+idActividad, datos => {
        if (datos.estado) {
            construirHeader(datos.consulta)
            contruirEmojis(datos.consulta)
            construirImagenes(datos.consulta.photos)
            construirDescripcion(datos.consulta.longDescription)
            construirDetalles(datos.consulta)
            cerrarSpinner()
        }
        else{
            cerrarSpinner()
        }
    })
}


function construirImagenes(fotos){
    let lista = ""
    if((fotos.gallery).length > 1){
        aux= true
        lista +=`
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
            <ol class="carousel-indicators">`
                fotos.gallery.forEach((element,index) => {
                    if(index == 0){
                        lista += `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+index+`" class="active"></li>`
                    }
                    else{
                        lista += `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+index+`"></li>`
                    }
                });
                lista += 
                `
            </ol>
            <div class="carousel-inner"  role="listbox">`
                fotos.gallery.forEach((element,index) => {
                    if(index == 0){
                        lista += `
                        <div class="carousel-item active">
                            <img class="d-block img-fluid" src="`+element.paths.original+`" alt="Cargando foto..." style="width: 100%; height: 400px; object-fit: cover;">
                        </div>
                        `
                    }
                    else{
                        lista += `
                        <div class="carousel-item">
                            <img class="d-block img-fluid" src="`+element.paths.original+`" alt="Cargando foto..." style="width: 100%; height: 400px; object-fit: cover;">
                        </div>
                        `
                    }
                });
                lista += 
                `
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </a>
        </div>
            `
    }
    else{
        lista+=`
        <div style="background-image: url('`+fotos.header[0].paths.original+`'); background-color: rgba(255, 255, 255, 0); background-blend-mode: overlay; background-position: center center; background-size: cover; height: 500px;">
        </div>
        `
    }
    $("#imagenes").html(lista)
}



function construirHeader(datos){
    let lista = ""
    lista += `
            <section class="parallax-window" data-parallax="scroll" data-image-src="img/single_tour_bg_1.jpg" data-natural-width="1400" data-natural-height="470" style="background-image: url('`+datos.photos.header[0].paths.original+`'); background-position: center;">
                <div class="parallax-content-2">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8">
                                <button class="btn_1 green" style="background-color: #838881; display: flex; align-items: center; justify-content: center;" onclick="goBack()">
                                    <i class="icon-right" style="font-size: 20px;"></i>
                                    Regresar
                                </button>
                                <br>
                                <h1>`+datos.title+`</h1>
                                <span>`+datos.address.shortAddress+`</span>
                                <span class="rating">`+obtenerPuntacion(datos.score).icono+`<small>(`+datos.reviews+`)</small></span>
                            </div>
                            <div class="col-md-4">
                                <div id="price_single_main">
                                    Desde/por persona <span><sup>$</sup>`+datos.minimumPrice.toFixed(2)+`</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    `
    $("#heaederActividad").html(lista)
}




function construirDescripcion(descripcion){
    let lista =""
    lista += `<p>`+descripcion+`</p> `
    $("#descripcion").html(lista)
}



function construirDetalles(datos){
    let lista = ""
    lista += `
        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="clock" class="icon-lg"></i>  Duración:</span></strong></p>
            </div>
            <div class="col-lg-9 col-sm-12">
                <p class="mb-2 font-16">`+formatoEnteros((datos.duration.duration)/60)+` hora(s) </p>
            </div>
        </div>
        
        
        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="message-circle" class="icon-lg"></i>  Idioma:</span></strong></p>
            </div>
            <div class="col-lg-9 col-sm-12">
                <p class="mb-2 font-16"> `
                    if(datos.lang == "es"){
                        lista += "Español"
                    }
                    else if (datos.lang == "en"){
                        lista += "Ingles"
                    }
                    else if (datos.lang == "it"){
                        lista += "Italiano" 
                    }
                    else if (datos.lang == "fr"){
                        lista += "Frances"
                    }
                    else if (datos.lang == "pt"){
                        lista += "Portugues"
                    }
                    else{
                        lista += datos.lang
                    }

                lista += `</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="check" class="icon-lg"></i>  Incluido:</span></strong></p>
            </div>
            <div class="col-lg-9 col-sm-12">
                <p class="mb-2 font-16"> 
                    <ul class="list_ok">`
                    datos.included.forEach(element => {
                        lista += `<li>`+element+`</li>`
                    });

        lista +=`   </ul>
                </p>
            </div>
        </div>`
        if(datos.notIncluded.length>0){
            lista += `
                <div class="row" style="display:flex; align-items:center;">
                    <div class="col-lg-3 col-sm-12">
                        <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="plus" class="icon-lg" style="transform: rotate(45deg); display: inline-block;"></i>  No incluido:</span></strong></p>
                    </div>
                    <div class="col-lg-9 col-sm-12">
                        <p class="mb-2 font-16">
                            <ul style="list-style: none; padding: 0; display: flex;">`
                            datos.notIncluded.forEach(element => {
                                lista += `<li style="margin-right: 20px;"><i class="mdi mdi-close" style="font-size: 18px; color: red; margin-right: 7px;"></i>`+element+`</li>`
                            });

                lista +=`   </ul>
                        </p>
                    </div>
                </div>
            ` 
        }
        lista += `
        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="calendar"></i>  ¿Cuándo Reservar?:</span></strong></p>
            </div>
            <div class="col-lg-9 col-sm-12">
                <p class="mb-2 font-16"> Puedes reservar hasta `+(datos.advance.minutes_before)/60+` horas antes de la actividad siempre que queden plazas. Reserva ya para asegurar tu plaza.</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="file"></i>  Tipo de voucher:</span></strong></p>
            </div>
            <div class="col-lg-9 col-sm-12">
                <p class="mb-2 font-16"> `
                    if(datos.voucherType == 0){
                        lista += "Electrónica. Muestra el voucher en tu celular."
                    }
                    else{
                        lista += datos.voucherType
                    }
                    lista += `
                </p>
            </div>
        </div>`
        if(datos.accessibility.code != 0){
            lista += `
            <div class="row">
                <div class="col-lg-3 col-sm-12">
                    <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="x-circle"></i>  Accesibilidad:</span></strong></p>
                </div>
                <div class="col-lg-9 col-sm-12">
                    <p class="mb-2 font-16"> `+datos.accessibility.description+`</p>
                </div>
            </div>
            `
        }
        lista+=
        `
        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <p class="mb-2 font-16"><span class="fw-semibold me-2"><strong><i data-feather="x-circle"></i>  Cancelación:</span></strong></p>
            </div>
            <div class="col-lg-9 col-sm-12">`
                datos.cancelPolicies.forEach(element => {
                    lista += `Hasta `+element.hours+` horas antes de la actividad, tendrá penalidad del `+element.penalty+`%`
                });
                lista +=
                `
            </div>
        </div>
        `
    $("#detalles").html(lista)
    
}


function contruirEmojis(datos){
    let lista = ""
    lista += `
        <div id="single_tour_feat">
			<ul>
                <li>`+tipoActividad(datos.subcategory)+`</li>
                <li><i class="icon_set_1_icon-83"></i>`+formatoEnteros(datos.duration.duration/60)+` hora(s)</li>
                <li><i class="icon_set_1_icon-13"></i>`
                if(datos.accessibility.code != 0){lista+=`Si`}
                else{lista+= `No`}
                lista+=`</li>
                <li><i class="icon_set_1_icon-82"></i>`+datos.reviews+` Visitas</li>
                <li><i class="icon_set_1_icon-41"></i><a href="https://www.google.com/maps?q=`+datos.address.latitude+`,`+datos.address.longitude+`" target="_blank" style="writing-mode: horizontal-tb; display: inline; line-height: normal; color: inherit; ">Ver mapa</a></li>
                <li><i class="icon_set_1_icon-97"></i>`+obtenerLenguaje(datos.guideLanguages)+`</li>
                <li><i class="icon_set_1_icon-81"></i>`+datos.score+` puntos</li>
    
            </ul>		
		</div>
        
    `
    $("#emojis").html(lista)
}


function obtenerLenguaje(lenguaje){
    let lista =""
    lenguaje.forEach(element => {
        lista += " "
        lista += (element.charAt(0).toUpperCase() + element.slice(1))
    });
    return lista
}




var fechaActual = ""
var fechaInicio = ""
var fechaFin = ""
var idActividadGlobal = ""

function obtenerFechas(){
    fechaActual = obtenerFechaActual()
    const fecha = new Date(fechaActual);
    const ano = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    fechaInicio = obtenerPrimerDiaDelMes(mes,ano)
    fechaFin = obtenerUltimoDiaDelMes(mes,ano)
}


function obtenerFechaActual() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const día = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${día}`;
}


function obtenerPrimerDiaDelMes(mes, ano) {
    // Crear una fecha con el primer día del mes
    let primerDia = new Date(ano, mes - 1, 1);
    // Formatear la fecha al formato YYYY-MM-DD
    let dia = primerDia.getDate();
    let mesFormateado = (primerDia.getMonth() + 1).toString().padStart(2, '0');
    let anoFormateado = primerDia.getFullYear();
    return `${anoFormateado}-${mesFormateado}-${dia}`;
}

function obtenerUltimoDiaDelMes(mes, ano) {
    // Crear una fecha con el primer día del mes siguiente y luego restar un día
    let ultimoDia = new Date(ano, mes, 0);
    let dia = ultimoDia.getDate();
    let mesFormateado = (ultimoDia.getMonth() + 1).toString().padStart(2, '0');
    let anoFormateado = ultimoDia.getFullYear();
    return `${anoFormateado}-${mesFormateado}-${dia}`;
}




var datosConsulta = []
function mostrarCalendario(){
    var fechasCiviTatis = []
    Obtener_API_Vuelos(null, '/api/civitatis/calendario-actividad/'+idActividadGlobal+'?from='+fechaInicio+'&to='+fechaFin, datos => {
        if (datos.estado) {
            datos.consulta.schedule.forEach(element => {
                for (const disponible of element.times) {
                    if (!disponible.quotaAvailable) {
                        fechasCiviTatis.push(element.date);
                        break; // Sale del bucle cuando se cumple la condición
                    }
                    else{
                        if(element.availability > 0){
                            fechasCiviTatis.push(element.date);
                            break; // Sale del bucle cuando se cumple la condición
                        }
                    }
                }
            });
            datosConsulta = datos.consulta.schedule
            armarCalendario(fechasCiviTatis)
            cerrarSpinner()
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: datos.error
            })
            // goBack()
        }

    })
}


function sumarMes(){   
    let fechaObj = new Date(fechaInicio);
    fechaObj.setMonth(fechaObj.getMonth() + 1);
    let dia = fechaObj.getDate().toString().padStart(2, '0');
    let mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Meses en JavaScript son indexados desde 0
    let ano = fechaObj.getFullYear();
    return `${ano}-${mes}-${dia}`;
}


function restarMes() {    
    let fechaObj = new Date(fechaInicio);
    fechaObj.setMonth(fechaObj.getMonth() - 1);
    let dia = fechaObj.getDate().toString().padStart(2, '0');
    let mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Meses en JavaScript son indexados desde 0
    let ano = fechaObj.getFullYear();
    return `${ano}-${mes}-${dia}`;
}


function borrarHorarioCostos(){
    var lista = ""
    lista = `<option value="">Eliga una fecha</option>`
    $("#tiempos").html(lista)
    $("#tiempos").prop("disabled", true); 
    $("#horarios").css("display", "none");


    lista = `<option value="">Eliga una tarifa</option>`
    $("#tarifas").css("display", "none");
    $("#listaTarifas").html(lista)
    $("#listaTarifas").prop("disabled", true);
    

    lista = `<span> Eliga una fecha </span>`
    $("#costos").css("display", "none");
    $("#datosCostos").html(lista)
    $("#botonReservar").hide();

}




function armarCalendario(fechasCiviTatis){
    const fecha = new Date(fechaInicio);
    const ano = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; 
    var desabilitados = getDisabledDates(mes,ano,fechasCiviTatis)
    var fechaDefault = fechasCiviTatis[0]
    iniciarCalendario(ano,mes, desabilitados, fechaDefault)
    armarHorarioCosto()
}

function getDisabledDates(mes, ano, civitatis) {
    var fechasMesAnterior = obtenerMesAnterior(mes, ano)
    var fechasMesDespues = obtenerMesDespues(mes, ano)
    var fechasCiviTatis = obtenerCivitatis(mes, ano, civitatis)
    var fechasDesabilitadas = fechasMesAnterior.concat(fechasMesDespues, fechasCiviTatis)
    return fechasDesabilitadas
}


function obtenerMesAnterior(mes, ano){
    const mesAnterior = mes - 1;
        const anoAnterior = mes === 1 ? ano - 1 : ano
        const primerDiaDelMesActual = new Date(ano, mes - 1, 1);
        const ultimoDiaDelMesAnterior = new Date(ano, mes - 1, 0);
        const fechaInicioAqui = new Date(ultimoDiaDelMesAnterior);
        fechaInicioAqui.setDate(fechaInicioAqui.getDate() - 14);
        const fechas = [];
        for (let fecha = fechaInicioAqui; fecha <= ultimoDiaDelMesAnterior; fecha.setDate(fecha.getDate() + 1)) {
            const ano = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const dia = String(fecha.getDate()).padStart(2, '0');
            fechas.push(`${ano}-${mes}-${dia}`);
        }
        return fechas;
}


function obtenerMesDespues(mes,ano){
    const primerDiaDelMesSiguiente = new Date(ano, mes, 1);
        const ultimoDiaDelMesSiguiente = new Date(primerDiaDelMesSiguiente);
        ultimoDiaDelMesSiguiente.setDate(primerDiaDelMesSiguiente.getDate() + 14);
        const fechas = [];
        for (let fecha = primerDiaDelMesSiguiente; fecha <= ultimoDiaDelMesSiguiente; fecha.setDate(fecha.getDate() + 1)) {
            const ano = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const dia = String(fecha.getDate()).padStart(2, '0');
            fechas.push(`${ano}-${mes}-${dia}`);
        }
        return fechas;
}

function obtenerCivitatis(mes, año, civitatis) {
    const primerDiaDelMes = new Date(año, mes - 1, 1); // mes - 1 porque los meses en JavaScript son base 0
    const ultimoDiaDelMes = new Date(año, mes, 0); // El último día del mes es el día 0 del siguiente mes
    const todasLasFechasDelMes = [];
    for (let fecha = new Date(primerDiaDelMes); fecha <= ultimoDiaDelMes; fecha.setDate(fecha.getDate() + 1)) {
        const añoFecha = fecha.getFullYear();
        const mesFecha = String(fecha.getMonth() + 1).padStart(2, '0');
        const diaFecha = String(fecha.getDate()).padStart(2, '0');
        todasLasFechasDelMes.push(`${añoFecha}-${mesFecha}-${diaFecha}`);
    }
    const civitatisFechas = new Set(civitatis); // Usar un Set para búsquedas rápidas
    const fechasNoEnCivitatis = todasLasFechasDelMes.filter(fecha => !civitatisFechas.has(fecha));
    return fechasNoEnCivitatis;
}


function iniciarCalendario(year, month, desabilitados, fechaDefault) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    flatpickr("#calendario", {
        inline: true, // Mantiene el calendario siempre abierto
        dateFormat: "Y-m-d", // Formato de fecha
        minDate: startDate, // Establece la fecha mínima al primer día del mes
        maxDate: endDate, // Establece la fecha máxima al último día del mes
        defaultDate: fechaDefault,
        onMonthChange: function(selectedDates, dateStr, instance) {
            instance.changeMonth(startDate.getMonth());
        },
        onYearChange: function(selectedDates, dateStr, instance) {
            instance.changeYear(startDate.getFullYear());
        },
        disable: desabilitados,
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            const disabledDates = desabilitados;
            const dateStr = dayElem.dateObj.toISOString().split('T')[0];
            if (disabledDates.includes(dateStr)) {
                dayElem.classList.add('disabled-date'); // Añade clase a fechas bloqueadas
            } else {
                dayElem.classList.add('available-date'); // Añade clase a fechas disponibles

            }
        }
    });
}

var idDateReserva = ""
function armarHorarioCosto(){
    var fecha = document.getElementById("calendario").value 
    datosConsulta.forEach((element, index) => {
        if(element.date == fecha){
            idDateReserva = index
            $("#botonReservar").show();
            capturarTiempos(element.times)
            armarTarifas(element.rates)
            return
        }
    });  
}

function capturarTiempos(element){
    var aux = false
    var lista = ""
    element.forEach((horas,index) => {
        if(horas.time || horas.time != ""){
            aux = true
            if(!horas.quotaAvailable){
                lista += `<option value="`+index+`">`+horas.time+`</option>`
            }else{
                if(horas.availability>0 || horas.quota>0){
                    lista += `<option value="`+index+`">`+horas.time+`</option>`
                }
                else{
                    lista += `<option value="">No hay horario disponible</option>`
                }
            }
        }
    });
    if(aux){
        
        $("#horarios").css("display", "block");
        $("#tiempos").html(lista)
        $("#tiempos").prop("disabled", false);
    }
}


function armarTarifas(element){
    var aux = false
    var lista = ""
    element.forEach((tarifas,index) => {
        if(tarifas.text){
            aux = true
            lista += `<option value=`+tarifas.id+`>`+tarifas.text+`</option>`
        }
    });
    if(aux){
        $("#tarifas").css("display", "block");
        $("#listaTarifas").html(lista)
        $("#listaTarifas").prop("disabled", false);
        armarCostos()
    }
}


var auxGlobal = false
function armarCostos() {
    auxGlobal = false
    var tarifa = document.getElementById("listaTarifas").value;
    datosConsulta[idDateReserva].rates.forEach(element => {
        if(tarifa == element.id){
            let palabra = element.categories[0].text.trim().split(' ');
            if(palabra[0] == "Hasta" || !isNaN(palabra[0])){
                armarSelect(element.categories)
                auxGlobal = true
            }else{
                armarTabla(element.categories)
            }
            return
        }
    });
}


function armarSelect(categorias){
    var lista = ""
    lista += `<select class="form-select" id="selectCosto">`
    categorias.forEach(element => {
        lista += ` <option value="`+element.id+`">`+element.text+` - $`+element.price+`</option>`         
    });
    lista += `</select>`
    $("#datosCostos").html(lista)
    $("#costos").css("display", "block");
}


var categoriasGlobal = []
    function armarTabla(categorias){
        categoriasGlobal = []
        lista = `
            <div class="table-responsive">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <td>
                                <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                                    Categoria
                                </div>
                            </td>
                            <td>
                                <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                                    Cantidad
                                </div>
                            </td>
                            <td>
                                <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                                    Total
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody id="listaCostos">
                        
                    </tbody>
                </table>
            </div>
        `
        $("#datosCostos").html(lista)
        lista = ""
        categorias.forEach((data, index) => {
            lista += `
                <tr>
                    <td>
                        <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                            <span><strong>`+data.text+`</strong></span>
                            <span>$`+(data.price).toFixed(2)+`</span>
                        </div>
                    </td>
                    <td>
                        <div class="col-12">`
                            let nuevaCategoria = {}
                            if(index == 0){
                                lista += `<input id="persona`+data.id+`" type="number" class="form-control" placeholder="#Adultos" aria-label="Last name" min="1" step="1" value="1" style="min-width:70px; max-width:100px; text-align:center;" onchange="actualizarCosto(`+data.id+`,`+data.price+`)">`
                                nuevaCategoria = {
                                    id: (data.id).toString(),
                                    quantity: 1
                                }
                            }
                            else{
                                lista += `<input id="persona`+data.id+`" type="number" class="form-control" placeholder="#Adultos" aria-label="Last name" min="0" step="1" value="0" style="min-width:70px; max-width:100px; text-align:center;" onchange="actualizarCosto(`+data.id+`,`+data.price+`)">`
                                nuevaCategoria = {
                                    id: (data.id).toString(),
                                    quantity: 0
                                }
                            }
                            categoriasGlobal.push(nuevaCategoria)
                            lista += `
                        </div>
                    </td>
                    <td>
                        <div class="col-12" id="costoSumarCategoria`+data.id+`">
                            `
                            if(index == 0){
                                lista += `<span>$`+(data.price).toFixed(2)+`</span>`
                                costosTotales[index] = data.price
                            }
                            else{
                                lista += `<span>$0.00</span>`
                                costosTotales[index] = 0
                            }
                            lista += `
                        </div>
                    </td>
                </tr>
                `
        });
        lista += `
                <tr>
                    <th></th>
                    <td style="color: var(--color-primario);"><strong>TOTAL</strong></td>
                    <td id="costoTotal" class="col-12 d-flex flex-column align-items-center justify-content-center" style:"color: var(--color-primario);"> 
                        
                    </td>
                </tr>
                `
        
        $("#listaCostos").html(lista)
        $("#costos").css("display", "block");
        calcularCostoTotal()
    }


    var costosTotales = []
    function calcularCostoTotal(){
        let suma = costosTotales.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        var lista = `<strong>$`+suma.toFixed(2)+`</strong>`
        $("#costoTotal").html(lista)
    }


    function actualizarCosto(idAux, precio){
        var id = idAux.toString()
        var cantidad = document.getElementById("persona"+id).value;
        var total = parseInt(cantidad)*parseInt(precio)
        costosTotales[id] = total
        categoriasGlobal.forEach(element => {
            if(element.id == id){
                element.quantity = parseInt(cantidad)
            }
        });
        calcularCostoTotal()
        var lista = `<span>$`+total.toFixed(2)+`</span>`
        $("#costoSumarCategoria"+id).html(lista)
    }



    function actualizarFechas(id){
        abrirSpinner("Cargando disponibilidad...")
        borrarHorarioCostos()
        flatpickr("#calendario", {
            inline: false
        });
        var nuevaFecha = ""
        if(id == 0){
            nuevaFecha = sumarMes()
        }else if(id == 1){
            nuevaFecha = restarMes()
        }
        const fecha = new Date(nuevaFecha);
        const ano = fecha.getFullYear();
        const mes = fecha.getMonth()+2;
        fechaInicio = obtenerPrimerDiaDelMes(mes, ano)
        fechaFin = obtenerUltimoDiaDelMes(mes, ano)
        mostrarCalendario()
    }


    function goBack() {
        var url = window.location.origin + "/listaActividades"
        window.location.href = url;
    }