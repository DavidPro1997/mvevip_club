var numeroItemsIndex = 0
function verificarCarritosIndex(){
    let total = localStorage.getItem("numItems")
    if(parseInt(total)>0){
        lista = `<i class="icon_cart"></i><strong>`+total+`</strong>`
        $("#numeroItemsIndexCarrito").html(lista)
    }else{
        $("#numeroItemsIndexCarrito").html("")
    }
}

function obtenerTelefono(){
    $("#telefonoPolitica").html(obtenerNumero())
}

function abrir_cerrar_menu(){
    $('.main-menu').toggleClass('show');
	$('.layer').toggleClass('layer-is-visible');
}

function cargarScript(){
    var script = document.createElement('script');
    script.src = 'js/functions.js?v=1.0.0';  // Ruta del script
    script.type = 'text/javascript';
    script.defer = true;  // Asegura que se cargue después de que el DOM esté listo
    document.body.appendChild(script);
    script.onload = function() {};
    script.onerror = function() {
        console.error('Hubo un error al cargar el script.');
    };
    
}