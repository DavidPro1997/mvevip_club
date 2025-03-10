async function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const idDestino = urlParams.get('idDestino');
    if (idDestino) {
        const destinoDecoded = decodeURIComponent(idDestino);
        const destinoObj = JSON.parse(destinoDecoded);
        buscarActividades(destinoObj)

    } else {
        console.log ('Datos de actividades no especificados, revisando cache...')
        let datos = await recuperarDatosCache("cacheActividades");
        let actividadesCache = datos.datos
        if(actividadesCache){
            actividadesGlobal = actividadesCache.actividades
            armarActividades(actividadesCache.actividades)
            armarTitulo(actividadesCache.destino)
            armarfiltrosActividades()
            cerrarSpinner()
        }
        else{
            console.log("No hay datos en la cache")
        }
    }
}


var actividadesGlobal = []
function buscarActividades(idDestino){
    abrirSpinner("Cargando su destino, espere porfavor...")
    Obtener_API_Vuelos(null, '/api/civitatis/actividades/'+idDestino, datos => {
       if (datos.estado) {
            guardarDatosCache(datos.consulta, datos.infoDestino)
            actividadesGlobal = datos.consulta
            armarActividades(datos.consulta)
            armarTitulo(datos.infoDestino)
            armarfiltrosActividades()
            cerrarSpinner()
           
       }
       else{
            mensajeUsuario("error","Oops...","Ha ocurrido un error al cargar el destino, intentelo denuevo")
           goBack()
       }

   })
}


function guardarDatosCache(actividades, destino){
    const datosCahe = {actividades: actividades, destino: destino}
    guardarCache(datosCahe, "cacheActividades")
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





var actividadesFiltradosGlobalCat = []
var preciosGlobalActividades = {min:0, max:0}

function armarfiltrosActividades(){
    let actividadesPuntos = {}
    let actividadesPrecios = {min:10000000, max:0}
    actividadesGlobal.forEach(element => {
        //Precios
        if(parseFloat(element.minimumPrice)<actividadesPrecios.min){
            actividadesPrecios.min = element.minimumPrice
        }
        if(parseFloat(element.minimumPrice)>actividadesPrecios.max){
            actividadesPrecios.max = element.minimumPrice
        }


        //Estrellas
        let puntos = sacarScore(element.score).tipo
        if (!actividadesPuntos[puntos]) { 
            actividadesPuntos[puntos] = [];
        }
        actividadesPuntos[puntos].push(element);
    });
    actividadesFiltradosGlobalCat = actividadesPuntos
    preciosGlobalActividades.min = actividadesPrecios.min
    preciosGlobalActividades.max = actividadesPrecios.max
    armarFiltroCategoriasActi(actividadesPuntos)
    armarFiltroPreciosActi(parseFloat(actividadesPrecios.min),parseFloat(actividadesPrecios.max))
}


var actividadesFiltradosGlobalScore = []
function armarFiltroCategoriasActi(cat){
    const orden = ["Magnífico 9+", "Bien 7+", "Agradable 5+", "Sin calificación"];
    const actividadesOrdenadas = {};
    orden.forEach(key => {
    if (cat[key]) {
        actividadesOrdenadas[key] = cat[key];
    }
    });
    actividadesFiltradosGlobalScore = actividadesOrdenadas
    let lista = ""
    Object.keys(actividadesOrdenadas).forEach(element => {
        lista += `
            
                <li>
                    <label class="container_check">
                        `+element+` (`+cat[element].length+`)
                        <input type="checkbox" value="`+element+`" class="checkbox-item">
                        <span class="checkmark"></span>
                    </label>
                </li>

        `
    });
    $("#listaScore").html(lista)
}



function armarFiltroPreciosActi(newMin, newMax) {
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



function filtrarActividades(){
    abrirSpinner("Filtrando...")
    setTimeout(function() {
        var actividadesFiltrados = {}
        actividadesFiltrados = validarScoreAct()
        actividadesFiltrados = validarPreciosAct(actividadesFiltrados)
        actividadesFiltrados = validarOrdenPrecioAct(actividadesFiltrados)
        armarActividades(actividadesFiltrados)
        cerrarSpinner()
    }, 500);
}



function validarOrdenPrecioAct(actividades){
    const ordenSelec = document.querySelector('input[name="ordenarPrecioAct"]:checked');
    if(ordenSelec){
        if(ordenSelec.value == 0){
            actividades.sort((a, b) => parseFloat(a.minimumPrice) - parseFloat(b.minimumPrice));
        }
        else if(ordenSelec.value == 1){
            actividades.sort((a, b) => parseFloat(b.minimumPrice) - parseFloat(a.minimumPrice));
        }
        
    }
    return actividades
    
}



function validarPreciosAct(actividadesFiltrados){
    var actividadesFiltradosPrecios = []
    var sliderData = $("#range").data("ionRangeSlider");
    var fromValue = sliderData.result.from; // Valor 'from'
    var toValue = sliderData.result.to;     // Valor 'to
    if(preciosGlobalActividades.min != fromValue || preciosGlobalActividades.max != toValue){
        actividadesFiltrados.forEach(element => {
            if(parseFloat(element.minimumPrice)>=fromValue && parseFloat(element.minimumPrice)<=toValue){
                actividadesFiltradosPrecios.push(element)
            }
        });
        return actividadesFiltradosPrecios
    }else{
        return actividadesFiltrados
    }
}




function validarScoreAct(){
    var actividadesFiltrados = []
    var scoreEscogidas = [];
    $(".checkbox-item:checked").each(function() {
        scoreEscogidas.push($(this).val()); // Agrega el valor al array
    });
    if(scoreEscogidas.length>0){
        Object.keys(actividadesFiltradosGlobalScore).forEach(element => {
            scoreEscogidas.forEach(puntos => {
                if(puntos == element){
                    actividadesFiltrados.push(...actividadesFiltradosGlobalScore[element])
                }
            });
            
        });
        return actividadesFiltrados
    }
    else{
        return actividadesGlobal
    }
    
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
                            <h3>Actividades exclusivas aquí</h3>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label><i class="icon-airport" style="transform: rotate(135deg); display: inline-block; font-size: 22px;"></i>Destino</label>
                                        <input type="text" id="destinoActividad" placeholder="Escriba una ciudad de su preferencia..." class="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" autocomplete="off" data-bs-display="static" oninput="buscadorDestinosActividad(event,1)"  onfocus="this.nextElementSibling.classList.add('show')" style="font-size: 16px; align-items: center; width: 100%;">
                                        <div class="dropdown-menu" style="width: 100%; max-height: 50vh; overflow-y: auto;" id="dropdownDestino">
                                            <div id="spinnerContenidoActividad" style="text-align: center; display: none;">                
                                                <div class="spinner-border avatar-lg m-2" role="status" style="color: var(--color-primario);"></div>
                                            </div>
                                            <div id="buscadorContenidoActividad" style="display: block;">
                                                <div>
                                                    <h6 class="dropdown-header" style="font-size: 20px; color: var(--color-primario);">
                                                        <i class="fas fa-building"></i>
                                                        Destinos</h6>
                                                    <div class="row" id="listaDestinosActividades">
                                                    </div>
                                                </div>
                                                <hr style="border: none; border-top: 2px solid rgb(213, 213, 213); margin: 20px 0;">
                                                <div>
                                                    <h6 class="dropdown-header" style="font-size: 20px; color: var(--color-primario);">
                                                        <i class=" fas fa-running"></i>
                                                        Actividades</h6>
                                                    <div class="row" id="listaActividadesUnicas">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <button class="btn_1 green" style="background-color: var(--color-primario);" onclick="listarActividades()"><i class="icon-search"></i>Buscar ahora</button>
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
    mostrarValoresDefaultActividades()
}



function armarActividades(datos){
    var lista = ""
    datos.forEach(element => {
        lista += `
            <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s">
                <div class="row">
                    <div class="col-lg-4 col-md-4 position-relative"> `
                        if(parseFloat(element.minimumPrice) < parseFloat(element.originalPrice)){
                            lista += `<div class="ribbon_3"><span>Descuento</span> </div>`
                        }
                        lista +=`
                        
                        <div class="wishlist">
                            <a class="tooltip_flip tooltip-effect-1" href="javascript:void(0);">+<span class="tooltip-content-flip"><span class="tooltip-back">Add to wishlist</span></span></a>
                        </div>
                        <div class="img_list">
                            <a href="#" onclick="irActividad('`+element.id+`'); return false;"><img src="`+element.photos.header[0].paths.grid+`" alt="Image">
                                <div class="short_info">
                                    `+tipoActividad(element.subcategory)+`
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="tour_list_desc">
                            `+sacarScore(element.score).icono+`
                            <div class="rating">
                                `+obtenerPuntacion(element.score).icono+`
                                <small>(`+element.reviews+` vistas)</small>
                            </div>
                            <h3><strong>`+element.title+`</strong></h3>
                            <p>`+element.description+`</p>
                            <ul class="add_info">
                                <li>
                                    <div class="tooltip_styled tooltip-effect-4">
                                        <span class="tooltip-item"><i class="icon_set_1_icon-83"></i></span>
                                        <div class="tooltip-content">
                                            <h4>Tiempo de actividad</h4>
                                            <strong>`+formatoEnteros((element.duration.duration)/60)+`</strong> Hora(s) aproximadamente
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="tooltip_styled tooltip-effect-4">
                                        <span class="tooltip-item"><i class="icon_set_1_icon-41"></i></span>
                                        <div class="tooltip-content">
                                            <h4>Ubicación de recogida</h4> `
                                            if(element.address.shortAddress){
                                                lista += `
                                                   `+element.address.shortAddress+` <br>
                                                    <a href="https://www.google.com/maps?q=`+element.address.latitude+`,`+element.address.longitude+`" target="_blank" style="writing-mode: horizontal-tb; display: inline; line-height: normal; color: inherit; ">Ver ubicación en el mapa</a>

                                                `
                                            }else{
                                                lista += `No disponible por el momento`
                                            }
                                            lista += `
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="tooltip_styled tooltip-effect-4">
                                        <span class="tooltip-item"><i class="icon_set_1_icon-97"></i></span>
                                        <div class="tooltip-content">
                                            <h4>Idioma de los guías</h4> 
                                            `+obtenerIdiomas(element.guideLanguages)+`
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2">
                        <div class="price_list">
                            <div><sup>$</sup>`+(element.minimumPrice).toFixed(2)+``
                                if(parseFloat(element.minimumPrice) < parseFloat(element.originalPrice)){
                                    lista += `<span class="normal_price_list">$`+(element.originalPrice).toFixed(2)+`</span>`
                                }
                                lista +=`
                                <small>*Por persona</small>
                                <p><a href="#" class="btn_1" style ="background-color: var(--color-primario);"  onclick="irActividad('`+element.id+`'); return false;">Detalles</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>`
    });
    $("#hola").html(lista)
}


function irActividad(id){
    var actividadString = JSON.stringify(id)
    var actividadEncode = encodeURIComponent(actividadString)
    var url = window.location.origin + "/actividadDetalle?idActividad=" + encodeURIComponent(actividadEncode);
    // console.log(url)
    window.location.href = url;
}




function goBack() {
    var url = window.location.origin + "/home"
    window.location.href = url;
}










