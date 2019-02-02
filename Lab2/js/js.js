function newElement() {
    var i=0;
    var li = document.createElement("li");
    var inputValue = document.getElementById("newitem").value;
    //var t = document.createTextNode(inputValue);
    li.innerHTML = "<input type='checkbox'><span class='done'>"+inputValue+"</span>";
    //li.appendChild(t);
    if (inputValue === '') {
      alert("Pues escribe algo :v");
    } else {
      document.getElementById("list").appendChild(li);
      //ClickListener(newitem);
      document.getElementById("newitem").value ="";   
    } 
}

function ClickListener(element){
  element.addEventListener("click", function(){
    let elSpan=this.parentElement.getElementsByTagName("SPAN")[0];
    if(elSpan.classList.length == 0){
      elSpan.classList.add("done");
    }else {
      elSpan.classList.remove("done");
    }
  });
}

var input = document.getElementById("newitem");
  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      newElement();
    }
  });