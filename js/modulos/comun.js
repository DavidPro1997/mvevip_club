var numeroTelefono = "+593993111114"
var email = "info@mvevip.com"
var facebook = "https://www.facebook.com/share/eAaQqQzrMvU7T4MV"
var instagram = "https://www.instagram.com/marketingvipecuador"
var tiktok = "https://www.tiktok.com/@marketingvipecuador"
var youtube = "https://www.youtube.com/channel/UCTb9vJwhQcB7Ea_1va1o7bg"


var fee_por_habitacion = 1
var fee_por_persona = {
    fee_1_persona: 35,
    fee_2_persona: 25,
    fee_3_persona: 20,
    fee_4_persona: 15,
} 

function removerPuntos(cadena) {
    return cadena.replace(/\./g, '__');
}


function traducirPalabra(palabra) {
    const diccionario = {
        "email":"Correo Electrónico",
        "phone": "Teléfono",
        "prefix": "Prefijo",
        "firstName":"Nombre",
        "lastName":"Apellido",
        "Pickup point":"Punto de recogida",
        "Hotel or accommodation name":"Nombre del hotel o alojamiento",
        "Hotel or accommodation address":"Dirección del hotel o alojamiento",
        "City of departure":"Ciudad de salida",
        "Airline and flight number":"Aerolínea y número de vuelo",
        "kid_weight":"Peso del niño",
        "kid_age":"Edad del niño",
        "Only hand bags?":"¿Trae solo bolsos de mano?",
        "Airline and return flight number":"Número de aerolínea y vuelo de regreso"
    };
    return diccionario[palabra] || palabra;
}


function modificarFee(datos){
    fee_por_habitacion = datos.porcentajes[1].percentage
    fee_por_persona.fee_1_persona = datos.porcentajes[0].person_1
    fee_por_persona.fee_2_persona = datos.porcentajes[0].person_2
    fee_por_persona.fee_3_persona = datos.porcentajes[0].person_3
    fee_por_persona.fee_4_persona = datos.porcentajes[0].person_4

}

function abrirSpinner(mensaje){
    $("#mensajeSpinner").html(mensaje)
    $("#centermodal").modal({
        backdrop: 'static',
        keyboard: false
    }).modal('show')
}


function cerrarSpinner(){
    $("#centermodal").modal('hide');
}


function mensajeUsuario(icono,titulo,mensaje){
    setTimeout(function() {
        cerrarSpinner()    
    }, 1000);

    return Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: 'Entendido'
    });
}


function scrollTop() {
    window.scrollTo(0, 0);
}

function transformArrayToObject(array) {
    let result = {};
    array.forEach(item => {
        const key = item[0];         // Nombre (tipo, clase, etc.)
        const value = item[1];       // Dejar el valor como string
        result[key] = value;         // Asignar al objeto
    });
    return result;
}



function guardarCache(datos, nombre) {
    const request = indexedDB.open("miBaseDeDatos", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("cache")) {
            // Crear el objectStore sin keyPath (clave primaria)
            db.createObjectStore("cache");
        }
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("cache", "readwrite");
        const objectStore = transaction.objectStore("cache");

        // Verificar si existe "cacheHoteles"
        const getRequest = objectStore.get(nombre);

        getRequest.onsuccess = function(event) {
            if (event.target.result) {
                // Si existe, sobrescribir los datos usando una clave explícita
                const dataToUpdate = {
                    datos: datos // Los nuevos datos
                };
                const updateRequest = objectStore.put(dataToUpdate, nombre);

                updateRequest.onsuccess = function() {
                    console.log("Datos sobrescritos con éxito:", dataToUpdate);
                };

                updateRequest.onerror = function() {
                    console.error("Error al sobrescribir los datos");
                };
            } else {
                // Si no existe, agregar los nuevos datos usando una clave explícita
                const dataToAdd = {
                    datos: datos // Los nuevos datos
                };
                const addRequest = objectStore.put(dataToAdd, nombre);

                addRequest.onsuccess = function() {
                    console.log("Datos guardados con éxito en la cache", dataToAdd);
                };

                addRequest.onerror = function() {
                    console.error("Error al guardar los datos");
                };
            }
        };

        getRequest.onerror = function() {
            console.error("Error al obtener datos de "+nombre);
        };
    };

    request.onerror = function() {
        console.error("Error al abrir la base de datos");
    };
}



function recuperarDatosCache(nombre) {
    return new Promise((resolve, reject) => {
        // Abrimos la base de datos
        let request = indexedDB.open("miBaseDeDatos", 1);

        request.onsuccess = function (event) {
            let db = event.target.result;
            let transaction = db.transaction(["cache"], "readonly");
            let objectStore = transaction.objectStore("cache");

            // Intentamos obtener el valor de "cacheHoteles"
            let getRequest = objectStore.get(nombre);

            getRequest.onsuccess = function (event) {
                if (getRequest.result) {
                    resolve(getRequest.result);  // Devolvemos el resultado
                } else {
                    resolve(null);  // No se encontraron datos
                }
            };

            getRequest.onerror = function () {
                reject("Error al recuperar los datos de "+nombre);
            };
        };

        request.onerror = function (event) {
            reject("Error al abrir la base de datos: " + event.target.errorCode);
        };
    });
}


function verificarArray(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            // Verifica si el valor es vacío
            if (value === "" || value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
                return false; // Algún valor está vacío
            }
        }
    }
    return true; // Todos los valores están llenos
}


function obtenerPuntacion(puntuacion){
    let estrellas = puntuacion;
    let puntos = Math.floor(estrellas)
    let lista = {icono: "", puntos: puntos};
    for (let i = 1; i <= puntos; i++) {
        lista.icono += '<i class="icon-star-5 voted"></i>';
    }
    if (estrellas % 1 >= 0.5) {
        puntos = puntos+1
        lista.icono += '<i class="icon-star-half voted"></i>';
    }
    for (let i = puntos; i < 5; i++) {
        lista.icono += '<i class="icon-star-empty-2  voted"></i>';
    }
    return lista;
}



function abrirChatWhatsApp(mensaje) {
    if(!mensaje){
        mensaje = "Hola quiero información sobre sus servicios..."
    }
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}

function obtenerCorreo(){
    return email
}

function obtenerNumero(){
    return numeroTelefono
}


function abrirLlamada(){
    window.location.href = `tel:${numeroTelefono}`;
}

function enviarCorreo(asunto, cuerpo) {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = mailtoLink;
}

function abrirFacebook(){
    window.open(facebook, '_blank');
}

function abrirInstagram(){
    window.open(instagram, '_blank');
}

function abrirTiktok(){
    window.open(tiktok, '_blank');
}

function abrirYoutube(){
    window.open(youtube, '_blank');
}

function cerrarMenu(){
    $('.main-menu').removeClass('show'); 
    $('.layer').removeClass('layer-is-visible');
}


function actualizarValor(cambio, id, parametro1, parametro2, tipoFuncion, min, max) {
    let input = document.getElementById(id);
    let valorActual = parseInt(input.value);    
    valorActual += cambio;
    if (valorActual < min) valorActual = min;
    if (valorActual > max) valorActual = max;
    input.value = valorActual;
    if(tipoFuncion == 2){
        actualizarPersonas(parametro1,parametro2)
    }
    else if(tipoFuncion == 1){
        actualizarEdad(parametro1,parametro2)
    }
    else if(tipoFuncion == 3){
        if(verificarPasajerosVuelos()>9){
            input.value = valorActual -1
        }
    }

}