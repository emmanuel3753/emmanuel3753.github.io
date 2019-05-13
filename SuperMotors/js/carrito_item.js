var token = localStorage.getItem('token');
var modelosJson;
var cantidad = 0;
var productos;
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
function btn_cont(){
    alert('Tu solicitud se mandó')
}
function quitarDelCarrito(id){
    var carrito_id= '';
    for(var i = 0;i<productos.length;i++){
        if(id == productos[i].item){
            carrito_id = productos[i]._id;
        }
    }
    console.log(carrito_id)

    $.ajax({
        url: 'https://supermotors.herokuapp.com/cart/' + carrito_id,
        // url: 'https://tuapp.herokuapp.com/todos',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        dataType: 'json',
        //data: json_to_send,
        success: function(data){
            
            window.location = './contactanos.html'
            
        },
        error: function(error_msg) {
          alert((error_msg['responseText']));
        }
      });
    
}

function infoTemplate(producto) {
    var index;
    
	for (var i = 0; i<15;i++ ){
        if (modelosJson[i].id == producto.item ){
            index = i;
            cantidad = cantidad + modelosJson[i].precio
        }
    }
		
    return `
        
                    <div class = "grid-container">
                        <div>
                            <img class="panigale"src= ${modelosJson[index].imagen} atl="Moto1" style="width: 588px;height: 350px;" >
                        </div>
                        <div>
                            <p class="marca">${modelosJson[index].modelo} (${modelosJson[index].marca})</p>
                            <p class="specs">Caracteristicas: ${modelosJson[index].specs}</p>
                            <p class="precio">Precio: $${modelosJson[index].precio}</p>
                            <button class="btn-quitar" type="button" onclick="quitarDelCarrito(${modelosJson[index].id})">Quilar del carrito</button>
                            
                        </div>
                    </div> 
                    <hr class="linea-header"></hr>
	`
	
}
function helper(){
    $.ajax({
        url: 'https://supermotors.herokuapp.com/cart',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'GET',
        dataType: 'json',
        //data: json_to_send,
      
        success: function(data) {
                productos = data;
                let new_html = "";
    
                let num = 0;
                for (i = 0; i < data.length; i++)  {
                    num++;
                }
                new_html += `
                    
                    <h1 class="headCarrito">Se encontr${num == 1 ? "o" : "aron"} ${num} resultado${num == 1 ? "" : "s"}</h1>
                    	
                    ${data.map(infoTemplate).join("")}
                    <h1>Total: $${cantidad} </h1>
                    <button class="btn-agregar" type="button" onclick=btn_cont()>Continuar Compra</button>
                `;
    
                $("#carrito_section").append(new_html);
        }
    })
}
 

$.ajax({
    url: 'https://supermotors.herokuapp.com/motos',
    type : "GET",

    dataType : "json",
  
    success: function(data) {
        modelosJson = data;
        helper()
    }
})