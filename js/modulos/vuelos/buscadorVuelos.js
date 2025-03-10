function validarDatosVuelos(){
    if(
        document.getElementById("salida").value.trim() !== '' &&
        document.getElementById("destino").value.trim() !== '' &&
        document.getElementById("salida-datepicker").value.trim() !== '' &&
        document.getElementById("retorno-datepicker").value.trim() !== '' &&
        document.getElementById("salida").value.trim() !== document.getElementById("destino").value.trim()
    ){
        let datos = armarArray()
        buscarVuelos(datos) 
    }
    else{
        mensajeUsuario("info","Campos incorrectos","Hay algunos campos incorrectos, por favor revise la información")
    }    
}




function armarArray(){
    let datos = {
        tipo: document.getElementById("tipo").value,
        clase: document.getElementById("claseVuelo").value,
        salida: document.getElementById("salida").value.substring(0, 3),
        destino: document.getElementById("destino").value.substring(0, 3),
        fechaSalida: document.getElementById("salida-datepicker").value, 
        fechaRetorno: document.getElementById("retorno-datepicker").value
    }
    return datos
}



function buscarVuelos(datos){
    var personasString = JSON.stringify(personas)
    var datosString = JSON.stringify(datos)
    var personasEncode = encodeURIComponent(personasString)
    var datosEncode = encodeURIComponent(datosString)
    var url = window.location.origin + "/listaVuelos?datos=" + datosEncode+"&personas="+ personasEncode;
    window.location.href = url;
}






document.getElementById("salida-datepicker").addEventListener("input", function() {
    // Cambia el color y tamaño del texto dentro del input
    this.style.fontSize = "18px"; // Cambia el tamaño del texto
    this.style.textAlign = "center"
});

document.getElementById("retorno-datepicker").addEventListener("input", function() {
    // Cambia el color y tamaño del texto dentro del input
    this.style.fontSize = "18px"; // Cambia el tamaño del texto
    this.style.textAlign = "center"

});



var personas = {
    adultos: 1,
    ninos: 0,
    bebes: 0,
    viejos: 0,
    discapacitados: 0
};
function cargarPersonas() {
    let adultos = document.getElementById("numeroAdulto").value
    let ninos = document.getElementById("numeroNino").value
    let bebes = document.getElementById("numeroBebe").value
    let viejos = document.getElementById("terceraEdad").value
    let discapacitados = document.getElementById("discapacitados").value

    if(parseInt(adultos,0) <= 0 || !adultos){
        adultos = 1
        document.getElementById("numeroAdulto").value = 1
    }
    if(!ninos){
        ninos=0
        document.getElementById("numeroNino").value = 0
    }
    if(!bebes){
        bebes=0
        document.getElementById("numeroBebe").value = 0
    }
    if(!viejos){
        viejos=0
        document.getElementById("terceraEdad").value = 0
    }
    if(!discapacitados){
        discapacitados=0
        document.getElementById("discapacitados").value = 0
    }
    personas.adultos = adultos
    personas.ninos = ninos
    personas.bebes = bebes
    personas.viejos = viejos
    personas.discapacitados = discapacitados
    var total = parseInt(adultos,10) + parseInt(ninos) + parseInt(bebes) + parseInt(viejos) + parseInt(discapacitados)
    document.getElementById("personas").value = total+" PERSONA(S)"
    cerrarDropdown("dropdownPersonasContent")
}




function cerrarDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}



function mostrarValoresDefaultVuelos(id){
    var lista = `
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('UIO - Quito - Mariscal Sucre - Ecuador',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">UIO - Quito - Mariscal Sucre</strong> 
                <span class="text-muted" style="font-size: 12px;">Ecuador</span>
            </a>
        </div>
         <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('JFK - New York - John F.Kennedy, NY - USA',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">JFK - New York - John F.Kennedy, NY</strong> 
                <span class="text-muted" style="font-size: 12px;">USA</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('MIA - Miami, Florida - USA',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">MIA - Miami, Florida</strong> 
                <span class="text-muted" style="font-size: 12px;">USA</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('PUJ - Punta Cana - Republica Dominicana',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">PUJ - Punta Cana</strong> 
                <span class="text-muted" style="font-size: 12px;">Republica Dominicana</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('CUN - Cancún - México',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">CUN - Cancún </strong> 
                <span class="text-muted" style="font-size: 12px;">México</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('ORL - Orlando international Airport - USA',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">ORL - Orlando international Airport</strong> 
                <span class="text-muted" style="font-size: 12px;">USA</span>
            </a>
        </div>
        <div class="col-12">
            <a class="dropdown-item text-wrap" href="#" onclick="escogerSalidaVuelos('CTG - Cartagena - Colombia',`+id+`);return false;" style="white-space: normal;">
                <strong style="font-size: 14px">CTG - Cartagena</strong> 
                <span class="text-muted" style="font-size: 12px;">Colombia</span>
            </a>
        </div>
    `
    if(id == 0){
        $("#listaDestinos").html(lista)

    }else if(id == 1){
        $("#listaDestinos_d").html(lista)

    }
}



var proteccion = true
function buscadorDestinosVuelos(event, id){
    if(id == 0){
        $("#spinnerContenidoVuelos").show()
        $("#buscadorContenidoVuelos").hide()
        
        setTimeout(function() {
            let textoIngresado = document.getElementById("salida").value;
            let numero = parseInt(textoIngresado.length)
            if(numero >= 1 && proteccion){
                proteccion = false
                mostrarDestinosVuelos(textoIngresado, id)
            }else if(numero<3){
                mostrarValoresDefaultVuelos(id)
                $("#spinnerContenidoVuelos").hide()
                $("#buscadorContenidoVuelos").show() 
            }       
        }, 1000);
    }
    
    else if(id == 1){
        $("#spinnerContenidoVuelos_d").show()
        $("#buscadorContenidoVuelos_d").hide()
        
        setTimeout(function() {
            let textoIngresado = document.getElementById("destino").value;
            let numero = parseInt(textoIngresado.length)
            if(numero >= 1 && proteccion){
                proteccion = false
                mostrarDestinosVuelos(textoIngresado, id)
            }else if(numero<3){
                mostrarValoresDefaultVuelos(id)
                $("#spinnerContenidoVuelos_d").hide()
                $("#buscadorContenidoVuelos_d").show() 
            }       
        }, 1000);
    }
    
}


function mostrarDestinosVuelos(buscador, id){
    proteccion = false
    Obtener_API_Vuelos(null, '/api/chequeando/prebusqueda?buscador='+buscador, datos => {
        if (datos.estado) {
            let lista =""
            proteccion = true
            datos.consulta.forEach((element, index) => {
                lista += `
                <div class="col-12">
                    <a class="dropdown-item" href="#" onclick="escogerSalidaVuelos('`+element.code+ `-` +element.city+ `-` +element.country+`',`+id+`);return false;"><strong>`+element.code+`-`+element.city+`</strong> <span class="text-muted" style="font-size: small;">`+element.country+`</span></a>
                </div> `
            });
            let titulo = `<i class="fas fa-building"></i> Se ha encontrado:`
            if(id == 0){
                $("#tituloSalida").html(titulo)
                $("#listaDestinos").html(lista)
                $("#buscadorContenidoVuelos").show()  
                $("#spinnerContenidoVuelos").hide()
            }
            else if(id == 1){
                $("#tituloDestino").html(titulo)
                $("#listaDestinos_d").html(lista)
                $("#buscadorContenidoVuelos_d").show()  
                $("#spinnerContenidoVuelos_d").hide()
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



function escogerSalidaVuelos(ciudadEscogida, id){
    if(id == 0){
        document.getElementById("salida").value = ciudadEscogida.toUpperCase()
        document.getElementById("salida").style.fontSize = "15px"        
        document.getElementById("salida").style.textAlign = "center"        
        document.getElementById("dropdownSalida").classList.remove("show");
    }
    else if (id == 1){
        document.getElementById("destino").value = ciudadEscogida.toUpperCase()
        document.getElementById("destino").style.fontSize = "15px"        
        document.getElementById("dropdownDestino").classList.remove("show");
        document.getElementById("destino").style.textAlign = "center"        
    }
}



document.addEventListener('click', function (event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const inputSalida = document.getElementById('salida');
    const inputDestino = document.getElementById('destino');
    const inputPersonas = document.getElementById('personas');
    if(inputSalida){
        if (inputSalida.contains(event.target)) {
            const dropdown = bootstrap.Dropdown.getInstance(inputSalida);
            if (dropdown) {
                dropdown.show();
            }
        } else if (!dropdownMenu.contains(event.target)) {
            // Ocultar el dropdown si el clic está fuera del dropdown
            const dropdown = bootstrap.Dropdown.getInstance(inputSalida);
            if (dropdown) {
                dropdown.hide();
            }
        }
    }
    if(inputDestino){
        if (inputDestino.contains(event.target)) {
            const dropdown_d = bootstrap.Dropdown.getInstance(inputDestino);
            if (dropdown_d) {
                dropdown_d.show();
            }
        } else if (!dropdownMenu.contains(event.target)) {
            // Ocultar el dropdown si el clic está fuera del dropdown
            const dropdown_d = bootstrap.Dropdown.getInstance(inputDestino);
            if (dropdown_d) {
                dropdown_d.hide();
            }
        }
    }

    if(inputPersonas){
        if (inputPersonas.contains(event.target)) {
            const dropdown_p = bootstrap.Dropdown.getInstance(inputPersonas);
            if (dropdown_p) {
                dropdown_p.show();
            }
        } else if (!dropdownMenu.contains(event.target)) {
            // Ocultar el dropdown si el clic está fuera del dropdown
            const dropdown_p = bootstrap.Dropdown.getInstance(inputPersonas);
            if (dropdown_p) {
                dropdown_p.hide();
            }
        }
    }
});


function establecerSalida(){
    flatpickr("#salida-datepicker", {
        minDate: "today", // Bloquear fechas anteriores a hoy
        dateFormat: "Y-m-d",
        disableMobile: true, // Opcional: evita que el selector se convierta en un selector móvil
        locale: "es"
    }) 
}


function establecerRegreso(){
    let forma = document.getElementById("tipo").value
    if(forma == "ida_vuelta"){
        var fechaSalida = document.getElementById("salida-datepicker").value
        flatpickr("#retorno-datepicker", {
            minDate: fechaSalida, 
            dateFormat: "Y-m-d",
            disableMobile: true,
            locale: "es",
            defaultDate: fechaSalida,
            onReady: function(selectedDates, dateStr, instance) {
                instance.open(); 
        }
        });
    }
    
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