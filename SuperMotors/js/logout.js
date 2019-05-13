var token = localStorage.getItem('token')
    if (token) {
        token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
    }

$('#logout_btn').on('click', function(){
    // cargar email y password
    localStorage.removeItem('name')
  
    console.log('Bearer  ' + token)

    $.ajax({
      url: 'https://supermotors.herokuapp.com/users/logout',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      success: function(){
        
        alert("Bye For ever")
        console.log("Saliste de la secion")
        window.location = './index.html'
        
      },
      error: function(error_msg) {
        alert("error!")
        console.log(error_msg)
        alert((error_msg["responseText"]));
      }
    });
  })