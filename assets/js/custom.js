$(function () {

	/* Snow
	================================================== */
	snowStorm.snowColor = '#FFFFFF'; // blue-ish snow!?
    snowStorm.flakesMaxActive = 1000; // show more snow on screen at once
    snowStorm.snowStick = false; // When false, snow will never sit at the bottom
    snowStorm.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.


	/* Countdown Timer
	================================================== */
	var austDay = new Date();
	austDay = new Date(austDay.getFullYear() + 1, 4, 26);
	$('#defaultCountdown').countdown({until: austDay});


	/* Twitter Feed
	================================================== */
	$("#ticker").tweet({
	  username: "EnvatoWebDesign",
	  page: 1,
	  avatar_size: 32,
	  count: 20,
	  loading_text: "loading ..."
	}).bind("loaded", function() {
	  var ul = $(this).find(".tweet_list");
	  var ticker = function() {
	    setTimeout(function() {
	      ul.find('li:first').animate( {marginTop: '-4em'}, 500, function() {
	        $(this).detach().appendTo(ul).removeAttr('style');
	      });
	      ticker();
	    }, 5000);
	  };
	  ticker();
	});


	/* subscribe form
	================================================== */

	$(".subscribe-submit").click(function(){
		var valid = '';
		var isr = ' required.';
		var email = $(".email").val();
		
		if (!email.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
			valid += '<br />Email'+isr;
		}
		if (valid!='') {
			$("#response").fadeIn("slow");
			$("#response").html("Email required");
		}
		else {
			var datastr ='&email=' + email;
			$("#response").css("display", "block");
			$("#response").html("Sending...");
			$("#response").fadeIn("slow");
			setTimeout("send('"+datastr+"')",2000);
		}
		return false;
	});

});


function send(datastr){
	/* Ajax Post form
	================================================== */
	$.ajax({	
		type: "POST",
		url: "subscribe.php",
		data: datastr,
		cache: false,
		success: function(html){
		$("#response").fadeIn("slow");
		$("#response").html(html);
		setTimeout('$("#response").fadeOut("slow")',2500);
	}
	});
}


/* Settings (Remove if not needed )
	================================================== */
$(document).on("click", ".settings", function() {

	$('#settings').fadeIn('300');
	$('.settings').fadeOut('300');

});

$(document).on("click", ".close", function() {

	$('#settings').fadeOut('300');
	$('.settings').fadeIn('300');

});

$("#settings input").change(function () {
	if ($(this).is(":checked")) {
		if($(this).attr("name")=="snow"){
			snowStorm.resume();
		}else{
			$("#" + $(this).attr("name")).fadeIn();	
		}
		
	} else {
		if($(this).attr("name")=="snow"){
			snowStorm.stop();
		}else{
			$("#" + $(this).attr("name")).fadeOut();
		}
	}					 
});