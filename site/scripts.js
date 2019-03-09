$(document).ready(function(){

    function savegame(){
        localStorage.boring_data = JSON.stringify(local_save);
    }

    function newGame(){
        local_save = {
            name: '',
            balance: 0,
            buildings: {}
        }
        for(i in buildings){
            Object.assign(local_save['buildings'], {[i]: 0})
        }
        console.log(JSON.stringify(local_save));
        localStorage.boring_data = JSON.stringify(local_save);
    }

    function loadSave(){
        local_save = JSON.parse(localStorage.boring_data);
    }

    window.onunload = function(){savegame();} //Automatically save game data when user leaves

    if(!localStorage.boring_data){newgame();}else{loadSave();} //If save game does not exist. Create new one.

    // var local_save = localStorage.boring_data;
    $("#kgs_display").text(local_save['balance']);

    $("#btn-dig").click(function(){
        local_save['balance']++;
        $("#kgs_display").text(local_save['balance']);
    });

    keys = Object.keys(buildings);
    for(i=0; i < keys.length; i++){
        $("#bldg-slot-area").append(
            "<div class='bldg-slot row no-gutters'>"+
                "<div class='col-md-3 text-center'>"+
                    "<img src='assets/"+ buildings[keys[i]]['icon'] +"'/>"+
                "</div>"+
                "<div class='col-md-9'>"+
                    "<b>"+ buildings[keys[i]]['name'] +"</b><br>"+
                    "<span class='bldg-cost'>00000</span> KG(s)"+
                "</div>"+
            "</div>"
        );
    }
});