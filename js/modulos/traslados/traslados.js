var datosGlobal = {}
async function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('datos');
    if (data) {
        const datosDecoded = decodeURIComponent(data);
        const datosObj = JSON.parse(datosDecoded);
        const arrayDePares2 = Object.entries(datosObj);
        let datos = transformArrayToObject(arrayDePares2)
        abrirSpinner("Consultando traslados...")
        consultarTraslados(datos)
        armarDestinos(datos.ciudad)
        datosGlobal = datos
    } else {
        console.log ('Datos de traslados no especificados, revisando cache...')
        let datos = await recuperarDatosCache("cacheTraslados");
        let trasladosCache = datos.datos
        if(trasladosCache){
            armarDestinos(trasladosCache.datos.ciudad)
            datosGlobal = trasladosCache.datos
            trasladosGlobal = trasladosCache.actividades
            armarPrecios(trasladosCache.actividades)
            armarResumen(trasladosCache.datos)
            armarfiltrosTraslados()
        }
        else{
            console.log("No hay datos en la cache")
        }
    }
}

var trasladosGlobal = []
var cerrarGlobal = {traslados: false, destino: false}
function consultarTraslados(data){
    Obtener_API_Vuelos(null, '/api/civitatis/vehiculos/'+data.ciudad+'/'+parseInt(data.origen)+'/'+parseInt(data.destino), datos => {
        if (datos.estado) {
            guardarDatosCache(datos.consulta, data)
            trasladosGlobal = datos.consulta
            armarPrecios(datos.consulta)
            armarResumen(data)
            armarfiltrosTraslados()
            cerrarGlobal.traslados = true
            if(cerrarGlobal.traslados && cerrarGlobal.destino){
                cerrarSpinner()
            }
        }
        else{
            cerrarSpinner()
            mensajeUsuario("error","Oops...","Ha ocurrido un error al cargar el destino, intentelo denuevo")
        }
    })
}


function guardarDatosCache(traslados, datos){
    const datosCahe = {traslados: traslados, datos: datos}
    guardarCache(datosCahe, "cacheTraslados")
}




function filtrarNombreActividad(input) {
    const valorInput = input.value.toLowerCase();
    if(valorInput.length > 3){
        const actividadesFiltradas = actividadesGlobal.filter(actividad =>
            actividad.title.toLowerCase().includes(valorInput)
        );
        setTimeout(function() {
            armarActividades(actividadesFiltradas);    
        }, 500);
    }
    else if(valorInput.length == 0){
        armarActividades(actividadesGlobal)
    }
}




var preciosGlobalTraslados = {min:0, max:0}
function armarfiltrosTraslados(){
    let trasladosPrecios = {min:10000000, max:0}
    trasladosGlobal.forEach(element => {
        //Precios
        if(parseFloat(element.prices.USD)<trasladosPrecios.min){
            trasladosPrecios.min = element.prices.USD
        }
        if(parseFloat(element.prices.USD)>trasladosPrecios.max){
            trasladosPrecios.max = element.prices.USD
        }

    });
    preciosGlobalTraslados.min = trasladosPrecios.min
    preciosGlobalTraslados.max = trasladosPrecios.max
    armarFiltroPreciosDest(parseFloat(trasladosPrecios.min),parseFloat(trasladosPrecios.max))
}




function armarFiltroPreciosDest(newMin, newMax) {
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



function filtrarTraslados(){
    abrirSpinner("Filtrando...")
    setTimeout(function() {
        let trasladosFiltrados = {}
        trasladosFiltrados = validarPreciosAct()
        trasladosFiltrados = validarOrdenPrecioTrasl(trasladosFiltrados)
        armarPrecios(trasladosFiltrados)
        cerrarSpinner()
    }, 500);
}



function validarOrdenPrecioTrasl(traslados){
    const ordenSelec = document.querySelector('input[name="ordenarPrecioTrans"]:checked');
    if(ordenSelec){
        if(ordenSelec.value == 0){
            traslados.sort((a, b) => parseFloat(a.prices.USD) - parseFloat(b.prices.USD));
        }
        else if(ordenSelec.value == 1){
            traslados.sort((a, b) => parseFloat(b.prices.USD) - parseFloat(a.prices.USD));
        }
        
    }
    return traslados
    
}



function validarPreciosAct(){
    var trasladosFiltradosPrecios = []
    var sliderData = $("#range").data("ionRangeSlider");
    var fromValue = sliderData.result.from; // Valor 'from'
    var toValue = sliderData.result.to;     // Valor 'to
    if(preciosGlobalTraslados.min != fromValue || preciosGlobalTraslados.max != toValue){
        trasladosGlobal.forEach(element => {
            if(parseFloat(element.prices.USD)>=fromValue && parseFloat(element.prices.USD)<=toValue){
                trasladosFiltradosPrecios.push(element)
            }
        });
        return trasladosFiltradosPrecios
    }else{
        return trasladosGlobal
    }
}







function armarDestinos(idDestino){
    Obtener_API_Vuelos(null, '/api/civitatis/actividades/'+idDestino, datos => {
        if (datos.estado) {
            cerrarGlobal.destino = true
            armarTitulo(datos.infoDestino)
            if(cerrarGlobal.traslados && cerrarGlobal.destino){
                cerrarSpinner()
            } 
            document.getElementById("ciudadTraslados").value = datos.infoDestino.name.toUpperCase() +" - "+ datos.infoDestino.country.toUpperCase()
            cargarInformacion(idDestino)
            setTimeout(function(){
                cargarFAQs(idDestino,datos.infoDestino.name,datos.infoDestino.country)

            },300)
        }
        else{
            cerrarSpinner()
            mensajeUsuario("error","Oops...","Ha ocurrido un error al cargar el destino, intentelo denuevo")
            goBack()
        }
 
    })
}


function armarTitulo(datos){
    var lista = ""
    lista = `
        <div id="search_container_2" style="background-image: url('`+datos.photos.header[0].paths.original+`'); background-position: center;">
            <div class="parallax-content-1 opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
                <div class="animated fadeInDown">
                    <div id="search_2" style="background-color: transparent; background: none; display: flex; align-items: center; justify-content: center;">
                        <div class="tab-content" >
                            <div class="tab-pane fade active show" id="tours">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label><i class="fas fa-building" style="font-size: 22px;"></i> Ciudad</label>
                                            <input type="text" id="ciudadTraslados" placeholder="Escriba una ciudad de su preferencia..." class="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" autocomplete="off" data-bs-display="static" oninput="buscadorDestinosTraslados(event,1)"  onfocus="this.nextElementSibling.classList.add('show')" style="font-size: 16px; text-align: center;">
                                            <div class="dropdown-menu" style="width: 100%; max-height: 50vh; overflow-y: auto;" id="dropdownTraslados">
                                                <div id="spinnerContenidoTraslados" style="text-align: center; display: none;">                
                                                    <div class="spinner-border avatar-lg m-2" role="status" style="color: var(--color-primario);"></div>
                                                </div>
                                                <div id="buscadorContenidoTraslados" style="display: block;">
                                                    <div>
                                                        <h6 class="dropdown-header" style="font-size: 16px; color: var(--color-primario);" id="tituloDestinoTraslados">
                                                            <i class="fas fa-building"></i>
                                                            Principales Ciudades</h6>
                                                        <div class="row" id="listaDestinosTralados">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3" id="faqTraslados" style="display: none;">
                                        <div class="spinner-border avatar-sm m-2 spinner-cargando" role="status" style="color: var(--color-primario);" id="spinnerTraslado"></div>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#full-width-modal" id="linkContenido" style="color: red;"></a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label><i class="icon_set_1_icon-27" style="font-size: 22px;"></i>Desde</label>
                                            <select class="form-select" id="desdeTraslados" style="font-size: 16px; align-items: center;" onchange="actualizarDestino()" disabled>
                                                <option value="" selected style="font-size: 16px;">Seleccione una ciudad</option>
                                            </select>                                        
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label><i class="icon_set_1_icon-27" style="font-size: 22px;"></i>Hasta</label>
                                            <select class="form-select" id="hastaTraslados" style="font-size: 16px; align-items: center;" disabled>
                                                <option value="" selected style="font-size: 16px;">Seleccione un lugar de recogida</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label><i class="icon-calendar-7"></i> Fecha</label>
                                            <input class="form-control" placeholder="Seleccione la fecha de su tralado" type="text" id="fechaTraslado" readonly style="background-color: white; font-size: 16px; text-align: center;" onchange="iniciarHoraTraslados()">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label><i class=" icon-clock"></i> Hora</label>
                                            <input class="form-control" placeholder="Seleccione la hora de su traslado" type="text" id="horaTraslado" readonly style="background-color: white; font-size: 16px; text-align: center;">
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-sm-3">
                                        <div class="form-group">
                                            <label>Personas</label>
                                            <input type="number" value="2" min="1" max="15" id="personasTraslados" class="form-control" style="font-size: 16px; text-align: center;" oninput="validarRango(this)">
                                        </div>
                                    </div>
                                </div>
                                <!-- End row -->
                                <hr>
                                <button class="btn_1 green" style="background-color: var(--color-primario);" onclick="verTraslados()"><i class="icon-search"></i>Buscar ahora</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="animated fadeInDown" style="position: absolute; bottom: 0; left: 20px; padding: 20px; color: white;">
                    <button class="btn_1 green" style="background-color: #838881; display: flex; align-items: center; justify-content: center;" onclick="goBack()">
                        <i class="icon-right" style="font-size: 20px;"></i>
                        Regresar
                    </button>	
                </div>
                <div class="animated fadeInDown" style="position: absolute; bottom: 0; right: 20px; padding: 20px; color: white; z-index: -1;">
                    <h3 style="font-size: 30px; z-index: 1;">`+datos.name+` - `+datos.country+`</h3>	
                </div>
            </div>
        </div>
        `
        $("#cabecera").html(lista)
        mostrarValoresDefaultTraslados()
        iniciarDatesTraslados()
}


function armarResumen(data){
    var lista = ""
    lista = `

        <div class="border p-3 mt-4 mt-lg-0 rounded mb-3">
            <h4>Resumen <span><i class="icon-pin pull-right"></i></span></h4>
            <div class="table-responsive" style="overflow-x:hidden;">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><h5 style="font-size: 16px"><span><i class="icon-location pull-right"></i></span> Desde</h5></td>
                            <td><p>`+data.origenName+`</p></td>
                        </tr>
                        <tr>
                            <td><h5 style="font-size: 16px"><span><i class="icon-location pull-right"></i></span> Hasta</h5></td>
                            <td><p>`+data.destinoName+`</p> </td>
                        </tr>
                        <tr>
                            <td><h5 style="font-size: 16px; display:inline; margin-right: 10px;"><span><i class="icon-calendar pull-right"></i></span> Fecha</h5></td>
                            <td><p> `+data.fecha+` </p> </td>
                        </tr>
                        <tr>
                            <td><h5 style="font-size: 16px; margin-right: 10px;"><span><i class="icon-clock pull-right"></i></span> Hora</h5></td>
                            <td><p> `+data.hora+` </p></td>
                        </tr>
                        <tr>
                            <td><h5 style="font-size: 16px; margin-right: 10px;"><span><i class="icon-user pull-right"></i></span> Pasajeros</h5></td>
                            <td><p>`+data.personas+`</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- end table-responsive -->
        </div>
    `
    $("#resumenTraslados").html(lista)
}




function armarPrecios(datos){
    var lista = ""
    datos.forEach(element => {
        lista += `
            <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s">
                <div class="row">
                    <div class="col-lg-4 col-md-4 position-relative">
                        <div class="ribbon_3 popular"><span>`+element.type+`</span>
                        </div>
                        <div class="img_list" style="margin:0;">
                            <a href="#" onclick="reservarVehiculo('`+element.id+`'); return false;"><img src="`+element.image+`" alt="Image" style="width:230px; height:auto; margin-left: 50px; margin-top: 40px; margin-bottom:0;"></a>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-5">
                        <h3><strong>`+element.label+`</strong></h3>
                        <div class="row">
                            <div class="col-12" style="display:flex; align-items:center">
                                <span> <i class="mdi mdi-seatbelt" style="font-size:30px; color:var(--color-primario);"></i></span>
                                <span style="margin-left:20px;">`+element.places+` Asientos</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12" style="display:flex; align-items:center">
                                <span><i class="mdi mdi-bag-checked" style="font-size:30px; color:var(--color-primario);"></i></span>
                                <span style="margin-left:20px;">`+element.large_suitcase+` Equipajes facturado</span>
                            </div>    
                        </div>
                         <div class="row">
                            <div class="col-12" style="display:flex; align-items:center">
                                <span><i class="mdi mdi-bag-carry-on" style="font-size:30px; color:var(--color-primario);"></i></span>
                                <span style="margin-left:20px;">`+element.hand_suitcase+` Equipajes de mano</span>
                            </div>    
                        </div>
                         <br>
                         <div class="row" style="text-align: center;">
                            <span>Cancelación gratuita hasta `+element.cancellation+` horas antes del inicio del servicio.</span>
                         </div> 
                    </div>
                    <div class="col-lg-3 col-md-3">
                        <div class="price_list">
                            <div><sup>$</sup>`+(element.prices.USD).toFixed(2)+`
                                <small>*Por vehículo</small>
                                <p><a href="#" class="btn_1" style ="background-color: var(--color-primario);"  onclick="reservarVehiculo('`+element.id+`'); return false;">Reservar</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>`
    });
    $("#listaTraslados").html(lista)
}



function reservarVehiculo(idVehiculo){
    // abrirSpinner("Añadiendo traslado a su carrito...")
    // const informacion = validarInformacion(idVehiculo)
    // let url = window.location.origin + "/carrito"
    // let numeroItemsCivitatis = verificarNumeroItems()
    // let carritoId = localStorage.getItem('carritoCivitatis');
    // if(informacion){
    //     if(carritoId){
    //         Enviar_API_Vuelos(JSON.stringify(informacion), '/api/civitatis/traslado/'+carritoId, datos => {
    //             if (datos.estado){
    //                 cerrarSpinner()
    //                 localStorage.setItem("numCivitatis",numeroItemsCivitatis+1)
    //                 window.location.href = url;
    //             }else{
    //                 cerrarSpinner()   
    //                 mensajeUsuario('error', 'Ooops...','No se ha podido añadir su vehículo al carrito')
    //             }
    //         })
    //     }else{
    //         Enviar_API_Vuelos(JSON.stringify(informacion), '/api/civitatis/traslado', datos => {
    //             if (datos.estado){
    //                 cerrarSpinner()
    //                 localStorage.setItem("numCivitatis",numeroItemsCivitatis+1)
    //                 carritoCivitatis = datos.consulta.cartId
    //                 localStorage.setItem('carritoCivitatis', carritoCivitatis);
    //                 window.location.href = url;
    //             }else{
    //                 cerrarSpinner()   
    //                 mensajeUsuario('error', 'Ooops...','No se ha podido añadir su vehículo al carrito')
    //             }
    //         })
    //     }
    // }
    // else{
    //     setTimeout(function() {
    //         cerrarSpinner() 
    //         mensajeUsuario('error', 'Ooops...','No se ha podido añadir su vehículo al carrito')   
    //     }, 500);
    // }
    
}



function verificarNumeroItems(){
    let numCivitatis = localStorage.getItem("numCivitatis")
    if(!numCivitatis){
        numCivitatis = 0
    }
    return numCivitatis
}




function validarInformacion(idVehiculo){
    let informacion = {
        from: parseInt(datosGlobal.origen),
        to: parseInt(datosGlobal.destino),
        vehicle: parseInt(idVehiculo),
        pax: parseInt(datosGlobal.personas),
        date: datosGlobal.fecha,
        time: datosGlobal.hora
    }
    return informacion
}


function goBack() {
    var url = window.location.origin + "/home"
    window.location.href = url;
}