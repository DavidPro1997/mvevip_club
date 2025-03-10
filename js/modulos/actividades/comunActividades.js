function obtenerPuntacion(puntuacion){
    let estrellas = redondeoPersonalizado(puntuacion / 2);
    let puntos = Math.floor(estrellas)
    let lista = {icono: "", puntos: estrellas};
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



function sacarScore(puntos){
    const puntuacion = parseFloat(puntos)
    let lista = {icono: "",tipo:""}
    if(puntuacion>= 9){
        lista.tipo = "Magnífico 9+"
        lista.icono += `<div class="score">Máginífico<span>`+puntos+`</span></div>`
    }else if(puntuacion<9 && puntuacion>=7){
        lista.tipo = "Bien 7+"
        lista.icono += `<div class="score">Bien<span>`+puntos+`</span></div>`
    }else if(puntuacion<7 && puntuacion>=5){
        lista.tipo = "Agradable 5+"
        lista.icono += `<div class="score">Agradable<span>`+puntos+`</span></div>`
    }else if(puntuacion<5){
        lista.tipo = "Sin calificación"
        lista.icono += ``
    }
    return lista
}


function obtenerIdiomas(idiomas){
    let lista = ""
    if(idiomas.length>0){
        lista += `<ul>`
        idiomas.forEach(element => {
            if(element=="es"){
                lista +=    `
                    <li>
                        `+(element.charAt(0).toUpperCase() + element.slice(1))+`
                        <img src="img/idiomas/espanol.jpg" style="width:8px; height: 8px; margin: 0;" alt="Image">
                    </li>`
            }else if(element == "en"){
                lista +=    `
                    <li>
                        `+(element.charAt(0).toUpperCase() + element.slice(1))+`
                        <img src="img/idiomas/ingles.jpg" style="width:8px; height: 8px; margin: 0;" alt="Image">
                    </li>`
            }
        });
        lista += `</ul>`
    }else{
        lista = "No disponible por el momento"
    }
    return lista
}


function redondeoPersonalizado(numero) {
    let entero = Math.floor(numero);   // Parte entera
    let decimal = numero - entero;     // Parte decimal
    
    if (decimal < 0.25) {
      return entero;  // Redondear al entero más cercano hacia abajo
    } else if (decimal < 0.75) {
      return entero + 0.5;  // Redondear al .5 más cercano
    } else {
      return entero + 1;  // Redondear al siguiente entero
    }
  }


function tipoActividad(subcategoria){
    let lista = ""
    if(subcategoria.id == 9 || subcategoria.id == 13){
        lista += '<i class="icon_set_1_icon-37"></i>Excursion'
    }
    else if(subcategoria.id == 2){
        lista += '<i class="icon_set_1_icon-4"></i>Museos/Monumentos'
    }
    else if(subcategoria.id == 89){
        lista += '<i class="icon_set_1_icon-2"></i>Templo/Ceremonia'
    }
    else if(subcategoria.id == 109 || subcategoria.id == 1){
        lista += '<i class="icon_set_1_icon-59"></i>Tour'
    }
    else if(subcategoria.id == 17){
        lista += '<i class="icon_set_1_icon-30"></i>Senderismo'
    }
    else if(subcategoria.id == 44 || subcategoria.id == 74 || subcategoria.id == 75){
        lista += '<i class="icon_set_1_icon-28"></i>Aire/Adrenalina'
    }
    else if(subcategoria.id == 51 || subcategoria.id == 77 || subcategoria.id == 29 || subcategoria.id == 10 || subcategoria.id == 80 || subcategoria.id == 36 || subcategoria.id == 30 || subcategoria.id == 35 || subcategoria.id == 38 || subcategoria.id == 79){
        lista += '<i class="icon_set_2_icon-110"></i>Agua/Mar/Río'
    }
    else if(subcategoria.id == 4 || subcategoria.id == 111){
        lista += '<i class="icon_set_1_icon-26"></i>Autobús'
    }
    else if(subcategoria.id == 3 || subcategoria.id == 92 || subcategoria.id == 71){
        lista += '<i class="icon_set_1_icon-27"></i>Vehículo'
    }
    else if(subcategoria.id == 61 || subcategoria.id == 14 || subcategoria.id == 62  ){
        lista += '<i class="icon_set_1_icon-44"></i>Atracciones'
    }
    else if(subcategoria.id == 7 || subcategoria.id == 6 || subcategoria.id == 94 || subcategoria.id == 25){
        lista += '<i class="icon_set_1_icon-40"></i>Ruedo'
    }
    else if(subcategoria.id == 23 || subcategoria.id == 63){
        lista += '<i class="icon_set_1_icon-22"></i>Fauna'
    }
    else if(subcategoria.id == 83 || subcategoria.id == 81 || subcategoria.id == 78){
        lista += '<i class="icon_set_3_restaurant-10"></i>Comida'
    }
    else if(subcategoria.id == 11){
        lista += '<i class="icon_set_1_icon-50"></i>Shoping'
    }
    else if(subcategoria.id == 66 || subcategoria.id == 95 || subcategoria.id == 96  ){
        lista += '<i class="icon_set_1_icon-94"></i>Credenciales'
    
    }else{
        lista += `` 
        
    }
    return lista
}

function formatoEnteros(num) {
    if (num > 0 && num < 1) {
        return '1';
    } else if (Number.isInteger(num)) {
        return `${num}`;
    } else {
        let enteroInferior = Math.floor(num); // Redondea hacia abajo
        let enteroSuperior = Math.ceil(num);  // Redondea hacia arriba
        return `${enteroInferior}-${enteroSuperior}`;
    }
}


