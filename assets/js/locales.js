$(document).ready(function() {

    $("input[type='button']").click(function(){

        var width = $(window).width();

        if (width <= 767 ){
            $(".inline").colorbox({inline:true, width:"100%"});
            $(".inline").click();
        } else if(width >= 768 && width<= 1024) {
            $(".inline").colorbox({inline:true, width:"80%"});
            $(".inline").click();

        } else {
            $(".inline").colorbox({inline:true, width:"60%"});
            $(".inline").click();						
        }
    });

    $("input#subscribe").click(function(){
    	$.colorbox.close();
	});
})

