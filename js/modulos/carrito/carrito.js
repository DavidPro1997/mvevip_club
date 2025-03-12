function consultarCarrito(){
    if(jsonCarritoEjemplo.vuelos.length>0){
        llamarVuelos(jsonCarritoEjemplo.vuelos)
    }
    if(jsonCarritoEjemplo.hoteles.length>0){
        llamarHoteles(jsonCarritoEjemplo.hoteles)
    }
    if(1==0){

    }
}



function llamarHoteles(hoteles){
    let lista = ""
    lista += `
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