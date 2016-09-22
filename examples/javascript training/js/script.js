$(document).ready (function() {
	$('#disclaimer').before('<input type="button" value="hide" id="disclaimBtn">');
	
	$('#disclaimBtn').click(function() {
		$('#disclaimer').toggle();
		
		if($('#disclaimer').is(":visible")) {
			
			$(this).val('Hide');
		}
		else {
			$(this).val('Show');
		}
	});
	
	
	/*$('#celebs > tbody tr').mouseover(function() {
		$(this).css('background-color', 'lightgray');
	});
	
	$('#celebs > tbody tr').mouseout(function() {
		$(this).css('background-color', 'white');
	});
	*/
	$('#celebs > tbody tr').hover(function() {$(this).addClass('zebra-hover')}, function() {$(this).removeClass('zebra-hover')});
	
	//$('#celebs > tbody tr td:contains("Singer")' && '#celebs > tbody tr td:contains("Omaha")').parent().remove()
	
	$('.spoiler').hide();
	$('.spoiler').after('<input type="button" value="Show More" id="showMore">');
	$('#showMore').click(function() {
		$('.spoiler').fadeIn('slow');
		
		$(this).remove();
	});
	
	$('p').animate({
		padding: '1px'
	}, 2000);
	
	$('textarea').resizable({
		grid: [20,20],
		minWidth: 155,
		minHeight: 30,
		maxHeight: 220,
		contianment: 'parent'
	});
	
	//$('nav').fixed();
	
	$(window).scroll(function(){
		$('nav').css("top", $(window).scrollTop());
    });
	
	/*$('#showAnimation').animate({
		left: '+=50'
	}, 100000);*/
	
	/*var leftPos1 = 0;
	setInterval(function() {
		$('#showAnimation1').css('left', ++leftPos1);
	}, 200);
	
	var leftPos2 = 0;
	setInterval(function() {
		if(Math.ceil(leftPos2) % 100 == 0) {
			leftPos2 += 2;
		}
		$('#showAnimation2').css('left', ++leftPos2);
	}, 200);*/
	
	var noOfImgs = $('#ppt > img').length;
	console.log(noOfImgs);
	var cntr = 0;
	setInterval(function() {
		$('#ppt > img').each(function() {
			$(this).css('z-index', 0);
		});
		
		$($('#ppt > img')[cntr++]).css('z-index', 1);
		
		if(cntr % noOfImgs == 0) {
			cntr = 0;
		}
	}, 2000);
});