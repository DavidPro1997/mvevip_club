


function consultarBancosNosotros(){
    Obtener_API(null, 'website/bancos', datos => {
        if (datos.estado) {
            const lista = llenarBancos(datos.consulta, 3)
            $("#listaBancosNosotros").html(lista)
        }
    })
}


function consultarComentarios(){
    Obtener_API(null, 'website/ver-comentarios', datos => {
        if (datos.genera.consulta.estado) {
            armarComentarios(datos.genera.consulta.datos.result.reviews)
        }
    })
}


function armarComentarios(reviews){
    let lista = ""
    reviews.forEach(element => {
        if(element.rating == 5){
            lista += `
            <div class="col-md-6">
                <div class="review_strip_single">
                    <img src="`+element.profile_photo_url+`" alt="Image" class="rounded-circle" style="height:75px; width:auto;">
                    <small> - `+element.relative_time_description+` -</small>
                    <h4>`+element.author_name+`</h4>
                    <p style="text-align: justify;">
                        "`+element.text+`"
                    </p>
                    <div class="rating">
                        `+obtenerPuntacion(element.rating).icono+`
                    </div>
                </div>
            </div>
        `
        }
    });
    $("#listaComentarios").html(lista)
    
}
