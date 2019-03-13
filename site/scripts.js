$(document).ready(function(){

    var saveGame = () => localStorage.boring_data = JSON.stringify(local_save);;
    var loadSave = () => local_save = JSON.parse(localStorage.boring_data);
    var getRate = (i) => (buildings[i]['base_speed'] * getUpgradeLevel(i)) * local_save['buildings'][i];
    var numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // newGame();
    function newGame(){
        local_save = {
            name: '',
            balance: 0,
            buildings: {},
            upgrades: {}
        }
        for(i in buildings){Object.assign(local_save['buildings'], {[i]: 0})}
        for(i in upgrades){Object.assign(local_save['upgrades'], {[i]: 0})}
        localStorage.boring_data = JSON.stringify(local_save);
    }

    window.onunload = function(){saveGame();} //Automatically save game data when user leaves
    if(!localStorage.boring_data){newGame();}else{loadSave();} //If save game does not exist. Create new one.
    refreshDisplay();

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
                "<div style='position: relative' class='slot bldg-slot row no-gutters' slot-name='" + keys[i] + "'>"+
                    "<span class='slot-number'>"+amount+"</span>"+
                    "<div class='col-md-3 text-center'>"+
                        "<img src='assets/"+ icon +"'/>"+
                    "</div>"+
                    "<div class='col-md-9 slot-cost'>"+
                        "<b>"+ name +"</b><br>"+
                        "<span class='bldg-cost'>"+ cost + "</span> MW(s)"+
                    "</div>"+
                "</div>"
            );
        }

        $("#upgrade-slot-area").empty();
        keys = Object.keys(upgrades);
        for(i=0; i < keys.length; i++){
            var upgrade_sel = upgrades[keys[i]];

            oftype = parseInt(keys[i][keys[i].length - 1]) - 1;
            prev = keys[i].substring(0, keys[i].length - 1) + oftype;

            if(
                local_save['upgrades'][keys[i]] || 
                !local_save['buildings'][upgrade_sel['tgt_bldg']] ||
                !local_save['upgrades'][prev] && oftype 
            ){continue;}

            icon = upgrade_sel['icon'];
            name = upgrade_sel['name'];
            cost = upgrade_sel['cost'];
            disabled = cost > local_save['balance'];

            $("#upgrade-slot-area").append(
                "<div class='slot upgrade-slot row no-gutters' slot-name='" + keys[i] + "'>"+
                    "<div class='col-md-3 text-center'>"+
                        "<img src='assets/"+ icon +"'/>"+
                    "</div>"+
                    "<div class='col-md-9 slot-cost'>"+
                        "<b>"+ name +"</b><br>"+
                        "<span class='upgrade-cost'>"+ cost + "</span> MW(s)"+
                    "</div>"+
                "</div>"
            );
        }
    }

    function refreshDisplay(){
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        $("#rate_display").text(numberWithCommas(getRateAll()));
        showBoxes();
        $(".slot").click(function(){
            type = $(this).attr('slot-name');
            buyBuilding(type, ($(this).hasClass('bldg-slot')) ? 'bldg' : 'upgr');
        });
        refreshSlot();
    }

    function refreshSlot(){
        $(".slot").each(function(index){
            type = $(this).attr('slot-name');
            amount = local_save['buildings'][type];
            if($(this).hasClass('bldg-slot'))
                cost = Math.floor(buildings[type]['base_cost'] * Math.pow(1.15, amount));    
            else
                cost = upgrades[type]['cost'];

            if(cost > local_save['balance'])
                $(this).attr("disabled", "");
            else
                $(this).removeAttr("disabled");
        });
    }
    function getUpgradeLevel(type){
        var level = 1;
        for(i in upgrades){
            if((upgrades[i]['tgt_bldg'] == type)  && (local_save['upgrades'][i])){
                multp = upgrades[i]['multp'];
                if(multp > level)
                    level = upgrades[i]['multp'];
            }
        }
        return level;
    }

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
        local_save['balance']+=getUpgradeLevel('dig');
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
    });

    function getRateAll(){
        var total = 0;
        for(i in buildings){total += Math.ceil(getRate(i));}
        return total;
    }

    var outfocus = 0;
    $(window).focusout(function() {
        outfocus = 1;
        document.title = "Boring Game - Halves Production";
    });
    $(window).focus(function() {
        outfocus = 0;
        document.title = "Boring Game - Full Production";
    });

    setInterval(() => {
        var rate = Math.floor(getRateAll() / ((outfocus) ? 2 : 1));
        local_save['balance'] += Math.ceil(rate*0.1);
        refreshSlot();
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        $("#rate_display").text(numberWithCommas(rate));
    }, 100);
});