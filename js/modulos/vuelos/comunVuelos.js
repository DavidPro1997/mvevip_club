var fee_por_persona =  45
function armarCostos(precios, personas){
    let lista = ""
    lista += `
       
            <div class="border p-3 mt-4 mt-lg-0 rounded mb-3">
                <h4 class="header-title mb-3">Resumen de costos</h4>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <tbody>`
                            if(personas.adultos>0 && precios.adults){
                                lista +=`<tr>
                                <td>`+precios.adults.quantity+` Adultos:</td>
                                <td>$`+(precios.adults.fare +  (fee_por_persona*personas.adultos)).toFixed(2)+`</td>
                                </tr>`
                            }
                            if(personas.ninos>0 && precios.children){
                                lista +=`<tr>
                                <td>`+precios.children.quantity+` Niños:</td>
                                <td>$`+(precios.children.fare +  (fee_por_persona*personas.ninos)).toFixed(2)+`</td>
                                </tr>`
                            }
                            if(personas.bebes>0 && precios.infants){
                                lista +=`<tr>
                                <td>`+precios.infants.quantity+` Bebes:</td>
                                <td>$`+(precios.infants.fare +  (fee_por_persona*personas.bebes)).toFixed(2)+`</td>
                                </tr>`
                            }
                            if(personas.viejos>0 && precios.senior){
                                lista +=`<tr>
                                <td>`+precios.senior.quantity+` Ter. Edad:</td>
                                <td>$`+(precios.senior.fare +  (fee_por_persona*personas.viejos)).toFixed(2)+`</td>
                                </tr>`
                            }
                            lista += `
                            <tr>
                                <th><strong>Cargos:<strong></th>
                                <th>$`+(precios.detail.charges).toFixed(2)+`</th>
                            </tr>
                            <tr>
                                <th><strong>Impuestos:<strong></th>
                                <th>$`+(precios.taxes).toFixed(2)+`</th>
                            </tr>
                            <tr>
                                <th><strong>Total:<strong></th>
                                <th>$`+actualizarFeePrecios(personas, precios).toFixed(2)+`</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- end table-responsive -->
            </div>
        
    `
    return lista
    
}




function revisarEquipajes(equipaje){
    let equiBodega = 0
    let equiMano = 0
    let equiPersonal = 0
    let lista = ""
    equipaje.forEach(element => {
        if(element.type == 'CHECKED_BAGGAGE' && element.quantity > 0){
            equiBodega = element.quantity
        }
        if(element.type == 'CARRY_ON' && element.quantity > 0){
            equiMano = element.quantity
        }
        if(element.type == 'PERSONAL_ITEM' && element.quantity > 0){
            equiPersonal = element.quantity
        }
    });


    if(equiBodega > 0){
        lista +=`
                <div class="tooltip_styled tooltip-effect-1">
                    <span class="tooltip-item"><i class="mdi mdi-bag-suitcase" style="font-size: 24px; color: var(--color-primario);"></i></span>
                    <div class="tooltip-content">
                        Si se incluye equipaje de bodega o facturado.
                    </div>
                </div>
                `
    }else{
        lista +=`
                <div class="tooltip_styled tooltip-effect-1">
                    <span class="tooltip-item"><i class="mdi mdi-bag-suitcase-off" style="font-size: 24px;"></i></span>
                    <div class="tooltip-content">
                        No se incluye equipaje de bodega o facturado.
                    </div>
                </div>
                `
    }
    if(equiMano > 0){
        lista +=`
                <div class="tooltip_styled tooltip-effect-1">
                    <span class="tooltip-item"><i class="mdi mdi-bag-carry-on" style="font-size: 24px; color: var(--color-primario);"></i></span>
                    <div class="tooltip-content">
                        Si se incluye equipaje de mano.
                    </div>
                </div>
                `
    }else{
        lista +=`
                <div class="tooltip_styled tooltip-effect-1">
                    <span class="tooltip-item"><i class="mdi mdi-bag-carry-on-off" style="font-size: 24px;"></i></span>
                    <div class="tooltip-content">
                        No se incluye equipaje de mano.
                    </div>
                </div>
                `
    }
    if(equiPersonal > 0){
        lista +=`
                <div class="tooltip_styled tooltip-effect-1">
                    <span class="tooltip-item"><i class="mdi mdi-bag-personal" style="font-size: 24px; color: var(--color-primario);"></i></span>
                    <div class="tooltip-content">
                        Si se incluye equipaje de personal.
                    </div>
                </div>
               `
    }else{
        lista +=`
                <div class="tooltip_styled tooltip-effect-1">
                    <span class="tooltip-item"><i class="mdi mdi-bag-personal-off" style="font-size: 24px;"></i></span>
                    <div class="tooltip-content">
                        No se incluye equipaje de personal.
                    </div>
                </div>   
                `
    }
    return lista
}






function armarDetalleEscala(escalas, fuente){
    let columnas = {primera: "",segunda: "",tercera: "",cuarta: ""}
    if(fuente == 0){
        columnas.primera = "col-2"
        columnas.segunda = "col-4"
        columnas.tercera = "col-2"
        columnas.cuarta = "col-4"
    }else if(fuente == 1){
        columnas.primera = "col-12"
        columnas.segunda = "col-12"
        columnas.tercera = "col-12"
        columnas.cuarta = "col-12"
    }
    let lista = ""
    escalas.forEach((element,aux) => {
        lista +=`
        <hr style="margin:0;">
        <div class="row" >
            <div class="`+columnas.primera+`" style="text-align: center; justify-content: center; display: flex; flex-direction: column;">
                <span style="font-size:12px;"><strong>`+element.cabin_type.name+`</strong></span>
                <span style="font-size:12px;"><strong>N°: `+element.flight_number+`</strong></span>
            </div>
            <div class="`+columnas.segunda+`" style="text-align: center; justify-content: center; display: flex; flex-direction: column;">
                <span style="font-size:12px;"><strong>`+element.departure_time+`</strong></span>
                <span style="font-size:12px;">`+element.origin.code+`, `+element.origin.name+`</span>
            </div>
            <div class="`+columnas.tercera+`" style="text-align: center; justify-content: center; display: flex; flex-direction: column;">
                <i class="icon-plane" style="transform: rotate(90deg); margin-right: 10px; font-size: 30px;"></i>
                <span style="font-size:12px;">`+formatoHora(element.duration)+`</span>
            </div>
            <div class="`+columnas.cuarta+`" style="text-align: center; justify-content: center; display: flex; flex-direction: column;">
                <span style="font-size:12px;"><strong>`+element.arrival_time+`</strong></span>
                <span style="font-size:12px;">`+element.destination.code+`, `+element.destination.name+`</span>
            </div>
        </div>
        <hr style="margin:0;">`
        if(escalas[aux+1]){
            lista +=` 
                <div class="row" style="background-color:#f9f9f9">
                    <div class="col-12" style="text-align: center; justify-content: center;">
                        <i class="icon-clock" style="margin-right: 10px; font-size: 30px;"></i>
                        <span style="font-size:12px;">Escala `+escalas[aux].destination.code+`: `+formatoHora(calcularTiempoEscala(escalas[aux], escalas[aux+1]))+`</span>
                    </div>
                </div>
            `
        }    
    });
    return lista
    
}

function calcularTiempoEscala(vuelo1, vuelo2){
    var horaSalida = vuelo2.departure_time;
    var fechaSalida = vuelo2.departure_date;
    var horaLlegada = vuelo1.arrival_time;
    var fechaLlegada = vuelo1.arrival_date;
    var duracionEscala = calculateTimeDifference(fechaLlegada, horaLlegada, fechaSalida, horaSalida)
    return duracionEscala
}



function calculateTimeDifference(fecha1, hora1, fecha2, hora2) {
    const dateTime1 = new Date(`${fecha1}T${hora1}:00`);
    const dateTime2 = new Date(`${fecha2}T${hora2}:00`);
    const diffInMs = Math.abs(dateTime2 - dateTime1);
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const formattedTimeDifference = `${diffInHours}:${diffInMinutes.toString().padStart(2, '0')}`;
    return formattedTimeDifference;
}


function armarVuelos(vuelos, buscador, personas, aux){
    let lista = ""
    vuelos.forEach((element,index) => {
        lista += `
            <div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s">
                
                    <a href="#sidebarTickets`+index+`" data-bs-toggle="collapse" style="color: inherit;" id="vuelo`+index+`"> 
                        <div class="row my-1 mx-1">
                            <div class="col-4 d-flex align-items-center flex-wrap">
                                <img src="`+sacarLogoAereolina(element.validating_carrier.code)+`" style=" margin-right: 15px;" alt="" height="30" width="30">
                                <small class="small-text" style="font-size: 1rem; align-items: center; display: flex;">`+resumenNombreAereolina(element.validating_carrier.name)+`</small>
                            </div>
                            <div class="col-4" style="display:flex; align-items:center; justify-content:center; flex-direction:column;">
                                <span>`+buscador.salida+`-`+buscador.destino+`</span>
                                <span>`+buscador.destino+`-`+buscador.salida+`</span>
                            </div>
                            <div class="col-4" style="text-align:end;">
                                <span><strong>$`+actualizarFeePrecios(personas, element.price).toFixed(2)+` USD </strong></span><br>
                                <small class="small-text" style="font-size: 0.8rem;">Ida y vuelta </small> 
                            </div>
                        </div>
                    </a>
                    <div class="collapse show mt-3" id="sidebarTickets`+index+`">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="row mx-2">
                                    <div class="col-12" style="display: flex; align-items: center;">
                                        <i class="icon-plane" style="transform: rotate(45deg); margin-right: 10px; font-size: 20px;"></i>
                                        <h5 style="margin-right: 20px; font-size: 16px;">IDA</h5>
                                        <h5 style="font-size: 16px;"> `+buscador.fechaSalida+`</h5>
                                    </div>
                                </div>
                                `+armarDetalleVuelo(0,element.segments, buscador, index)+`
                                <br>
                                <div class="row">
                                    <div class="col-12" style="display: flex; align-items: center;">
                                        <i class="icon-plane" style="transform: rotate(315deg); margin-right: 10px; font-size: 20px;"></i>
                                        <h5 style="margin-right: 20px; font-size: 16px;">VUELTA</h5>
                                        <h5 style="font-size: 16px;"> `+buscador.fechaRetorno+`</h5>
                                    </div>
                                </div>
                                `+armarDetalleVuelo(1,element.segments, buscador, index)+`
                            </div>
                            <div class="col-md-4" style="padding:30px;">
                                `+armarCostos(element.price,personas)+`
                                `
                                if(aux){
                                    lista += `
                                        <div class="row my-2">
                                            <div class="col-12" style="align-items: center; display: flex; justify-content: center;">
                                                <button class="btn_1 green" style="background-color: var(--color-primario);" onclick="reservar(`+index+`)"><i class="icon-search"></i>Reservar</button>
                                            </div>
                                        </div> 
                                    `
                                }
                                lista += `
                            </div>
                        </div>
                    </div>
                
            </div>
        `
    });
    return lista 
}


function resumenNombreAereolina(str) {
    let match = str.match(/^[\w]+(?=[\s\-_,]|$)/);
    return match ? match[0] : '';
}


function armarDetalleVuelo(tipo, datos, buscador, index){
    let lista =""
    datos[tipo].options.forEach((element,indice) => {
        lista +=`
                <hr style="margin-top: 0; margin-bottom: 0;">
                <div class="row mx-1" style="align-items: center;">
                    <div class="col-lg-1">
                        <input type="radio" id="`+index+`_`+tipo+`" name="customRadio`+index+`_`+tipo+`" value="`+element.id+`" class="form-check-input" style="transform: scale(1.5);" `
                        if(indice == 0){
                            lista +=`checked>`
                        }else{
                            lista += `>`
                        }
                        lista +=`
                    </div>
                    <div class="col-lg-4">
                        <span>
                            `+datos[tipo].origin.code+`: <strong>`+element.departure_time+`</strong>
                            <i class="icon-left" style="font-size: 22px;"></i>
                            `+datos[tipo].destination.code+`: <strong>`+element.arrival_time+`</strong>`
                            if(element.departure_date != element.arrival_date){
                                lista += `<span style="color: var(--color-primario);"> <strong>+1</strong></span>`
                            }
                            lista += ` 
                        </span>
                    </div>
                    <div class="col-lg-2 col-3">
                        <span><strong>`+formatoHora(element.duration)+`</strong></span>
                    </div>
                    <div class="col-lg-3 col-4">`
                        if(element.legs.length - 1 == 0){
                            lista += `<span>Directo</span>`
                        }
                        else{
                            lista += `<span>`+(element.legs.length-1)+` Escala(s)</span>`
                        }
                        lista +=`
                    </div>
                    <div class="col-lg-1 col-3 d-flex align-items-center justify-content-center">
                        `+revisarEquipajes(element.baggage_allowances)+`
                    </div>
                    <div class="col-lg-1 col-2" style="text-align: end;">`
                        if(element.legs.length - 1 > 0){
                            lista += `
                            <a href="#sidebarTickets`+index+`_`+tipo+`_`+indice+`" data-bs-toggle="collapse">
                                <i class="icon-down-open" style="font-size: 22px;"></i>
                            </a>`
                            
                        }
                        lista +=`
                    </div> `
                    if(element.legs.length - 1 > 0){
                        lista += `
                        <div class="collapse" id="sidebarTickets`+index+`_`+tipo+`_`+indice+`"> 
                            `+armarDetalleEscala(element.legs,0)+`
                        </div>`
                        
                    }
                    lista +=`
                    <hr style="font-size: 16px;">
                </div>
            `
    });
    return lista
}


function sacarLogoAereolina(code){
    let lista = ""
    if(code == 'CM'){
        lista = "img/aereolinas_logos/copa.png"
    }
    else if(code == 'DL'){
        lista ="img/aereolinas_logos/delta.png"
    }
    else if(code == 'AV' || code == '2K'){
        lista = "img/aereolinas_logos/avianca.png"
    }
    else if(code == 'B6'){
        lista = "img/aereolinas_logos/jet.png"
    }
    else if(code == 'LA'){
        lista = "img/aereolinas_logos/latam.jpg"
    }
    else if(code == 'AA'){
        lista = "img/aereolinas_logos/american.png"
    }
    else if(code == 'IB'){
        lista = "img/aereolinas_logos/iberia.png"
    }
    else{
        lista = "img/aereolinas_logos/mkv.png"
    }
    return lista
}



function formatoHora(hora) {
    let [horas, minutos] = hora.split(':');
    horas = parseInt(horas, 10);
    return `${horas}h: ${minutos}m`;
}


function actualizarFeePrecios(personas, precios){
    let contador = 0
    if(personas.adultos>0 && precios.adults){
        contador = contador + precios.adults.quantity
    }
    if(personas.ninos>0 && precios.children){
        contador = contador + precios.children.quantity
    }
    if(personas.bebes>0 && precios.infants){
        contador = contador + precios.infants.quantity
    }
    if(personas.viejos>0 && precios.senior){
        contador = contador + precios.senior.quantity
    }
    return precios.total+(contador*fee_por_persona)
}