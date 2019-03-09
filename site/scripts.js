$(document).ready(function(){
//    $(".col").each
    keys = Object.keys(buildings);
    for(i=0; i < 8; i++){
        // console.log(buildings[i]['icon']);
        console.log('Mww');
        $("#bldg-slot-area").append(
            "<div class='bldg-slot row no-gutters'>"+
                "<div class='col-md-3 text-center'>"+
                    "<img src='assets/"+ buildings[keys[i]]['icon'] +"'/>"+
                "</div>"+
                "<div class='col-md-9'>"+
                    "<b>"+ buildings[keys[i]]['name'] +"</b><br>"+
                    "<span class='bldg-cost'>00000</span> KG(s)"+
                "</div>"+
            "</div>"
        );
    }
});