$(document).ready(function(){

    var saveGame = () => localStorage.boring_data = JSON.stringify(local_save);;
    var loadSave = () => local_save = JSON.parse(localStorage.boring_data);
    var getRate = (i) => buildings[i]['base_speed']*local_save['buildings'][i];
    var numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // newGame();
    function newGame(){
        local_save = {
            name: '',
            balance: 0,
            buildings: {},
            upgrades: {}
        }
        for(i in buildings){
            Object.assign(local_save['buildings'], {[i]: 0})
        }
        for(i in upgrades){
            Object.assign(local_save['upgrades'], {[i]: 0})
        }
        localStorage.boring_data = JSON.stringify(local_save);
    }

    function showBoxes(){
        $("#bldg-slot-area").empty();
        keys = Object.keys(buildings);
        toBreak = 0;
        for(i=0; i < keys.length; i++){
            icon = buildings[keys[i]]['icon'];
            name = (toBreak == 1) ? "???????" : buildings[keys[i]]['name'];
            amount = local_save['buildings'][keys[i]];
            cost = Math.floor(buildings[keys[i]]['base_cost'] * Math.pow(1.15, amount));
            disabled = cost > local_save['balance'];

            if(toBreak == 2){break;}
            if(amount==0){toBreak++;}

            $("#bldg-slot-area").append(
                "<div class='slot bldg-slot row no-gutters'"+
                    // "disabled='"+ ((disabled) ? "true" : "false") +
                    "' slot-name='" + keys[i] + "'>"+
                    "<div class='col-md-3 text-center'>"+
                        "<img src='assets/"+ icon +"'/>"+
                    "</div>"+
                    "<div class='col-md-9'>"+
                        "<b>"+ name +"</b> ["+ amount +"]<br>"+
                        "<span class='bldg-cost'>"+ cost + "</span> KG(s)"+
                    "</div>"+
                "</div>"
            );
        }
        refreshSlot();
    }

    function showBoxesU(){
        $("#upgrade-slot-area").empty();
        keys = Object.keys(upgrades);
        for(i=0; i < keys.length; i++){

            if(local_save['upgrades'][keys[i]]){continue;}

            icon = upgrades[keys[i]]['icon'];
            name = upgrades[keys[i]]['name'];
            cost = upgrades[keys[i]]['cost'];
            disabled = cost > local_save['balance'];

            $("#upgrade-slot-area").append(
                "<div class='slot upgrade-slot row no-gutters'"+
                    //"disabled='"+ ((disabled) ? "true" : "false") +
                    "' slot-name='" + keys[i] + "'>"+
                    "<div class='col-md-3 text-center'>"+
                        "<img src='assets/"+ icon +"'/>"+
                    "</div>"+
                    "<div class='col-md-9'>"+
                        "<b>"+ name +"</b><br>"+
                        "<span class='upgrade-cost'>"+ cost + "</span> KG(s)"+
                    "</div>"+
                "</div>"
            );
        }
    }

    function refreshDisplay(){
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        showBoxes();
        showBoxesU();
        $(".slot").click(function(){
            type = $(this).attr('slot-name');
            if($(this).hasClass('bldg-slot')){
                slot = 'bldg';
            }else{
                slot = 'upgr';
            }
            buyBuilding(type, slot);
        });
        $("#rate_display").text(numberWithCommas(getRateAll()));
    }

    function refreshSlot(){
        $(".slot").each(function(index){
            type = $(this).attr('slot-name');
            if($(this).hasClass('bldg-slot')){
                cost = Math.floor(buildings[type]['base_cost'] * Math.pow(1.15, amount));    
            }else{
                cost = upgrades[type]['cost'];
            }
            disabled = cost > local_save['balance'];
            if(disabled){
                $(this).attr("disabled", "");
            }else{
                $(this).removeAttr("disabled");
            }
        });
    }

    window.onunload = function(){saveGame();} //Automatically save game data when user leaves
    if(!localStorage.boring_data){newGame();}else{loadSave();} //If save game does not exist. Create new one.
    refreshDisplay();

    function buyBuilding(type, slot){
        if(slot == 'bldg')
            cost = Math.floor(buildings[type]['base_cost'] * Math.pow(1.15, local_save['buildings'][type]));
        else
            cost = upgrades[type]['cost'];

        if(cost <= local_save['balance']){
            local_save[(slot == 'bldg') ? 'buildings' : 'upgrades'][type]++;
            local_save['balance'] -= parseInt(cost);
            refreshDisplay();
        }
        $("#rate_display").text(numberWithCommas(getRateAll()));
    }

    $("#btn-dig").click(function(){
        // var total = 0;
        // for(i in local_save['upgrades']){
            // total += Math.ceil(getRate(i));
        // }
        local_save['balance']++;
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        // refreshDisplay();
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
        local_save['balance'] += Math.ceil(rate*0.1);
        // refreshDisplay();
        refreshSlot();
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        $("#rate_display").text(numberWithCommas(rate));
    }, 100);
});