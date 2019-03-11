$(document).ready(function(){
    gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = $(window).width();
    gameCanvas.height = $(window).height();
    var ctx = gameCanvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(10, 15, 1000, 100);
});