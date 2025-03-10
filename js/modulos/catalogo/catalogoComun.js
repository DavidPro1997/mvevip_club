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


function llenarCatalogos(catalogosDestino, numero){
    let col = 6
    if(numero == 3){
        col = 4
    }
    let lista = ``
    catalogosDestino.forEach((element,index) => {
        if(index < numero){
            lista += `
            <div class="col-lg-`+col+` col-md-`+col+` wow zoomIn" data-wow-delay="0.`+index+`s">
                <div class="tour_container">`
                    if(index<3){
                        lista += `<div class="ribbon_3 popular"><span style="font-size: 8px;">PROMO DEL MES</span></div>`
                    }else{
                        lista += `<div class="ribbon_3"><span>MKV</span></div>`
                    }
                    lista += `
                    <div class="img_container">
                        <a href="/listaCatalogosTours?idDestino=`+element.idDestino+`">
                            <img src="img/destinos/destino_`+element.idDestino+`/header_destino_`+element.idDestino+`.jpg" class="img-fluid" alt="Image" style="width: 100%; height: 300px;">
                            <div class="short_info">
                                <span class="price"><sup><p style="font-size: 13px; margin-bottom: 0; text-align: end;">Desde </p>$</sup>`+parseFloat(element.precio_minimo).toFixed(2)+`</span>
                            </div>
                        </a>
                    </div>
                    <div class="tour_title">
                        <h3><strong>`+element.destino+` </strong><small> (`+element.catalogos+` Catálogos)</small></h3>
                        <div class="rating">
                            `+iconosEstrellas(element.estrellas)+`
                        </div>
                    </div>
                </div>
            </div>
        ` 
        }
    });  
    return lista
}