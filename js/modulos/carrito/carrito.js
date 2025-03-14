function consultarCarrito(){
    console.log(jsonCarritoEjemplo)
    if(jsonCarritoEjemplo.vuelos.length>0){
        llamarVuelos(jsonCarritoEjemplo.vuelos)
    }
    if(jsonCarritoEjemplo.hoteles.length>0){
        llamarHoteles(jsonCarritoEjemplo.hoteles)
    }
    if(jsonCarritoEjemplo.actividades.length>0){
        armarActividadesCarrito(jsonCarritoEjemplo.actividades)
    }
    if(jsonCarritoEjemplo.tranfer.length>0){
        armarTranfersCarrito(jsonCarritoEjemplo.tranfer)
    }
}


function armarTranfersCarrito(datos){
    let lista =""
    lista += `
        <hr>
        <div class="main_title">
            <h2>Tus <span>traslados</span> listos</h2>
        </div>
    `
    datos.forEach((element,index) => {
        lista += `
                <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s" id="transf_`+index+`">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 position-relative">
                            <div class="img_list" style="display: flex; justify-content: center; align-items: center; width: 100%;">
                                <img src="`+element.vehiculo.image+`" alt="Image" style="max-width: 100%; object-fit: contain; left:0;">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6" style="overflow-y: auto; max-height: max-content;">
                            <div class="tour_list_desc">
                                <div class="rating">
                                    <small class="voted" style="font-size:15px;">TRANSFER</small>
                                </div>
                                <h3>`+element.vehiculo.label+`</h3>

                                <div class="row">
                                    <div class="col-1">
                                        <i class="icon-bus" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-11">
                                        <span style="font-size: 12px;"><strong>Ruta:</strong></span> 
                                        <span style="font-size: 12px; margin-left:10px;">Traslado desde `+element.transfer.fromZoneName+` hacia `+element.transfer.toZoneName+`</span>
                                    </div>


                                    <div class="col-1">
                                        <i class="icon-calendar" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-11">
                                        <span style="font-size: 12px;"><strong>Fecha:</strong></span> 
                                        <span style="font-size: 12px; margin-left:10px;">`+element.date+`</span>
                                    </div>

                                    <div class="col-1">
                                        <i class="icon-clock" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-11">
                                        <span style="font-size: 12px;"><strong>Hora:</strong></span> 
                                        <span style="font-size: 12px; margin-left:10px;">`+element.time+`</span>
                                    </div>

                                    <div class="col-1">
                                        <i class="icon-users" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-11">
                                        <span style="font-size: 12px;"><strong>Pasajeros:</strong></span> 
                                        <span style="font-size: 12px; margin-left:10px;">`+element.rate.categories[0].quantity+`</span>
                                    </div>
                                
                                    <div class="col-1">
                                        <i class="mdi mdi-seatbelt" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-11">
                                        <span style="font-size: 12px;"><strong>Equipaje:</strong></span> 
                                        <span style="margin-left:10px; font-size:12px;">`+element.vehiculo.places+` Asientos</span>
                                        <span style="margin-left:10px; font-size:12px;">`+element.vehiculo.large_suitcase+` Equipajes facturado</span>
                                        <span style="margin-left:10px; font-size:12px;">`+element.vehiculo.hand_suitcase+` Equipajes de mano</span>                                        
                                    </div>
                                
                                    <div class="col-1">
                                        <i class="icon-cancel-circled" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-11">
                                        <span style="font-size: 12px;"><strong>Cancelación:</strong></span> 
                                        <span style="margin-left:10px; font-size:12px;">Cancelación gratuita hasta `+element.vehiculo.cancellation+` horas antes del inicio del servicio.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2" style="position: relative;">
                            <a href="#" onclick="eliminarItem('transf_`+index+`','`+removerPuntos(element.itemId)+`',0); return false;" style="position: absolute; top: 10px; right: 10px; cursor: pointer;" id="basureroTranf`+index+`">
                                <i class="icon-trash" style="font-size: 24px;"></i>
                            </a>
                            <div class="price_list">
                                <div>
                                    <sup>$</sup><strong><sup>`+(element.vehiculo.prices.USD).toFixed(2)+`</sup></strong>
                                    <small>*Por vehículo</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="formularioTransfers`+index+`" style="display: none">
                        <div class="row mb-3" style="margin-left: 20px; margin-right: 20px;" id="booking`+removerPuntos(element.itemId)+`">
                        </div>
                        <div class="row" style="margin-left: 20px; margin-right: 20px;" id="pasajeros`+removerPuntos(element.itemId)+`">
                        </div>
                    </div>
                </div>
                `
    });
    $("#listaTransfersCarrito").html(lista)


}



function armarActividadesCarrito(datos){
    let lista = ""
    lista += `
        <hr>
        <div class="main_title">
            <h2>Tus <span>actividades</span> listas</h2>
        </div>
    `
    datos.forEach((element,index) => {
        lista += `
            <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s" id="act_`+index+`">
                <div class="row mb-3">
                    <div class="col-lg-4 col-md-4 position-relative"> `
                        if(parseFloat(element.details.minimumPrice) < parseFloat(element.details.originalPrice)){
                            lista += `<div class="ribbon_3"><span>Descuento</span> </div>`
                        }
                        lista +=`
                        <div class="img_list" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%">
                            <img src="`+element.details.photos.header[0].paths.grid+`" alt="Image" style="max-width: 100%; object-fit: cover; left:0;">
                            <div class="short_info">
                                `+tipoActividad(element.details.subcategory)+`
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6" style="overflow-y: auto; max-height: max-content; position: relative; z-index: 1;">
                        <div class="tour_list_desc">
                            `+sacarScore(element.details.score).icono+`
                            <div class="rating">
                                <small class="voted" style="font-size:15px;">ACTIVIDAD</small>
                            </div>
                            <h3><strong>`+element.details.title+`</strong></h3>
                            
                            <div class="row">
                                <div class="col-1">
                                    <i class="icon-calendar" style="font-size:13px; color:#99c21c;"></i>
                                </div>
                                <div class="col-lg-11">
                                    <span style="font-size: 12px;"><strong>Fecha:</strong></span> 
                                    <span style="font-size: 12px;">`+element.date+`</span>
                                </div>`
                                if(element.time){
                                    lista += `
                                        <div class="col-1">
                                            <i class="icon-clock" style="font-size:13px; color:#99c21c;"></i>
                                        </div>
                                        <div class="col-lg-11">
                                            <span style="font-size: 12px;"><strong>Hora:</strong></span> 
                                            <span style="font-size: 12px;">`+element.time+`</span>
                                        </div>
                                    `
                                }
                                if(element.details.address.shortAddress){

                                    lista += `
                                        <div class="col-1">
                                            <i class="icon-location" style="font-size:13px; color:#99c21c;"></i>
                                        </div>
                                        <div class="col-lg-11">
                                            <span style="font-size: 12px;"><strong>Ubicación:</strong></span> 
                                            <span style="font-size: 12px;">
                                                <a href="https://www.google.com/maps?q=`+element.details.address.latitude+`,`+element.details.address.longitude+`" target="_blank" style="writing-mode: horizontal-tb; display: inline; line-height: normal; ">Ver ubicación en el mapa</a>
                                            </span>
                                        </div>
                                    `
                                }
                                lista +=`
                                <div class="col-1">
                                    <i class="icon-th-large-2" style="font-size:13px; color:#99c21c;"></i>
                                </div>
                                <div class="col-lg-11">
                                    <span style="font-size: 12px;"><strong>Tipo:</strong></span> 
                                    <span style="font-size: 12px;">`+element.rate.rate+`</span>
                                </div>`
                                var precioItem = 0
                                element.rate.categories.forEach(cat => {
                                    lista += `
                                    <div class="col-1">
                                        <i class="icon-user" style="font-size:13px; color:#99c21c;"></i>
                                    </div>
                                    <div class="col-lg-11">
                                        <span style="font-size: 12px;"><strong>`+cat.quantity+` `+cat.category+`:</strong></span> 
                                        <span style="font-size: 12px;">$`+parseFloat((cat.totalPrice),10).toFixed(2)+`</span>
                                    </div> `
                                    precioItem = precioItem + parseFloat((cat.totalPrice),10)
                                });
                                element.details.cancelPolicies.forEach(cancelacion => {
                                    
                                    if(cancelacion.penalty == 0 && cancelacion.hours == 0){
                                        lista +=`
                                            <div class="col-1">
                                                <i class="icon-cancel-circled" style="font-size:13px; color:#99c21c;"></i>
                                            </div>
                                            <div class="col-11">
                                                <span style="font-size: 12px;"><strong>Cancelación:</strong></span>
                                                <span style="font-size: 12px;">Cancelación gratuita</span>
                                            </div>
                                            `
                                    }else if(cancelacion.penalty == 100 && cancelacion.hours == 0){
                                        lista +=`
                                            <div class="col-1">
                                                <i class="icon-cancel-circled" style="font-size:13px; color:#99c21c;"></i>
                                            </div>
                                            <div class="col-11">
                                                <span style="font-size: 12px;"><strong>Cancelación:</strong></span>
                                                <span style="font-size: 12px;">No reembolsable</span>
                                            </div>
                                            `
                                    }else if(cancelacion.penalty == 0 && cancelacion.hours != 0){
                                        lista +=`
                                            <div class="col-1">
                                                <i class="icon-cancel-circled" style="font-size:13px; color:#99c21c;"></i>
                                            </div>
                                            <div class="col-11">
                                                <span style="font-size: 12px;"><strong>Cancelación:</strong></span>
                                                <span style="font-size: 12px;">Cancelación gratuita hasta `+cancelacion.hours+` antes de la actividad</span>
                                            </div>
                                            `
                                    }
                                    else{
                                        lista +=`
                                            <div class="col-1">
                                                <i class="icon-cancel-circled" style="font-size:13px; color:#99c21c;"></i>
                                            </div>
                                            <div class="col-11">
                                                <span style="font-size: 12px;"><strong>Cancelación:</strong></span>
                                                <span style="font-size: 12px;">Si se cancela despues de `+cancelacion.hours+` horas, tendra una penalidad del `+cancelacion.penalty+`% del total de la actividad</span>
                                            </div>
                                            `
                                    }
                                });
                                
                                lista +=`

                            </div>
                           
                            
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2" style="position: relative;">
                        <a href="#" onclick="eliminarItem('act_`+index+`','`+removerPuntos(element.itemId)+`',0); return false;" style="position: absolute; top: 10px; right: 10px; cursor: pointer;" id="basureroAct`+index+`">
                               <i class="icon-trash" style="font-size: 24px;"></i>
                        </a>
                        <div class="price_list">
                            <div><sup>$</sup><strong><sup>`+precioItem.toFixed(2)+`</sup></strong>
                                <small>*Total</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    });
    $("#listaActividadesCarrito").html(lista)
}






function llamarHoteles(hoteles){
    let lista = ""
    lista += `
        <hr>
        <div class="main_title">
            <h2>Tus <span>hoteles</span> listos</h2>
        </div>
    `
    $("#listaHotelesCarritos").html(lista)
    hoteles.forEach((element,index) => {
        contruirItemsHoteles(element.hotel, element.ocupantes, index)
    });
}



function llamarVuelos(vuelos){
    let lista = ""
    lista += `
        <hr>
        <div class="main_title">
            <h2>Tus <span>vuelos</span> listos</h2>
        </div>
    `
    lista += armarVuelos(vuelos, 15)
    $("#listaVuelosCarritos").html(lista)
}



async function contruirItemsHoteles(hotel, ocupantes, indiceHotel){
    let lista = ""
        lista += `
            <div class="strip_all_tour_list" id="hotel_`+indiceHotel+`">
                <div class="row">
                    <div class="col-lg-4 col-md-4 position-relative">`
                        if(hotel.exclusiveDeal){
                            lista += `
                            <div class="ribbon_3"><span style="font-size:7px;">`+obtenerExclusiveDeal(hotel.exclusiveDeal)+`</span></div>
                            `
                        }
                        lista += `
                        <div class="img_list">
                            <a href="#"  onclick="cambiarImagen('`+indiceHotel+`' , '`+hotel.code+`'); return false;">
                                `
                                let imagenURL = "img/hoteles/mkv.jpg"; // Imagen por defecto

                                if (hotel.images && hotel.images[0] && hotel.images[0].length > 0) {
                                    let lastImage = hotel.images[0][0];
                                    imagenURL = lastImage; // Espera la verificación de la imagen
                                }
                            
                                lista += `<img id="imagen_hotel_`+indiceHotel+`_`+hotel.code+`" src="${imagenURL}" alt="Image" style="width: 100%; object-fit: cover; left:0;">
                                <div class="short_info">
                                    <i class="pe-7s-camera" style="margin-right: 10px;"></i>Cambiar Fotografía
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6" style="position: relative;">
                        <div class="tour_list_desc">
                            <div class="rating">
                                <small class="voted" style="font-size:15px;">HOTEL</small>
                            </div>
                            <h3><strong>`+hotel.name+`</strong></h3>
                            <br>
                            <div clas="row" style="display: flex;">
                                <div class="col-1">
                                    <i class="icon-location" style="font-size:15px; color:#99c21c;"></i>
                                </div>
                                <div class="col-11" style="display: flex; flex-direction: column;">
                                    <span style="font-size:12px;"><strong>Ubicacion: </strong>`+hotel.destinationName+` / `+hotel.address+` /
                                        <a href="https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}" target="_blank" style="font-size:12px;">
                                            Ver ubicación en el Mapa
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div class="row" style="display: flex;">
                                <div class="col-1">
                                    <i class="icon-calendar" style="font-size:13px; color:#99c21c;"></i>
                                </div>
                                <div class="col-11">
                                    <span style="font-size: 12px;"><strong>Check-in:</strong></span> 
                                    <span style="font-size: 12px;">`+hotel.checkIn+`</span>
                                </div>
                            </div>
                            <div class="row" style="display: flex;">
                                <div class="col-1">
                                    <i class="icon-calendar" style="font-size:13px; color:#99c21c;"></i>
                                </div>
                                <div class="col-11">
                                    <span style="font-size: 12px;"><strong>Check-out:</strong></span> 
                                    <span style="font-size: 12px;">`+hotel.checkOut+`</span>
                                </div>
                            </div> 
                            <div class="row" style="display: flex;">
                                <div class="col-1">
                                    <i class="icon-phone" style="font-size:13px; color:#99c21c;"></i>
                                </div>
                                <div class="col-11">
                                    <span style="font-size: 12px;"><strong>Teléfono:</strong></span> 
                                    <span style="font-size: 12px;">`+hotel.phones[0].phone_number+`</span>
                                </div>
                            </div> 
                            
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2" style="position: relative;">
                        <a href="#" onclick="eliminarItemHotel('`+indiceHotel+`'); return false;" style="position: absolute; top: 10px; right: 10px; cursor: pointer;">
                            <i class="icon-trash" style="font-size: 24px;"></i>
                        </a>
                        <div class="price_list">
                            <div>
                                <sup>$</sup><strong><sup id="precioHotel_`+indiceHotel+`_`+hotel.code+`"></sup></strong>
                                <small>*Total</small>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div>`
                    
                    ocupantes.forEach((aux,auxIndex) => {
                        lista += `
                            <h6 style="font-size:15px;"><strong>`+aux.rooms+` HABITACIÓN(ES) </strong> POR `+aux.adults+` ADULTO(S)`
                                if(aux.children){
                                    lista += ` + `+aux.children+` NIÑO(S) DE `
                                    aux.paxes.forEach(ninos => {
                                        if(ninos.type == "CH"){
                                            lista += ` `+ninos.age+` AÑOS `
                                        }

                                    });
                                }
                                lista += `
                            </h6>                       
                            <div id="rooms_`+indiceHotel+`_`+hotel.code+`_`+armarId(0,aux.rooms,aux.adults, aux.children, aux.paxes)+`">
                            </div>
                            `
                    });
                    lista += `
                    <br>
                </div>
            </div>
        `
        $("#listaHotelesCarritos").append(lista)
        dividirHabitaciones(hotel.rooms, hotel.code, indiceHotel)    
}



function dividirHabitaciones(rooms, codigoHotel, indiceHotel){
    const datos_por_habitacion = dividirPorIdRate(rooms)
    plasmarHabitaciones(datos_por_habitacion, codigoHotel, indiceHotel)
}



function plasmarHabitaciones(habitacionesDivididas,codigoHotel, indiceHotel){
    let lista = ""
    let precioHotel = 0
    habitacionesDivididas.forEach(element => {
        lista = ""
        const datos = obtenerRooms(0,element.rooms)
        precioHotel = precioHotel + parseFloat(datos.precio)
        lista += datos.lista
        $("#rooms_"+indiceHotel+"_"+codigoHotel+"_"+element.id).html(lista)        
    });
    $("#precioHotel_"+indiceHotel+"_"+codigoHotel).html(parseFloat(precioHotel).toFixed(2))
    
}



function avanzar_precios(){
    var url = window.location.origin + "/carritoPrecios"
    window.location.href = url;
}