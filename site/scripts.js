$(document).ready(function(){

    var saveGame = () => localStorage.boring_data = JSON.stringify(local_save);;
    var loadSave = () => local_save = JSON.parse(localStorage.boring_data);

    function newGame(){
        local_save = {
            name: '',
            balance: 0,
            buildings: {}
        }
        for(i in buildings){
            Object.assign(local_save['buildings'], {[i]: 0})
        }
        localStorage.boring_data = JSON.stringify(local_save);
    }

    function showBoxes(){
        $("#bldg-slot-area").empty();
        keys = Object.keys(buildings);
        for(i=0; i < keys.length; i++){
            $("#bldg-slot-area").append(
                "<div class='bldg-slot row no-gutters'>"+
                    "<span class='slot-name' style='display:none'>"+keys[i]+"</span>"+
                    "<div class='col-md-3 text-center'>"+
                        "<img src='assets/"+ buildings[keys[i]]['icon'] +"'/>"+
                    "</div>"+
                    "<div class='col-md-9'>"+
                        "<b>"+ buildings[keys[i]]['name'] +"</b> ["+ local_save['buildings'][keys[i]] +"]<br>"+
                        "<span class='bldg-cost'>"+ 
                        Math.floor(buildings[keys[i]]['base_cost'] * Math.pow(1.15, local_save['buildings'][keys[i]]))+
                        "</span> KG(s)"+
                    "</div>"+
                "</div>"
            );
        }
    }

    function refreshDisplay(){
        $("#kgs_display").text(local_save['balance']);
        showBoxes();
        $(".bldg-slot").click(function(){
            type = $(this).find('.slot-name').text();
            buyBuilding(type);
        });
    }

    window.onunload = function(){saveGame();} //Automatically save game data when user leaves
    if(!localStorage.boring_data){newGame();}else{loadSave();} //If save game does not exist. Create new one.
    refreshDisplay();

    function buyBuilding(type){
        local_save['buildings'][type]++;
        refreshDisplay();
    }

    $("#btn-dig").click(function(){
        local_save['balance']++;
        refreshDisplay();
    });
});