function recibirInformacion(){
    let params = new URLSearchParams(window.location.search);
    let idBanco = params.get('idBanco'); 
    if(idBanco){
        consultarBanco(idBanco)
    }
    else{
        console.log("No se pudo extraer los datos")
    }
}


function consultarBanco(idBanco){
    Obtener_API(null, 'website/bancos/'+idBanco, datos => {
        if (datos.estado) {
            llenarHeader(datos.consulta)
            llenarCampanas(datos.consulta)
        }
        else{
            
        }
    })
}


function llenarHeader(datos){
    let lista = ""
    lista += `

            <section class="parallax-window" data-parallax="scroll" data-image-src="img/bancos/banco_`+datos.idBanco+`/header_`+datos.idBanco+`.jpg" data-natural-width="1400" data-natural-height="470" style="background-image: url('img/bancos/banco_`+datos.idBanco+`/header_`+datos.idBanco+`.jpg'); background-position: center; background-repeat:no-repeat; background-size: cover;">
            
            </section>

        
    `
    $("#headerBancoUnico").html(lista)
    
{/* <section class="parallax-window" data-parallax="scroll" data-image-src="img/bancos/banco_`+datos.idBanco+`/header_`+datos.idBanco+`.jpg" data-natural-width="1400" data-natural-height="470" style="background-image: url('img/bancos/banco_`+datos.idBanco+`/header_`+datos.idBanco+`.jpg'); background-position: center; background-repeat:no-repeat; background-size: cover;">
            
            </section> */}
    // colocar esto para la mascara que opaca
    // <div class="parallax-content-1 opacity-mask" style ="background-color: rgba(0, 0, 0, 0.4);">
                
    //         </div>
}



function llenarCampanas(datos){
    let lista = ""

    lista += `
        <div class="main_title">
            <h2>BENEFICIOS<span> `+datos.nombre+`</span></h2>
            <p>
                Sorpréndete con lo que Marketing Vip y tu banco tienen preparado para ti.
            </p>
        </div>


        <hr>
			<div class="row justify-content-between">

               

                <!-- <div class="col-lg-5 col-md-5">
                    <div class="box_style_2 d-none d-sm-block fijo" style="margin-top: 13px;">
                        <h3>Aprovecha <span>nuestra alianza</span></h3>
                        <p style="text-align: justify;">
                            `+datos.descripcion+`					
                        </p>
                        <h3>Compruébalo <span>tu mismo</span></h3>
                        <p style="text-align: justify;">
                            No te quedes con la duda, descubre todos los beneficios que tenemos para ti con nuestro banco aliado. Haz clic en el siguiente enlace y compruébalo tú mismo:
                            <br><br><a href="`+datos.link+`" target="_blank">Web `+datos.nombre+`</a>                               
                        </p>
                        <div class="general_icons">
                            <ul>
                                <li><i class="icon_set_2_icon-109"></i></li>
                                <li><i class="icon_set_1_icon-35"></i></li>
                                <li><i class="icon_set_1_icon-33"></i></li>
                                <li><i class="icon_set_1_icon-30"></i></li>
                                <li><i class="icon_set_2_icon-102"></i></li>
                            </ul>
                        </div>
                    </div>
				</div>-->


				<div class="col-lg-12 col-md-12 mb-4 mt-4">
                    `
                    for (let i = 0; i < datos.numImagenes; i++) {
                        lista += `
                            <img src="img/bancos/banco_`+datos.idBanco+`/campanas/`+(i+1)+`.jpg" alt="Banco" class="img-fluid styled">
                            `
                    }
                    lista += `
				</div>
                

                 <div class="col-lg-4 col-md-4 mt-4" style="text-align:center;">
                    <button class="btn" onclick="activarBeneficio('`+datos.nombre+`');" style="background-color:var(--color-primario); color: white;"><i class="icon-lock-open"></i> Activar Beneficio</button>
				</div>
                <div class="col-lg-4 col-md-4 mt-4" style="text-align:center;">
                    <button class="btn" onclick="verBeneficio('`+datos.link+`');" style="background-color:var(--color-primario); color: white;"><i class="icon-up-hand"></i> Ver Beneficio</button>
				</div>
                <div class="col-lg-4 col-md-4 mt-4" style="text-align:center;">
                    <div class="spinner-border m-2" role="status" style="display: none; color:var(--color-primario);" id="spinnerCatBanco"></div>
                    <button class="btn" id="boton_descargar_banco" onclick="descargarBeneficio('`+datos.idBanco+`');" style="background-color:var(--color-primario); color: white;"><i class="icon-download-3"></i> Descargar Catálogo</button>   
				</div>


			</div>

    `
    
    $("#infoCampanas").html(lista)
}


function activarBeneficio(banco){
    const mensaje = "Hola, he visto que cuentan con un beneficio exclusivo con "+banco+" y estoy interesado en acceder a él. ¿Podrían brindarme más información sobre los requisitos y el proceso para aprovechar esta ventaja?"
    abrirChatWhatsApp(mensaje)
}

function verBeneficio(url){
    window.open(url, '_blank');
}

function descargarBeneficio(idBanco){
    $("#spinnerCatBanco").show()
    $("#boton_descargar_banco").hide()
    rutaPDF = `img/bancos/banco_`+idBanco+`/banco_`+idBanco+`.pdf`
    descargarPDF(rutaPDF)
}


async function descargarPDF(ruta) {
    try {
        const response = await fetch(ruta);
        if (!response.ok) throw new Error('Error al descargar el archivo.');

        const blob = await response.blob();
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = ruta.split('/').pop(); // Nombre del archivo desde la ruta
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove(); // Elimina el enlace temporal
        URL.revokeObjectURL(enlace.href); // Limpia el URL objeto
        $("#spinnerCatBanco").hide()
        $("#boton_descargar_banco").show()

    } catch (error) {
        $("#boton_descargar_banco").show()
        $("#spinnerCatBanco").hide()
        mensajeUsuario("info","Información","Aún no hay catálogo cargado")

    }
}