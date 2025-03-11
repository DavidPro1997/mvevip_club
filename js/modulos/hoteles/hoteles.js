async function recibirInformacion() {
    const urlParams = new URLSearchParams(window.location.search);
    const datosString = urlParams.get('datos');

        if (datosString) {
            const datos = JSON.parse(decodeURIComponent(datosString));
            armarOcupantes(datos)
            setearInformacion(datos)
            consultarHoteles(datos)
        } else {
            console.log("El parámetro 'datos' no está presente, revisando cache...");
            let datos = await recuperarDatosCache("cacheHoteles");
            const hotelesCache = datos.datos
            if(hotelesCache){
                console.log(hotelesCache)
                noches = calcularNoches(hotelesCache.datos.stay.checkIn, hotelesCache.datos.stay.checkOut)
                armarOcupantes(hotelesCache.datos)
                setearInformacion(hotelesCache.datos)
                hotelesGlobal = hotelesCache.hoteles
                armarHoteles(hotelesCache.hoteles)
                armarfiltros(hotelesCache.hoteles)
            }
            else{
                console.log("No hay datos en la cache")
            }
        }

}





var ocupantes = []
function armarOcupantes(datos){
    ocupantes = datos.occupancies
    ocupantes.forEach((element,index) => {
        let edades = ""
        if(element.paxes){
            element.paxes.forEach((edad,i) => {
                if(element.paxes[i+1]){
                    edades += edad.age+", "
                }else{
                    edades += edad.age
                }
                
            });
        }
    });
}





var hotelesGlobal = []
var noches = 0
function consultarHoteles(info){
    abrirSpinner("Cargando hoteles, por favor espere")
    console.log(info)
    Enviar_API_Vuelos(JSON.stringify(info), '/api/hotelbeds/booking/disponibilidad', datos => {
        if (datos.estado){
            noches = calcularNoches(datos.consulta.checkIn, datos.consulta.checkOut)
            guardarDatosCache(info, datos.consulta.hotels)
            hotelesGlobal = datos.consulta.hotels
            armarHoteles(datos.consulta.hotels)
            armarfiltros(datos.consulta.hotels)
            cerrarSpinner()
        }else{
            cerrarSpinner()
            mensajeUsuario('error','Oops...',datos.error)     
        }

    })

}



function guardarDatosCache(info, hoteles){
    const datos = {datos: info, hoteles: hoteles}
    guardarCache(datos, "cacheHoteles")
}




function filtrarNombreHotel(event,input) {
    if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault(); 
        filtrarHoteles()
    }
}


var pensionGlobal = []
var tipoHabitacionGlobal = []
var hotelesFiltradosGlobalCat = []
var preciosGlobalHoteles = {min:0, max:0}

function armarfiltros(hoteles){
    var categorias = {}
    var hotelesPrecios = {min:10000000, max:0}
    if(hoteles){
        hoteles.forEach(element => {
            //Precios
            if(parseFloat(element.minRate)<hotelesPrecios.min){
                hotelesPrecios.min = element.minRate
            }
            if(parseFloat(element.minRate)>hotelesPrecios.max){
                hotelesPrecios.max = element.minRate
            }
    
    
            //Estrellas
            let puntos = element.categoryName.match(/\d+/)
            if(puntos){ puntos = obtenerPuntacion(parseInt(puntos[0])).puntos}
            else{ puntos = element.categoryName }
            if (!categorias[puntos]) {
                categorias[puntos] = [];
            }
            categorias[puntos].push(element);
    
            //Pension //tipo habitacion
            sacar_tipos_pension(element.rooms)
    
        });
        hotelesFiltradosGlobalCat = categorias
        preciosGlobalHoteles.min = hotelesPrecios.min
        preciosGlobalHoteles.max = hotelesPrecios.max
        armarFiltroCategorias(categorias)
        // armarFiltroPrecios(parseFloat(hotelesPrecios.min),parseFloat(hotelesPrecios.max))
        sacarTipoHabitacion(tipoHabitacionGlobal)
        armarFiltroPension(pensionGlobal)
    }
}


function sacar_tipos_pension(rooms){
    rooms.forEach(element => {
        if(!tipoHabitacionGlobal.includes(element.code)){
            tipoHabitacionGlobal.push(element.code)
        }


        element.rates.forEach(rate => {
            if(!pensionGlobal.includes(rate.boardName)){
                pensionGlobal.push(rate.boardName)
            }
        });


    });
}


var tiposGlobal = []
function sacarTipoHabitacion(tipoHabitacion_){
    Enviar_API_Vuelos(JSON.stringify(tipoHabitacionGlobal), '/api/hotelbeds/booking/roomtypes', datos => {
        if (datos.estado){
            tiposGlobal = datos.consulta
            armarFiltroTipoHabitacion(datos.consulta)
        }else{
            mensajeUsuario('error','Oops...',datos.error)     
        }
    })
}


function armarFiltroTipoHabitacion(cat){
    let lista = ""
    cat.forEach(element => {
        lista += `
            <li>
                <label class="container_check">
                    <span class="rating">`+element.typeDescription.toUpperCase()+` </span>
                    <input type="checkbox" value="`+element.type+`" class="checkbox-item" data-group="grupo2" checked>
                    <span class="checkmark"></span>
                </label>
            </li>
        `
    });
    $("#listaTipoHabitacion_hotel").html(lista)
}



function armarFiltroPension(pension){
    let lista = ""
    let lista2 = ""
    pension.forEach((element,indice) => {
        lista += `
            <li>
                <label class="container_check">
                    <span class="rating">`+element.toUpperCase()+` </span>
                    <input type="checkbox" value="`+element+`" class="checkbox-item" data-group="grupo3" checked>
                    <span class="checkmark"></span>
                </label>
            </li>
        `
    });
    $("#listaHabitacionPension").html(lista)
    
}


function armarFiltroCategorias(cat){
    let lista = ""
    Object.keys(cat).forEach(element => {
        lista += `
            <li>
                <label class="container_check">
                    <span class="rating">
                        `
                        if(!isNaN(element)){
                            lista += obtenerPuntacion(element).icono
                        }else{
                            lista+= `<span class="voted" style="margin-right: 20px;">`+element+`</span>`
                        }
                        lista +=
                        `
                    </span>(`+cat[element].length+`)
                    <input type="checkbox" value="`+element+`" class="checkbox-item" data-group="grupo1" checked>
                    <span class="checkmark"></span>
                </label>
            </li>
        `
    });
    $("#listaEstrellas").html(lista)
}


// document.getElementById('toggle-grupo2').addEventListener('click', function () {
//     const group = this.dataset.group; // Obtener el grupo del botón
//     const checkboxes = document.querySelectorAll(`.checkbox-item[data-group="${group}"]`); // Seleccionar checkboxes del grupo
//     const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked); // Verificar si todos están seleccionados
//     checkboxes.forEach(checkbox => checkbox.checked = !allChecked);
//     this.textContent = allChecked ? "Marcar todos" : "Quitar todos";
// });



// document.getElementById('toggle-grupo1').addEventListener('click', function () {
//     const group = this.dataset.group; // Obtener el grupo del botón
//     const checkboxes = document.querySelectorAll(`.checkbox-item[data-group="${group}"]`); // Seleccionar checkboxes del grupo
//     const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked); // Verificar si todos están seleccionados
//     checkboxes.forEach(checkbox => checkbox.checked = !allChecked);
//     this.textContent = allChecked ? "Marcar todos" : "Quitar todos";
// });

document.getElementById('toggle-grupo3').addEventListener('click', function () {
    const group = this.dataset.group; // Obtener el grupo del botón
    const checkboxes = document.querySelectorAll(`.checkbox-item[data-group="${group}"]`); // Seleccionar checkboxes del grupo
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked); // Verificar si todos están seleccionados
    checkboxes.forEach(checkbox => checkbox.checked = !allChecked);
    this.textContent = allChecked ? "Marcar todos" : "Quitar todos";
});




function filtrarHoteles(){
    abrirSpinner("Filtrando...")
    const valor = document.getElementById("nombreHotelFiltro").value.toLowerCase();
    setTimeout(function() {
        let hotelesFiltrados = {}
        hotelesFiltrados = filtrarHotelesInput(valor)
        // hotelesFiltrados = validarCategoria()
        hotelesFiltrados = validarHabitacionesPension(hotelesFiltrados)
        // hotelesFiltrados = validarTipoHabitaciones(hotelesFiltrados)
        hotelesFiltrados = validarOrdenPrecio(hotelesFiltrados)
        armarHoteles(hotelesFiltrados)  
        // actualizarPreciosConFiltros(hotelesFiltrados)
    }, 500);
}




function filtrarHotelesInput(valorInput){
    if(valorInput.length > 0){
        const hotelesFiltrados = hotelesGlobal.filter(hotel =>
            hotel.name.toLowerCase().includes(valorInput)
        );
        return hotelesFiltrados    
    }
    else if(valorInput.length == 0){
        return hotelesGlobal
    }
}



function validarHabitacionesPension(hoteles){
    const checkboxes = document.querySelectorAll('.checkbox-item[data-group="grupo3"]');
    const selected = [];
    const notSelected = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selected.push(checkbox.value); // Almacenar el valor si está seleccionado
        } else {
            notSelected.push(checkbox.value); // Almacenar el valor si no está seleccionado
        }
    });
    return armarHabitacionesPension(hoteles,selected)
}



function armarHabitacionesPension(hoteles, seleccionados) {
    // Crear una copia profunda del array de hoteles
    const hotelesCopia = JSON.parse(JSON.stringify(hoteles));
    const hotelesFiltrados = hotelesCopia.filter(hotel => {
        // Verificar que `rooms` sea un array
        if (!Array.isArray(hotel.rooms)) {
            return false;
        }

        // Verificar si alguna habitación tiene `rates` con un `boardName` en `seleccionados`
        hotel.rooms.forEach((room) => {
            room.rates = room.rates.filter(rate => seleccionados.includes(rate.boardName));
        });
        return hotel.rooms.some(room => room.rates.length > 0);
    });

    return hotelesFiltrados;
}





function validarTipoHabitaciones(hoteles){
    const checkboxes = document.querySelectorAll('.checkbox-item[data-group="grupo2"]');
    const selected = [];
    const notSelected = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selected.push(checkbox.value); // Almacenar el valor si está seleccionado
        } else {
            notSelected.push(checkbox.value); // Almacenar el valor si no está seleccionado
        }
    });
    const arrayFiltrado = armarHabitacionesFiltradas(hoteles,selected)
    return arrayFiltrado
}



function armarHabitacionesFiltradas(hoteles, seleccionados) {
    return hoteles.filter(hotel => {
        return hotel.rooms.some(room => seleccionados.includes(room.code.split('.')[0]));
    });
}





function validarOrdenPrecio(hoteles) {
    const ordenSelec = document.querySelector('input[name="ordenarPrecio"]:checked');
    if (ordenSelec) {
        hoteles.sort((a, b) => {
            const netA = obtenerPrimerNetValido(a.rooms);
            const netB = obtenerPrimerNetValido(b.rooms);

            if (ordenSelec.value == 0) {
                return netA - netB; // Orden ascendente
            } else if (ordenSelec.value == 1) {
                return netB - netA; // Orden descendente
            }
            return 0; // Sin cambios
        });
    }
    return hoteles;
}



function obtenerPrimerNetValido(rooms) {
    // Encuentra el primer rates válido y devuelve su net
    if (Array.isArray(rooms)) {
        for (let room of rooms) {
            if (Array.isArray(room.rates)) {
                for (let rate of room.rates) {
                    if (rate?.sellingRate) {
                        return parseFloat(rate.sellingRate); // Devuelve el net encontrado
                    }
                    else if (rate?.net) {
                        return parseFloat(rate.net); // Devuelve el net encontrado
                    }
                }
            }
        }
    }
    return Infinity; // Valor alto por defecto si no hay net válido
}



function validarPrecios(hotelesFiltrados){
    var hotelesFiltradosPrecios = []
    var sliderData = $("#range").data("ionRangeSlider");
    var fromValue = sliderData.result.from; // Valor 'from'
    var toValue = sliderData.result.to;     // Valor 'to
    if(preciosGlobalHoteles.min != fromValue || preciosGlobalHoteles.max != toValue){
        hotelesFiltrados.forEach(element => {
            if(parseFloat(element.minRate)>=fromValue && parseFloat(element.minRate)<=toValue){
                hotelesFiltradosPrecios.push(element)
            }
        });
        return hotelesFiltradosPrecios
    }else{
        return hotelesFiltrados
    }
}




function validarCategoria(){
    var hotelesFiltrados = []
    var catEscogidas = [];
    $(".checkbox-item:checked").each(function() {
        catEscogidas.push($(this).val()); // Agrega el valor al array
    });
    if(catEscogidas.length>0){
        Object.keys(hotelesFiltradosGlobalCat).forEach(element => {
            catEscogidas.forEach(puntos => {
                if(puntos == element){
                    hotelesFiltrados.push(...hotelesFiltradosGlobalCat[element])
                }
            });
            
        });
        return hotelesFiltrados
    }
    else{
        return hotelesGlobal
    }
    
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





function setearInformacion(datos){
    document.getElementById("destinoHotel").value = datos.destinationId
    document.getElementById("chekInHotel").value = datos.stay.checkIn
    document.getElementById("chekOutHotel").value = datos.stay.checkOut
    let personas = 0
    let habitaciones = 0
    datos.occupancies.forEach(element => {
        personas = element.adults + element.children
        habitaciones = element.rooms
    });
    document.getElementById("personasHoteles").value = "👤 "+personas+" PERSONAS Y 🏠 "+habitaciones+" HABITACIONES"
    $("#tituloHotelDestino").html(datos.destinationId+" - 👤 "+personas+" PERSONA(S) Y 🏠 "+habitaciones+" HABITACION(ES)")
}







function obtenerExclusiveDeal(id){
    if(id == 1){
        return "PREFERENCIALES"
    }else if(id == 2){
        return "TOP HOTELES"
    }else if(id == 3){
        return "REGULARES"
    }else{
        return id
    }
}


async function armarHoteles(datos) {
    $("#listaHoteles").html("")
    let lista = ""
    if(datos){
        for (const element of datos) {
            if(parseFloat(element.minRate) < 10000){
                lista = ""
                lista += `
                    <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s">
                        <div class="row">
                            <div class="col-lg-4 col-md-4 position-relative">`
                                if(element.exclusiveDeal){
                                    lista += `
                                    <div class="ribbon_3"><span style="font-size:7px;">`+obtenerExclusiveDeal(element.exclusiveDeal)+`</span></div>
                                    `
                                }
                                lista += `
                                <div class="img_list">
                                    <a href="#"  onclick="verHotel('`+element.code+`'); return false;">`

                                    let imagenURL = "img/hoteles/mkv.jpg"; // Imagen por defecto

                                    if (element.images && element.images[0] && element.images[0].length > 0) {
                                        let lastImage = element.images[0][0];
                                        imagenURL = lastImage // Espera la verificación de la imagen
                                    }
                                
                                    lista += `<img src="${imagenURL}" alt="Image" style="width: 100%; object-fit: cover; left:0;">
                                        
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5">
                                <div class="tour_list_desc" style="overflow-y: auto; margin-bottom: 15px;">
                                    <div class="rating">`
                                        let puntos = element.categoryName.match(/\d+/)
                                        if(puntos){
                                            lista += obtenerPuntacion(parseInt(puntos[0])).icono
                                        }else{
                                            lista += `<span class="voted">`+element.categoryName+`</span>`
                                        }
                                        lista += `
                                    </div>
                                    <h3><strong>`+element.name+`</strong></h3>
                                    <p>`+element.rooms.length+` tipos de habitaciones se adaptan a tu busqueda:</p>
                                    <div clas="row" style="display: flex;">
                                        <div class="col-2">
                                            <i class="icon-location" style ="color:#99c21c;"></i>
                                        </div>
                                        <div class="col-9" style="display: flex; flex-direction: column;">
                                            <span>`+element.destinationName+` / `+element.address+` / <a href="https://www.google.com/maps?q=${element.latitude},${element.longitude}" target="_blank">
                                                Ver ubicación en el Mapa
                                            </a></span>
                                        </div>
                                    </div> 
                                    <div clas="row" style="display: flex;">
                                        <div class="col-2">
                                            <i class="icon-phone" style ="color:#99c21c;"></i>
                                        </div>
                                        <div class="col-9" style="display: flex; flex-direction: column;">
                                            <span>`
                                            if(element.phones[0].phone_number){
                                            lista += element.phones[0].phone_number 
                                            }lista+=
                                            `</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3">
                                <div class="price_list">
                                    <div>
                                        <small>Desde</small>
                                        <sup>$</sup>`
                                        const id_minimo = "precioMinimo_"+element.code
                                        const precio = parseFloat(element.minRate)
                                        lista += `<span id="${id_minimo}">` + (precio * fee_por_habitacion).toFixed(2) + `</span>`
                                        lista += `<small>*Por ` + noches + ` noche(s)</small>
                                        <p>
                                            <a href="#" onclick="verHotel('` + element.code + `'); return false;" class="btn_1" style ="background-color: #99c21c;">Ver Hotel</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            ` + armarStringHoteles(ocupantes, element.code) + `
                        </div>
                    </div>
                `
                const listaHotelesElement = $("#listaHoteles");
                if (listaHotelesElement.length) {
                    listaHotelesElement.append(lista);
                } else {
                    console.log("El elemento con id 'listaHoteles no existe en el DOM.");
                }
                dividir(element.rooms, element.code, element.name)
            }
        }
    }
    
    cerrarSpinner()
}



function dividir(rooms, codigoHotel, nombreHotel){
    let lista = ""
    const datos_por_habitacion = dividirPorIdRate(rooms)
    let precioMin = 0
    
    datos_por_habitacion.forEach(element => {
        lista = ""
        const rooms = obtenerRooms(1,element.rooms, element.id, codigoHotel, nombreHotel)
        lista += rooms.lista
        precioMin = precioMin + parseFloat(rooms.precioMin)
        lista += `<br><br><br><br>`
        $("#pasajero_"+element.id+"_"+codigoHotel).html(lista)        
    });
    $("#precioMinimo_"+codigoHotel).html(precioMin.toFixed(2))
}




function verHotel(id){
    datos = {
        idHotel: id,
        ocupantes: ocupantes
    }
    let datosString = encodeURIComponent(JSON.stringify(datos));
    let url = window.location.origin + "/hotelDetalle?datos=" + datosString;
    window.location.href = url;
}


function calcularNoches(fechaInicio, fechaFin) {
    // Crear objetos Date asegurando que se interpreten correctamente
    const inicio = new Date(`${fechaInicio}T00:00:00`);
    const fin = new Date(`${fechaFin}T00:00:00`);
    
    // Calcular la diferencia en milisegundos
    const diferenciaTiempo = fin - inicio;
    
    // Convertir la diferencia de tiempo en noches (milisegundos en un día)
    const noches = diferenciaTiempo / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.floor(noches)); // Asegura que no sea negativo
}


function goBack() {
    var url = window.location.origin + "/home"
    window.location.href = url;
}

