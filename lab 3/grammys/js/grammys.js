$(document).ready(function(){
    nomineesFunc();
});

$.ajax({
    url: "data/grammys.json",
    type:"GET",
    dataType:"json",
    success: function(data){
        let new_html="";

        for(let i=0; i < data.fields.length; i++){
            new_html += `
                <option value="${data.fields[i].field_id-1}">
                    ${data.fields[i].field}
                </option>
            `;
        }
        $("#category_types").append(new_html);
        nomineesFunc();
    },
    error: function(error_msg){
        console.log(error_msg);
    }
});

function nomineesFunc(){
    $.ajax({
        url: "data/grammys.json",
        type: "GET",
        dataType: "json",
        success: function(data){
            $("#category_types").on("change", function(event){
                let cat_id = $(this).val();

                if(cat_id !== "-1"){
                    let fieldSlc = data.fields[cat_id];
                    let new_html="";
                    new_html += `
                        <h1>${fieldSlc.field}</h2>
                    `;

                    if(fieldSlc.description){
                        new_html += `
                            <p>${fieldSlc.description}</p>
                        `;
                    }

                    for(let i = 0; i < fieldSlc.categories.length; i++){
                        new_html += `
                            <h3>${fieldSlc.categories[i].category_name}</h3><ul>
                        `;
                        for(let j = 0; j < fieldSlc.categories[i].nominees.length; j++){
                            
                            if(fieldSlc.categories[i].winner_id == j){
                                new_html += `
                                    <li><strong class="winner"><img src="icon/trofeo.png">
                                    ${fieldSlc.categories[i].nominees[j].nominee}</strong>

                                `;
                            }else{
                                new_html += `
                                    <li><strong>${fieldSlc.categories[i].nominees[j].nominee}</strong>
                                `;
                            }
                            new_html += `
                                <p>${fieldSlc.categories[i].nominees[j].artist}</p>
                                <p>${fieldSlc.categories[i].nominees[j].info}</p></li>
                            `;
                        }
                        new_html += `</ul>`;
                    }
                    $("#nominees_section").html(new_html);
                }
            });
        },
        error: function(error_msg){
            console.log(error_msg);
        }
    });
}