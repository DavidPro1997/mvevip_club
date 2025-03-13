function regresarDetalle(){
    const url = window.location.origin + "/carrito"
    window.location.href = url; 
}

function avanzarFormulario(){
    const url = window.location.origin + "/carritoFormulario"
    window.location.href = url; 
}


function verificarPrecioCarrito(){
    console.log(jsonCarritoPrecioEjemplo)
    armarPreciosTotales(jsonCarritoPrecioEjemplo.preciosTotal)
    let lista = ""
    if(jsonCarritoPrecioEjemplo.vuelos.length>0){
        lista += armarPrecioVuelos(jsonCarritoPrecioEjemplo.vuelos)
    }
    if(jsonCarritoPrecioEjemplo.hoteles.length>0){
        lista += armarPrecioHoteles(jsonCarritoPrecioEjemplo.hoteles)
    }
    if(jsonCarritoPrecioEjemplo.actividades.length>0){
        lista += armarPrecioActividades(jsonCarritoPrecioEjemplo.actividades)
    }
    if(jsonCarritoPrecioEjemplo.transfer.length>0){
        lista += armarPrecioTranfer(jsonCarritoPrecioEjemplo.transfer)
    }
    $("#preciosCarrito").html(lista)
}



function armarPreciosTotales(precios){
    let lista = ""
    lista += `
        <li class="clearfix"><span class="col">Subtotal</span><span class="col">$`+(precios.subtotal).toFixed(2)+`</span>
        </li>
        <li class="clearfix total"><span class="col">Total</span><span class="col">$`+(precios.total).toFixed(2)+`</span>
        </li>
    `
    $("#listaPreciosTotales").html(lista)
}




function armarPrecioVuelos(vuelos){
    let lista = ""
    vuelos.forEach(element => {
        lista += `
            <tr>
                <td>
                    <div class="thumb_cart">
                        <a href="#"><img src="img/carrito/vuelo.jpg" alt="">
                        </a>
                    </div>
                    <strong class="item_cart">`+element.description+`</strong>
                </td>
                <td>
                    <strong>$`+(element.precio).toFixed(2)+`</strong>
                </td>
                <td class="options">
                    <a href="#"><i class=" icon-trash"></i></a>
                </td>
            </tr>
        `
    });
    return lista;
}

function armarPrecioHoteles(hoteles){
    let lista = ""
    hoteles.forEach(element => {
        lista += `
            <tr>
                <td>
                    <div class="thumb_cart">
                        <a href="#"><img src="img/carrito/hotel.jpg" alt="">
                        </a>
                    </div>
                    <strong class="item_cart">`+element.description+`</strong>
                </td>
                <td>
                    <strong>$`+(element.precio).toFixed(2)+`</strong>
                </td>
                <td class="options">
                    <a href="#"><i class=" icon-trash"></i></a>
                </td>
            </tr>
        `
    });
    return lista;
}

function armarPrecioActividades(actividades){
    let lista = ""
    actividades.forEach(element => {
        lista += `
            <tr>
                <td>
                    <div class="thumb_cart">
                        <a href="#"><img src="img/carrito/actividades.jpg" alt="">
                        </a>
                    </div>
                    <strong class="item_cart">`+element.description+`</strong>
                </td>
                <td>
                    <strong>$`+(element.precio).toFixed(2)+`</strong>
                </td>
                <td class="options">
                    <a href="#"><i class=" icon-trash"></i></a>
                </td>
            </tr>
        `
    });
    return lista;
}

function armarPrecioTranfer(tranfer){
    let lista = ""
    tranfer.forEach(element => {
        lista += `
            <tr>
                <td>
                    <div class="thumb_cart">
                        <a href="#"><img src="img/carrito/transfers.jpg" alt="">
                        </a>
                    </div>
                    <strong class="item_cart">`+element.description+`</strong>
                </td>
                <td>
                    <strong>$`+(element.precio).toFixed(2)+`</strong>
                </td>
                <td class="options">
                    <a href="#"><i class=" icon-trash"></i></a>
                </td>
            </tr>
        `
    });
    return lista;
}