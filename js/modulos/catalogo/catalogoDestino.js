function recibirInformacion(){
    const urlParams = new URLSearchParams(window.location.search);
    const idDestino = urlParams.get('idDestino');
    if (idDestino) {
        const destinoDecoded = decodeURIComponent(idDestino);
        const destinoObj = JSON.parse(destinoDecoded);
        consultarDestino(destinoObj)
    }
    else{
        console.log("No hay datos")
        const url = window.location.origin + "/listaCatalogos"
        window.location.href = url;
    }
}


function consultarDestino(idDestino){
    abrirSpinner("Cargando catalogos, por favor espere...")
    Obtener_API(null, 'website/ver-catalogos/'+idDestino, datos => {
        if (datos.estado) {
            construirHeader(datos.consulta[0].destino, datos.consulta[0].idDestino)
            llenarCatalogosDestino(datos.consulta)
            setTimeout(() => {
                cerrarSpinner()
            }, 500);
        }
        else{
            setTimeout(() => {
                cerrarSpinner()
            }, 500);
            mensajeUsuario("error","Oops...","Ha ocurrido un error al cargar el destino, intentelo denuevo")
            // goBack()
        }
    })
}


function construirHeader(titulo, idDestino){

    let hero = document.getElementById("hero");

    // Cambiar el atributo data-background
    hero.setAttribute("data-background", `url('img/destinos/destino_`+idDestino+`/header_destino_`+idDestino+`.jpg')`);

    // Aplicar el nuevo fondo al estilo inline
    hero.style.backgroundImage = `url('img/destinos/destino_`+idDestino+`/header_destino_`+idDestino+`.jpg')`;

    $("#tituloDestino").html(titulo)

}


function llenarCatalogosDestino(datos){
    let lista = ``
    datos.forEach((element,index) => {
        if(parseInt(element.visible) == 1){
            lista += `
            <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.`+(index+1)+`s">
                <div class="row">
                    <div class="col-lg-4 col-md-4 position-relative">`
                        if(index<2){
                            lista += `<div class="ribbon_3 popular"><span>Popular</span></div>`
                        }else{
                            lista += `<div class="ribbon_3"><span>MKV</span></div>`
                        }
                        lista += `
                        <div class="img_list">
                            <a href="/catalogoDetalle?idCatalogo=`+element.idCatalogo+`">
                                <img src="img/destinos/destino_`+element.idDestino+`/catalogo_`+element.idCatalogo+`/1.jpg" alt="Image">
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="tour_list_desc">
                            <div class="score" style="color: #c2c2c2">ID:<span>`+element.idCatalogo+`</span></div>
                            <div class="rating">
                                `+iconosEstrellas(element.estrellas)+`
                            </div>
                            <h3><strong>`+element.nombre+`</strong></h3>
                            <small>`+formatParagraph(element.descripcion)+`</small><br>
                            <small>Incluye:</small><br>
                            <div class="row" style="margin-top: 0;">
                                <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                    <i class="icon_set_1_icon-83" style="font-size: 20px; color: var(--color-primario);"></i>
                                    <small style="margin: 0 0 0 10px;">`+element.dias+` días y `+element.noches+` noches</small>
                                </div>
                                <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                    <i class="icon_set_1_icon-70" style="font-size: 20px; color: var(--color-primario);"></i>
                                    <small style="margin: 0 0 0 10px;">`+element.adultos+` Adultos`
                                    if(element.ninos>0){
                                        lista += ` y `+element.ninos+` niños`
                                    }
                                    lista += ` </small>
                                </div>`
                                element.incluye.forEach(aux => {
                                    if(aux.idServicio == 1){
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_2_icon-104" style="font-size: 20px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">Hospedaje</small> 
                                            </div>
                                        `
                                    }
                                    else if(aux.idServicio == 2){
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_3_restaurant-10" style="font-size: 20px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">Alimentación</small>
                                            </div>
                                        `
                                    }
                                    else if(aux.idServicio == 3){
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_1_icon-26" style="font-size: 20px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">Traslados</small>
                                            </div>
                                        `
                                    }
                                    else if(aux.idServicio == 4){
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_1_icon-30" style="font-size: 20px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">Tours</small> <!-- Ajusta el margen izquierdo aquí -->
                                            </div>
                                        `
                                    }else if(aux.idServicio == 5){
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_1_icon-27" style="font-size: 20px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">Automovil</small>
                                            </div>
                                        `
                                    }
                                    else if(aux.idServicio == 6){
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_2_icon-110" style="font-size: 20px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">Crucero</small> 
                                            </div>
                                        `
                                    }
                                    else{
                                        lista += `
                                            <div class="col-md-6 mt-1" style="display: flex; align-items: center;">
                                                <i class="icon_set_1_icon-76" style="font-size: 25px; color: var(--color-primario);"></i>
                                                <small style="margin: 0 0 0 10px;">`+aux.descripcion+`</small>
                                            </div>
                                        `
                                    }
                                });
                                lista +=`
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2">
                        <div class="price_list">
                            <div>
                                $`+parseFloat(element.precio).toFixed(2)+``
                                let total = element.adultos
                                if(element.ninos>0){
                                    total = total + element.ninos    
                                }
                                lista += `
                                <small>*Por `+total+` personas</small>
                                <p>
                                    <a href="/catalogoDetalle?idCatalogo=`+element.idCatalogo+`" class="btn_1" style="color: white; background-color: var(--color-primario);">Detalles</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ` 
        }
    });  
    $("#listDestinos").html(lista)  
}


function formatParagraph(paragraph) {
    const words = paragraph.split(' ').slice(0, 12).join(' ');
    return words + '...';
}



function iconosEstrellas(rating){
    let estrellas = '';
    const estrellasCompletas = Math.floor(rating); // Número de estrellas completas
    const mediaEstrella = rating % 1 >= 0.5;       // Determina si hay media estrella
    const estrellasVacias = 5 - estrellasCompletas - (mediaEstrella ? 1 : 0);
    for (let i = 0; i < estrellasCompletas; i++) {
        estrellas += '<i class="icon-star voted"></i>';
    }
    if (mediaEstrella) {
        estrellas += '<i class="icon-star-half-alt voted"></i>';
    }
    for (let i = 0; i < estrellasVacias; i++) {
        estrellas += '<i class="icon-star-empty voted"></i>';
    }
    return estrellas;
}