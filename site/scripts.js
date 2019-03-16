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
                $('#pbar').css('width', (story[i]['req_b']/story[i]['req_a'])*100 + "%");
                $('#task-cur').text(story[i]['req_b']);
                $('#task-goal').text(story[i]['req_a']);
                break;
            }
        }
    }

    loadStory();
    currentStory();

    r = 252;
    g = 69;
    b = 69;
    setInterval(() => {
        loadStory();
        currentStory();
        ctxb.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // r-=1;g+=0.13;b+=0.67;
        ctxb.fillStyle = "rgb("+r+", "+g+", "+b+")";
        console.log(r, g, b);
        ctxb.arc(wth/2, hth*1.5, wth, 0, 2 * Math.PI);
        ctxb.fill();
    }, 100);

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
                "<div style='position: relative' class='slot bldg-slot' slot-name=" + keys[i] + ">"+
                    "<table>"+
                        "<tr>"+
                            "<th rowspan='2'><img src='assets/" + icon + "'/></th>"+
                            "<th class='slot-name'>" + name + "</th>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+
                                "<span class='greentext'><span class='bldg-cost'>" + cost + " </span>MW(s)</span>"+
                            "</td>"+
                        "</tr>"+
                        "<span class='slot-number'>" + amount + "</span>"+
                    "</table>"+
                    "<div class='description'>" + desc + " - " + speed + "MW/s</div>"+
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
                
                "<div style='position: relative' class='slot upgrade-slot' slot-name=" + keys[i] + ">"+
                    "<table>"+
                        "<tr>"+
                            "<th rowspan='2'><img style='width: 50%' src='assets/" + icon + "'/></th>"+
                            "<th class='slot-name'>" + name + "</th>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+
                                "<span class='greentext'><span class='upgrade-cost'>" + cost + " </span>MW(s)</span>"+
                            "</td>"+
                        "</tr>"+
                    "</table>"+
                    "<div class='description'>" + desc + "</div>"+
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
            placeBuilding(type[0]);
        }
        console.log(type[0]);
        $("#rate_display").text(numberWithCommas(getRateAll()));
    }

    $("#btn-dig").click(function(){
        thiscycle = getUpgradeLevel('dig')
        local_save['stats']['click']++;
        local_save['stats']['total_pwr']+=thiscycle;
        local_save['balance']+=thiscycle;
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
    });

    // $(".slot").click(function(){
    //     type = $(this).attr('slot-name');
    //     buyBuilding(type, ($(this).hasClass('bldg-slot')) ? 'bldg' : 'upgr');
    // });

    function getRateAll(){
        var total = 0;
        for(i in buildings){total += Math.ceil(getRate(i));}
        return total;
    }

    var outfocus = 0;
    $('.focus-notice').hide();
    // $(window).focusout(function() {
    //     outfocus = 1;
    //     document.title = "Boring Game - Halves Production";
    //     $('.focus-notice').toggle();
    // });
    // $(window).focus(function() {
    //     outfocus = 0;
    //     document.title = "Boring Game - Full Production";
    //     $('.focus-notice').toggle();
    // });

    setInterval(() => {
        var rate = Math.floor(getRateAll() / ((outfocus) ? 2 : 1));
        var thiscycle = Math.ceil(rate*0.1);
        local_save['balance'] += thiscycle;
        local_save['stats']['total_pwr'] += thiscycle;
        refreshSlot();
        $("#kgs_display").text(numberWithCommas(local_save['balance']));
        $("#rate_display").text(numberWithCommas(rate));
    }, 100);

    // CANVAS SECTION BELOW

    var randomInt = (i, j) => Math.floor(Math.random()*(Math.floor(j)-Math.ceil(i)+1))+Math.ceil(i);

    gameCanvas = document.getElementById('gameCanvas');
    // wth = $(window).width() - ($(window).width() * (80/100));
    wth = $(window).width() * (60/100);
    // wth = $(window).width();
    hth = $(window).height();
    gameCanvas.width = wth;
    gameCanvas.height = hth;
    var ctx = gameCanvas.getContext("2d");
    ctx.beginPath();

    backCanvas = document.getElementById('backCanvas');
    backCanvas.width = wth;
    backCanvas.height = hth;
    var ctxb = backCanvas.getContext("2d");
    ctxb.beginPath();

    function calcDist(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    function placeBuilding2(type, x, y){
        var img = new Image();
        switch(parseInt(type)){
            case 1: img.src = "./assets/1_bio.svg";break;
            case 2: img.src = "./assets/2_fossil.svg";break;
            case 3: img.src = "./assets/3_solar.svg";break;
            case 4: img.src = "./assets/4_wind.svg";break;
            case 5: img.src = "./assets/5_dam.svg";break;
            case 6: img.src = "./assets/6_rig.svg";break;
            case 7: img.src = "./assets/7_therm.svg";break;
            case 8: img.src = "./assets/8_nuke.svg";break;
        }
        img.onload = () => ctx.drawImage(img, x, y, 30, 30);
    }

    // for(i=0; i< 100; i++){
    function placeBuilding(type){
        posx = randomInt(0, wth);
        posy = randomInt(0, hth);
        // console.log(calcDist(wth/2, hth*1.5, posx, posy) + ' ' + wth/1.5);
        while(calcDist(wth/2, hth*1.5, posx, posy) > wth){
            posx = randomInt(0, wth);
            posy = randomInt(0, hth);
        }
        placeBuilding2(type, posx, posy);
    }

    for(i in local_save.buildings){
        for(j=0; j<local_save.buildings[i]; j++){
            placeBuilding(i[0]);
        }
        // console.log();
    }

});