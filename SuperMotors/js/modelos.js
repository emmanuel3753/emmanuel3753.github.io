var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

function agregaCarrito(id) {
	// agregar a mongo (como /todo)

			json_to_send = {
				"item" : id
			};
			json_to_send = JSON.stringify(json_to_send);

			$.ajax({
				url: 'https://supermotors.herokuapp.com/cart',
				headers: {
						'Content-Type':'application/json',
						'Authorization': 'Bearer ' + token
				},
				method: 'POST',
				dataType: 'json',
				data: json_to_send,
				success: function(data){
					//addTodo(data.id, data.todoText, data.completed)

					console.log(data)
					
				},
				error: function(error_msg) {
					alert((error_msg['responseText']));
				}
			});	
}

function infoTemplate(modelo) {
	if (modelo.tipo == "moto"){
		var specs = modelo.specs
	return `
	<div class="grid-item">
		<div class="flip-card">
			<div class="flip-card-inner">
				<div class="flip-card-front">
					<img class="panigale"src= ${modelo.imagen} atl="Moto1" style="width: 588px;height: 350px;" >
				</div>	
				<div class="flip-card-back">
					<p class="marca">${modelo.modelo} (${modelo.marca})</p>
					<p class="specs">Caracteristicas: ${modelo.specs}</p>
					<p class="precio">Precio: $${modelo.precio}</p>
					<button class="btn-agregar" type="button" onclick="agregaCarrito(${modelo.id})">Agregar al carrito</button>
				</div>
			</div>
		</div>
	</div>
	`
	} else return ""
}

 $.ajax({
    url: 'https://supermotors.herokuapp.com/motos',
    type : "GET",

    dataType : "json",
  
    success: function(data) {
			let new_html = "";

		
			let num = 0;
			for (i = 0; i < data.length; i++)  {
				data[i].tipo == "moto" ? num++ : num;
			}
			new_html += `
					
				<h1>Se encontr${num == 1 ? "o" : "aron"} ${num} resultado${num == 1 ? "" : "s"}</h1>	
				<div class = "grid-container">
						${data.map(infoTemplate).join("")}
				<div>
			`;

			$("#model_section").append(new_html);
    }
})
