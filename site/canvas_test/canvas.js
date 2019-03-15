$(document).ready(function(){

    var randomInt = (i, j) => Math.floor(Math.random()*(Math.floor(j)-Math.ceil(i)+1))+Math.ceil(i);

    gameCanvas = document.getElementById('gameCanvas');
    wth = $(window).width();hth = $(window).height();
    gameCanvas.width = wth;
    gameCanvas.height = hth;
    var ctx = gameCanvas.getContext("2d");
    ctx.fillStyle = "#FC4646";
    ctx.beginPath();
    ctx.arc(wth/2, hth*1.5, wth/1.5, 0, 2 * Math.PI);
    ctx.fill();

    function calcDist(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    function placeBuilding2(type, x, y){
        var img = new Image();
        switch(type){
            case 1: img.src = "./svg/1_bio.svg";break;
            case 2: img.src = "./svg/2_fossil.svg";break;
            case 3: img.src = "./svg/3_solar.svg";break;
            case 4: img.src = "./svg/4_wind.svg";break;
            case 5: img.src = "./svg/5_dam.svg";break;
            case 6: img.src = "./svg/6_rig.svg";break;
            case 7: img.src = "./svg/7_therm.svg";break;
            case 8: img.src = "./svg/8_nuke.svg";break;
        }
        img.onload = () => ctx.drawImage(img, x, y, 30, 30);
    }

    for(i=0; i< 100; i++){
        posx = randomInt(0, wth);
        posy = randomInt(0, hth);
        console.log(calcDist(wth/2, hth*1.5, posx, posy) + ' ' + wth/1.5);
        while(calcDist(wth/2, hth*1.5, posx, posy) > wth/1.5){
            posx = randomInt(0, wth);
            posy = randomInt(0, hth);
        }
        placeBuilding2(Math.floor(Math.random() * 8 + 1), posx, posy);
    }
});
