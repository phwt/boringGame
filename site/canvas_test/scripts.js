$(document).ready(function(){

    function getRandomInt(min, max) {
        //By Ionuț G. Stan - https://stackoverflow.com/a/1527820
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    gameCanvas = document.getElementById('gameCanvas');
    wth = $(window).width();hth = $(window).height();
    gameCanvas.width = wth;
    gameCanvas.height = hth;
    var ctx = gameCanvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, hth - (hth * 0.2), wth, hth * 0.2);

    function placeBuilding(w, h){
        ctx.fillStyle = "#0F0";
        ctx.fillRect(getRandomInt(0, wth), hth - (hth * (getRandomInt(35, (h*100)*2)/100)), wth * w, hth * h);
    }

    for(i=0; i < 10; i++){
        // placeBuilding(0.005, 0.2);
    }

    for(i=0; i < 10; i++){
        placeBuilding(0.1, 0.1);
    }

    // setInterval(() => {
    //     placeBuilding(0.1, 0.1);
    // }, 1000);
});