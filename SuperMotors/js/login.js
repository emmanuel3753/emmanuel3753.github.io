$('#login_button').on('click', function(){
    // cargar email y password
    const email = $("#email").val()
    const password = $("#password").val()
    json_to_send = {
      "email": email,
      "password" : password
    };
  
    json_to_send = JSON.stringify(json_to_send);
  
    $.ajax({
      url: 'https://supermotors.herokuapp.com/users/login',
      // url: 'https://tuapp.herokuapp.com/users/login',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie
        //alert("Bienvenido pirru!!");
        //console.log(data.token)
        alert(data.user.name)
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.user.name)
        
        window.location = './modelos.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]));
      }
    });
  })

  

