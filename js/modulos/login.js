function abrirModalOlvidePassword() {
    cerrarSpinner(); // Cierra el spinner primero
    setTimeout(() => {
        $("#scrollable-modal").modal({
            backdrop: true,
            keyboard: true,
        }).modal('show');
    }, 300); // Espera un poco para evitar solapamientos
}


function abrirModalPolitica(){
    $("#modal-politica").modal('show')
}


function conSesion(){
    $("#mkv_sinSesion").hide()
    $("#mkv_conSesion").show()
    $("#botonInciarSession").hide()
    $("#botonCerrarSession").show()

}


function sinSesion(){
    $("#mkv_sinSesion").show()
    $("#mkv_conSesion").hide()
    $("#botonCerrarSession").hide()
    $("#botonInciarSession").show()
}


function crearArrayCuenta(){
    const info = {
        primerNombre: document.getElementById("primerNombre").value,
        segundoNombre: document.getElementById("segundoNombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        cedula: document.getElementById("cedula").value,
        correo: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        password1: document.getElementById("password1").value,
        password2: document.getElementById("password2").value,
        politica: document.getElementById("politica").checked
    }
    return info
}


function crearCuenta(){
    const info = crearArrayCuenta()
    if(validarArrayComun(info)){
        API_POST(JSON.stringify(info), '/enviarCorreoVerificacion', datos => {
            if (datos.estado){
                $("#modalCorreo").modal("show")
            }else{
                mensajeUsuario('info','Oops...',datos.mensaje)
            }
        })

    }else{
        mensajeUsuario('info','Oops...','Debe llenar todos los campos')
    }
    
}



function guardarRegistro(){
    const info = crearArrayCuenta()
    info.codigo = document.getElementById("codigo").value
    if(validarArrayComun()){
        API_POST(JSON.stringify(info), '/registrarUsuario', datos => {
            if (datos.estado){
                mensajeUsuario('success','¡Bien!',datos.mensaje).then(e => {
                    window.location.href = "/login";
                })
            }else{
                mensajeUsuario('info','Oops...',datos.mensaje)
            }
        })
    }
}


function restablecerEmail(){
    const info = {
        correo : document.getElementById("emailResta").value
    }
    API_POST(JSON.stringify(info), '/restablecerPassword', datos => {
        if (datos.estado){
            mensajeUsuario('success','¡Bien!',datos.mensaje)
        }else{
            mensajeUsuario('info','Oops...',datos.mensaje)
        }
    })
}





function iniciarSesion(){
    abrirSpinner("Espere, por favor...")
    const info = {
        username: document.getElementById("emailSesion").value,
        password: document.getElementById("passwordSesion").value
    }

    Enviar_API_Vuelos(JSON.stringify(info), '/api/v2/login', datos => {
        if (datos.estado){
            cerrarSpinner()
            localStorage.setItem("authToken",datos.token)
            mensajeUsuario('success','¡Bien!',"Sesión iniciada correctamente.").then(() => {
                window.location.href = "/home";
            });
            
        }else{
            cerrarSpinner()
            mensajeUsuario('info','Oops...',datos.error)
        }

    })
}




function verificarAutenticacion() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        sinSesion()
    } else {
        console.log("Verificando token")
        apiToken().then(() => {
            conSesion()
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}



function apiToken() {
    return new Promise((resolve, reject) => {
        Obtener_API_Vuelos(null, '/api/v2/sesion', datos => {
            if (datos.estado) {
                resolve(datos.datos); // Resuelve la promesa con verdadero si el token es válido
            } else {
                sinSesion()
                reject(datos.mensaje); // Rechaza la promesa si hay un error
            }
        })
    });
}




function cerrarSesion(){
    abrirSpinner("Cerrando Sesion")
    setTimeout(() => {
        localStorage.removeItem("authToken");
        window.location.href = '/home';
    }, 500);
}




function detectarEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene el comportamiento por defecto, si es necesario
        iniciarSesion();        // Llama a la función iniciarSesion
    }
}