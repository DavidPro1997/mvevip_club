/// MEJORES TOURS EN NACOINALES E INTERNACIONALES

var disponibilidad = []

function busquedaTours(tipo, tag){
    Obtener(null, 'tours-tipos/'+tipo, datos => {
        if (datos.estado){
            disponibilidad = datos.consulta
            getTours(tag)
        }else{
            
        }
    })
}

function getTours(tag){
    lista = ''
    disponibilidad.forEach((element, index) => {
        // console.log(element);
        lista += '<div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s">'
        lista += '<div class="row">'
        
        lista += '<div class="col-lg-4 col-md-4 position-relative">'
        // lista += '<div class="ribbon_3 popular"><span>asdfasdf</span></div>'

        lista += '<div class="wishlist">'
        lista += '<a class="tooltip_flip tooltip-effect-1" href="javascript:void(0);">+<span class="tooltip-content-flip"><span class="tooltip-back">Add to wishlist</span></span></a>'
        lista += '</div>'
        
        lista += '<div class="img_list">'
        lista += '<a href="mve_informacion.php?id='+element.id+'"><img src="'+element.image+'" alt="Image">'
        lista += '<div class="short_info"></div>'
        lista += '</a>'
        lista += '</div>'
        lista += '</div>'
        
        lista += '<div class="col-lg-6 col-md-6">'
        lista += '<div class="tour_list_desc">'
        // lista += '<div class="score">Superb<span>9.0</span></div>'
        
        lista += '<div class="rating">'
        for (var x=1; x<=5; x++){
            var on = '-empty'
            if (x<=element.estrellas){
                on = " voted"
            } 
            lista += '<i class="icon-star'+on+'"></i>'
        }  
        lista += '</div>'

        lista += '<h3><strong>'+element.tour+'</strong></h3>'
        lista += '<p>'+element.descripcion+'</p>'

        lista += '<ul class="add_info">'
        element.amenities.forEach(elementAmenitie => {
            lista += '<li>'
            lista += '<a href="javascript:void(0);" class="tooltip-1" data-bs-placement="top" title="'+elementAmenitie.amenitie+'"><i class="'+elementAmenitie.icono+'"></i></a>'
            lista += '</li>'	
        });
        lista += '</ul>'
        
        lista += '</div>'
        lista += '</div>'
        
        lista += '<div class="col-lg-2 col-md-2">'
        lista += '<div class="price_list">'
        // const tarifa = element.tarifas[0]

        lista += '<div style="font-size: 35px;"><sup>$</sup>'+element.tarifas.total.toFixed(2)+'<span class="normal_price_list">$ 120.00</span><small style="font-weight:bold; color: #222;">'+element.tarifas.nombre+'</small>'
        lista += '<p><a href="mve_cart.php?id='+element.id+'" class="btn_1">Comprar</a>'
        lista += '</p>'
        lista += '</div>'
        lista += '</div>'
        lista += '</div>'
        lista += '</div>'
        lista += '</div>'
    });
    $(tag).html(lista) 
}

function getInfo(){
    const id = getId();
    const busqueda = JSON.parse(localStorage.getItem("busqueda")) 
    const opcion = busqueda.opcion
    
    Obtener(null, opcion+'/informacion/'+id, datos => {
        if (datos.estado){
            aplicarInfo(datos.consulta)
        }else{
            alert(datos.error)
        }
    })
}

function getId() {
    const queryString = window.location.href;
    const tag = queryString.split("?")[1];
    const id = tag.split("=")[1];
    return id;
}

function aplicarInfo(datos){ 
    $(".nombre_item").html(datos.nombre)
    $(".descripcion_corta_item").html(datos.descripcion.corta)
    $(".descripcion_larga_item").html(datos.descripcion.larga)
    
    // $("#portada_item").attr("src", datos.portada);

    // $("#portada_item").attr('data-image-src', datos.portada);
    $('.parallax-window').parallax({imageSrc: datos.portada});

    var lista = ''
    var listaThum = '' 
    datos.galeria.forEach(element => { 
        lista += '<div class="sp-slide">'
        lista += '<img alt="Image" class="sp-image" src="css/images/blank.gif" data-src="'+element.link+'" data-small="'+element.link+'" data-medium="'+element.link+'" data-large="'+element.link+'" data-retina="'+element.link+'">'
        lista += '</div>'

        listaThum += '<img alt="Image" class="sp-thumbnail" src="'+element.link+'">'
    });
    $(".listaGaleria").html(lista)
    $(".listaGaleriaThumbnail").html(listaThum)

    // $('.listaGaleria').update()

    $('#Img_carousel').sliderPro({   
        gotoSlide: function( event ) {
            console.log( event.index );
        } 
    });

    var estrellas = ''
    for (var x=1; x<=5; x++){
        var voted = '-empty'
        if (x <= datos.estrellas){
            voted = ' voted'
        } 
        estrellas += '<i class="icon-star'+voted+'"></i>'
    }
    $(".rating_item").html(estrellas)
}