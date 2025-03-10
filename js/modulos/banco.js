function consultarBancos(){
    Obtener_API(null, 'website/bancos', datos => {
        if (datos.estado) {
            const lista = llenarBancos(datos.consulta, datos.consulta.length)
            $("#listaBancos").html(lista)
        }
    })
}




function llenarBancos(listaBancos, numero){
    listaBancos.sort((a, b) => a.orden - b.orden);
    let lista = ``
    listaBancos.forEach((element,index) => {
        if(parseInt(element.visible) == 1){
            if(index < numero){
                lista += `

                    <div class="col-lg-4 col-md-4 wow zoomIn" data-wow-delay="0.`+index+`s">
                        <div class="tour_container">`
                        if(parseInt(element.visible) == 1){
                            lista += `<div class="ribbon_3"><span>ACTIVO</span></div>`
                        }
                        else{
                            lista += `<div class="ribbon_3 popular"><span>INACTIVO</span></div>`
                        }
                        lista += `
                            <div class="img_container">
                                <a href="/bancosDetalles?idBanco=`+element.idBanco+`">
                                    <img src="img/bancos/banco_`+element.idBanco+`/main.jpg" class="img-fluid" alt="Image" style="width: 100%; height: 300px;">
                                    <!-- <div class="short_info">
                                        <h3 style="font-size: 20px; margin-bottom: 0; text-align: end; color: white;"><strong>`+element.nombre+`</strong></h3>
                                    </div> -->
                                </a>
                            </div>
                            <!-- <div class="tour_title">
                                <div class="rating" style="text-align: justify;">
                                    `+truncarTexto(element.descripcion,100)+` <br>
                                    <a href="`+element.link+`" target="_blank">Mas detalles</a>                               
                                </div> 
                            </div>-->
                        </div>
                    </div>

                `
            } 
        }
    });  
    return lista
}



function truncarTexto(texto, numero) {
    if (texto.length > numero) {
        return texto.substring(0, numero) + '...';
    }
    return texto; // Si el texto ya es menor o igual al límite, se devuelve sin cambios.
}



function initCardAnimations() {
    const cards = document.querySelectorAll(".card-hover");

cards.forEach(card => {
    let isAnimating = false; // Para bloquear la animación mientras dura el giro

    // Función para activar la animación
    const activateCard = () => {
        if (!isAnimating && !card.classList.contains("active")) {
            isAnimating = true; // Bloquea nuevas activaciones
            card.classList.add("active");

            // Desbloquear después de 800ms (duración de la animación)
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }
    };

    // Función para desactivar la animación
    const deactivateCard = () => {
        if (!isAnimating && card.classList.contains("active")) {
            isAnimating = true; // Bloquea nuevas activaciones
            card.classList.remove("active");

            // Desbloquear después de 800ms (duración de la animación)
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }
    };

    // Evento mouseenter para activar
    card.addEventListener("mouseenter", activateCard);

    // Evento mouseleave para desactivar
    card.addEventListener("mouseleave", deactivateCard);
});

// Para pantallas pequeñas: Click alterna la clase
if (window.innerWidth <= 768) {
    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("active");
        });
    });
}

}