var name = localStorage.getItem('name');
let new_html = "";
if(localStorage.getItem('name') != null){
    $('.btn-log').hide()
    $('.btn-registro').hide()
    $('.btn_logout').show()
    
    new_html = `<p>Bienvenido: ${localStorage.getItem('name')} </p>
    
    `
}else{
    $('.btn-log').show()
    $('.btn-registro').show()
    $('.btn_logout').hide()
    new_html = `<p>Bienvenido!!!!!!</p>`
}

document.getElementById("userName").innerHTML = new_html;



