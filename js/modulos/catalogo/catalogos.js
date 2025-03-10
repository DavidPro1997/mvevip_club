function consultarCatalogos(){
    abrirSpinner("Cargando catalogos, por favor espere...")
    Obtener_API(null, 'website/ver-destinos', datos => {
        if (datos.estado) {
            const lista = llenarCatalogos(datos.consulta, datos.consulta.length)
            $("#listaCatalogos").html(lista)  
            setTimeout(() => {
                cerrarSpinner()
            }, 500);
        }
        else{
            setTimeout(() => {
                cerrarSpinner()
            }, 500);
            mensajeUsuario("error","Oops...","Ha ocurrido un error al cargar el destino, intentelo denuevo")
            goBack()
        }
    })
}



function irTours(datos){
    localStorage.setItem("listaTours",datos)
    const url = window.location.origin + "/listaCatalogosTours"
    window.location.href = url;
}


function goBack() {
    var url = window.location.origin + "/home"
    window.location.href = url;
}