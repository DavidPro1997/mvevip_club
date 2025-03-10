function recibirInformacion(){
    const urlParams = new URLSearchParams(window.location.search);
    const idCatalogo = urlParams.get('idCatalogo');
    if (idCatalogo) {
        const catalogoDecoded = decodeURIComponent(idCatalogo);
        const catalogoObj = JSON.parse(catalogoDecoded);
        consultarCatalogo(catalogoObj)
    }
    else{
        console.log("No hay datos")
        const url = window.location.origin + "/listaCatalogos"
        window.location.href = url;
    }
}


function consultarCatalogo(idCatalogo){
    abrirSpinner("Cargando catalogos, por favor espere...")
    Obtener_API(null, 'website/ver-catalogo/'+idCatalogo, datos => {
        if (datos.estado) {
            construirHeader(datos.consulta[0])
            construiEmogis(datos.consulta[0])
            construirImagenes(datos.consulta[0])
            construirDescripcion(datos.consulta[0])
            contruirPoliticas(datos.consulta[0].terminos)
            setearValoresGlobales(datos.consulta[0])
            rutaPDF = `img/destinos/destino_`+datos.consulta[0].idDestino+`/catalogo_`+datos.consulta[0].idCatalogo+`/catalogo_`+datos.consulta[0].idCatalogo+`.pdf`
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



function construirHeader(datos){
    let lista = ""
    lista += `
        <section class="parallax-window" data-parallax="scroll" data-image-src="img/destinos/destino_`+datos.idDestino+`/catalogo_`+datos.idCatalogo+`/1.jpg" data-natural-width="1400" data-natural-height="470" style="background-image: url('img/destinos/destino_`+datos.idDestino+`/catalogo_`+datos.idCatalogo+`/1.jpg'); background-position: center; background-repeat:no-repeat; background-size: cover;">
            <div class="parallax-content-2">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8">
                            <h1>`+datos.nombre+`</h1>
                            <span class="rating">
                                `+iconosEstrellas(datos.estrellas)+`
                            </span>
                        </div>
                        <div class="col-md-4">
                            <div id="price_single_main">
                                Por `+sacarPersonas(datos.adultos, datos.ninos)+` personas <span><sup>$</sup>`+parseFloat(datos.precio).toFixed(2)+`</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ` 
    $("#headerDetalle").html(lista)
}


function construiEmogis(datos){
    let lista = ""
    lista += `
        <li><i class="icon_set_1_icon-83"></i>`+datos.dias+` Dias</li>
        <li><i class="icon_set_1_icon-70"></i>`+sacarPersonas(datos.adultos, datos.ninos)+` Personas</li>`
        datos.incluye.forEach(aux => {
            if(aux.idServicio == 1){
                lista += `<li><i class="icon_set_2_icon-104"></i>Hospedaje</li>`
            }
            else if(aux.idServicio == 2){
                lista += `<li><i class="icon_set_3_restaurant-10"></i>Alimentación</li>`
            }
            else if(aux.idServicio == 3){
                lista += `<li><i class="icon_set_1_icon-27"></i>Traslados</li>`
            }
            else if(aux.idServicio == 4){
                lista += `<li><i class="icon_set_1_icon-30"></i>Tours</li>`
            }
            else if(aux.idServicio == 5){
                lista += `<li><i class="icon_set_1_icon-27"></i>Automovil</li>`
            }
            else if(aux.idServicio == 6){
                lista += `<li><i class="icon_set_2_icon-110"></i>Crucero</li>`
            }
            else{
                lista += `<li><i class="icon_set_1_icon-76"></i>`+aux.descripcion+`</li>`
            }
        });
    $("#listaEmogis").html(lista)
}



function construirDescripcion(datos){
    let lista = ""
    lista =`
        <h4>`+datos.nombre+`</h4>
        <p style="text-align:justify;">`+datos.descripcion+`</p>
        <h4>¿Qué incluye?</h4>
        <p style="text-align:justify;">
            A continuación, se muestran los detalles del paquete seleccionado. Te invitamos a revisar la información para que puedas disfrutar de la mejor experiencia.</p>
        <div class="row">
            <div class="col-md-12">
                <ul>
                    <li>`+datos.dias+` días y `+datos.noches+` noches</li>
                    <li>`+datos.adultos+` adultos`;if(datos.ninos > 0){lista += ` y `+datos.ninos+` niños`}lista += `</li>`
                    datos.incluye.forEach(element => {
                        lista += `<li>`+element.nombreServicio
                        if(element.observaciones && element.observaciones[0].detalle && element.observaciones[0].detalle!=null){
                            lista += `:
                                <ul class="list_ok" style="margin:15px;">`
                                    element.observaciones.forEach(aux => {
                                        lista += `<li>`+aux.detalle+`</li>`
                                    });
                                    lista +=`
                                </ul>
                            `
                        }
                        lista += `</li>`
                    });
                    lista +=` 
                </ul>
            </div>
        </div>
    `
    $("#descripcionTour").html(lista)
}


function contruirPoliticas(politicas){
    lista = ""
    politicas.forEach(element => {
        lista += `
            <tr>
                <td>
                    `+element.termino+`
                </td>
            </tr>
        `
    });
    $("#listaPoliticas").html(lista)
}


function construirImagenes(datos){
    let lista = ""
    lista += `<div class="sp-slides">`
    for (let i = 1; i <= 7; i++) {
        const nuevaRuta = `img/destinos/destino_`+datos.idDestino+`/catalogo_`+datos.idCatalogo+`/${i}.jpg`
        lista += `
            <div class="sp-slides">
                <div class="sp-slide">
                    <img alt="Image" class="sp-image" src="css/images/blank.gif" data-src="`+nuevaRuta+`" data-small="`+nuevaRuta+`" data-medium="`+nuevaRuta+`" data-large="`+nuevaRuta+`" data-retina="`+nuevaRuta+`">
                </div>
            </div>`
    }
    
    lista += ` </div>
            <div class="sp-thumbnails">`
                for (let i = 1; i <= 7; i++) {
                    const nuevaRuta = `img/destinos/destino_`+datos.idDestino+`/catalogo_`+datos.idCatalogo+`/${i}.jpg`
                    lista += `<img alt="Image" class="sp-thumbnail" src="`+nuevaRuta+`">`
                }
                lista +=` 
            </div>
    `
    $(".listaImagenes").html(lista)
    inicializarCarrusel()
}



async function descargarPDF() {
    const ruta = rutaPDF
    console.log(ruta)
    try {
        const response = await fetch(ruta);
        if (!response.ok) throw new Error('Error al descargar el archivo.');

        const blob = await response.blob();
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = ruta.split('/').pop(); // Nombre del archivo desde la ruta
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove(); // Elimina el enlace temporal
        URL.revokeObjectURL(enlace.href); // Limpia el URL objeto
    } catch (error) {
        console.error(error);
        alert('No se pudo descargar el archivo.');
    }
}

document.getElementById('descargarBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    descargarPDF(); 
});


function inicializarCarrusel() {
    $('#Img_carousel').sliderPro({
        width: 1000,
        height: 667,
        fade: true,
        arrows: true,
        buttons: false,
        fullScreen: false,
        smallSize: 500,
        startSlide: 0,
        mediumSize: 1000,
        largeSize: 3000,
        thumbnailArrows: true,
        autoplay: false
    });
    scrollTop();
}



function sacarPersonas(adultos, ninos){
    let total = adultos
    if(ninos){
        total = total + ninos
    }
    return total
}


function establecerDateReserva(){
    flatpickr("#fechaReserva", {
        minDate: "today", // Bloquear fechas anteriores a hoy
        dateFormat: "Y-m-d",
        defaultDate: "today",
        disableMobile: true // Opcional: evita que el selector se convierta en un selector móvil
    }) 
}

function sacarNumeroTelefono(){
    $("#numeroTelefono").html(obtenerNumero())
}



var destino = ""
var nombre = ""
var precio = ""
var idCatalogo = ""
function setearValoresGlobales(datos){
    destino = datos.destino
    nombre = datos.nombre
    precio = datos.precio
    idCatalogo = datos.idCatalogo
}



function reservar(){
    const fecha = document.getElementById("fechaReserva").value
    const adultos = document.getElementById("adults").value
    const ninos = document.getElementById("children").value
    const mensaje = 
    `Hola, Marketing VIP. Revisé su catálogo y me interesa realizar una reserva para un viaje a `+destino+`-`+nombre+`. Quisiera agendar para la fecha de `+fecha+` para un grupo de `+adultos+` adultos y `+ninos+` niños. Por favor, confirmarme la disponibilidad y detalles adicionales del paquete con id: `+idCatalogo;
    abrirChatWhatsApp(mensaje)
}