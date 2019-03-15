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
    // ctx.fillRect(0, hth - (hth * 0.2), wth, hth * 0.2);

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
        // img.src = "up-arrow.png";
        // var angle = Math.random()*Math.PI;
        // posx = Math.cos(Math.random()*Math.PI)*(wth/1.5);
        // posy = Math.sin(Math.random()*Math.PI)*(wth/1.5);
        // posx = randomInt(0, wth);
        // posy = randomInt(0, hth);
        // console.log(posx + ' ' + posy);
        img.onload = () => ctx.drawImage(img, x, y, 30, 30);
        // img.onload = () => ctx.drawImage(img, Math.cos(Math.random()*Math.PI)*(wth/1.5), Math.sin(Math.random()*Math.PI)*(wth/1.5), 30, 30);
    }

    // setInterval(() => {
        // placeBuilding2();
    // }, 1000);
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
    // placeBuilding2();

    function placeBuilding(w, h){
        ctx.fillStyle = "#0F0";
        ctx.fillRect(getRandomInt(0, wth), hth - (hth * (getRandomInt(35, (h*100)*2)/100)), wth * w, hth * h);
    }

    for(i=0; i < 10; i++){
        // placeBuilding(0.005, 0.2);
    }

    for(i=0; i < 10; i++){
        // placeBuilding(0.1, 0.1);
    }

    // setInterval(() => {
    //     placeBuilding(0.1, 0.1);
    // }, 1000);
});
