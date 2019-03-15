$(document).ready(function(){

    var saveGame = () => localStorage.boring_data = JSON.stringify(local_save);;
    var loadSave = () => local_save = JSON.parse(localStorage.boring_data);
    var getRate = (i) => (buildings[i]['base_speed'] * getUpgradeLevel(i)) * local_save['buildings'][i];
    var numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // var objDiv = document.getElementById("words-slots");
    // objDiv.scrollTop = objDiv.scrollHeight;

    // newGame();
    function newGame(){
        local_save = {
            name: '',
            balance: 0,
            buildings: {},
            upgrades: {},
            stats: {
                click: 0,
                total_pwr: 0
            }
        }
        for(i in buildings){Object.assign(local_save['buildings'], {[i]: 0})}
        for(i in upgrades){Object.assign(local_save['upgrades'], {[i]: 0})}
        localStorage.boring_data = JSON.stringify(local_save);
    }

    window.onunload = function(){saveGame();} //Automatically save game data when user leaves
    if(!localStorage.boring_data){newGame();}else{loadSave();} //If save game does not exist. Create new one.
    refreshDisplay();

    function currentStory(){
        for(i in story){
            if(story[i]['req_b'] < story[i]['req_a']){
                $('#cond_text').text(story[i]['cond']);
                $('#desc_text').text(story[i]['desc']);
                $('#task_text').text(story[i]['task']);
                $('.task-bar').css('width', (story[i]['req_b']/story[i]['req_a'])*100 + "%");
                $('#task-cur').text(story[i]['req_b']);
                $('#task-goal').text(story[i]['req_a']);
                break;
            }
        }
    }

    loadStory();
    currentStory();

    setInterval(() => {
        loadStory();
        currentStory();
    }, 1000);

    function showBoxes(){
        $("#bldg-slot-area").empty();
        keys = Object.keys(buildings);
        toBreak = 0;
        for(i=0; i < keys.length; i++){

            icon = buildings[keys[i]]['icon'];
            name = (toBreak == 1) ? "???????" : buildings[keys[i]]['name'];
            amount = local_save['buildings'][keys[i]];
            desc = (toBreak == 1) ? "???????" : buildings[keys[i]]['description'];
            speed = (toBreak == 1) ? "???????" : buildings[keys[i]]['base_speed'];
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
                        "<span class='greentext'><span class='bldg-cost'>"+ cost + "</span> MW(s)</span>"+
                    "</div>"+

                    "<div class='description' >"+
                        desc+' - '+speed+' MW/s'+
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
                (!local_save['buildings'][upgrade_sel['tgt_bldg']] && keys[i].substring(0, 3) != 'dig') ||
                !local_save['upgrades'][prev] && oftype 
            ){continue;}

            icon = upgrade_sel['icon'];
            name = upgrade_sel['name'];
            cost = upgrade_sel['cost'];
            desc = upgrade_sel['description'];
            disabled = cost > local_save['balance'];

            $("#upgrade-slot-area").append(
                "<div class='slot upgrade-slot row no-gutters' slot-name='" + keys[i] + "'>"+
                    "<div class='col-md-3 text-center'>"+
                        "<img src='assets/"+ icon +"'/>"+
                    "</div>"+
                    "<div class='col-md-9 slot-cost'>"+
                        "<b>"+ name +"</b><br>"+
                        "<span class='greentext'><span class='upgrade-cost'>"+ cost + "</span> MW(s)</span>"+
                    "</div>"+

                    "<div class='description' >"+
                        desc+
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
        $(".slot").hover(
            function(){
                $(this).find(".description").slideToggle("fast", function(){});
            }, function(){
                $(this).find(".description").slideToggle("fast", function(){});
            }
        );
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
        // $('.slot').find(".description").show();
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
        thiscycle = getUpgradeLevel('dig')
        local_save['stats']['click']++;
        local_save['stats']['total_pwr']+=thiscycle;
        local_save['balance']+=thiscycle;
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
    });

    $(".slot").click(function(){
        type = $(this).attr('slot-name');
        buyBuilding(type, ($(this).hasClass('bldg-slot')) ? 'bldg' : 'upgr');
    });

    function getRateAll(){
        var total = 0;
        for(i in buildings){total += Math.ceil(getRate(i));}
        return total;
    }

    var outfocus = 0;
    $('.focus-notice').hide();
    $(window).focusout(function() {
        outfocus = 1;
        document.title = "Boring Game - Halves Production";
        $('.focus-notice').toggle();
    });
    $(window).focus(function() {
        outfocus = 0;
        document.title = "Boring Game - Full Production";
        $('.focus-notice').toggle();
    });

    setInterval(() => {
        var rate = Math.floor(getRateAll() / ((outfocus) ? 2 : 1));
        var thiscycle = Math.ceil(rate*0.1);
        local_save['balance'] += thiscycle;
        local_save['stats']['total_pwr'] += thiscycle;
        refreshSlot();
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        $("#rate_display").text(numberWithCommas(rate));
    }, 100);
});