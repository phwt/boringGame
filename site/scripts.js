$(document).ready(function(){

    var saveGame = () => localStorage.boring_data = JSON.stringify(local_save);;
    var loadSave = () => local_save = JSON.parse(localStorage.boring_data);
    var getRate = (i) => buildings[i]['base_speed']*local_save['buildings'][i];
    // newGame();
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
        price = Math.floor(buildings[type]['base_cost'] * Math.pow(1.15, local_save['buildings'][type]));
        if(price <= local_save['balance']){
            local_save['buildings'][type]++;
            local_save['balance'] -= parseInt(price);
            refreshDisplay();
        }
    }

    $("#btn-dig").click(function(){
        local_save['balance']++;
        refreshDisplay();
    });

    function getRateAll(){
        var total = 0;
        for(i in buildings){
            total += Math.ceil(getRate(i));
        }
        return total;
    }

    setInterval(() => {
        var rate = getRateAll();
        local_save['balance'] += rate/0.25;
        $("#kgs_display").text(local_save['balance']);
        $("#rate_display").text(rate);
    }, 250);
});