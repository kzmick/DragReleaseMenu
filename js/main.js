$(document).ready(function() {

	var curYPos = 0,
	    curXPos = 0,
			panelOffset = $(".panel").offset(),
	    mouseDown = false;

	var movementModifier = 0.25;

	$('.panel').mousedown(function(e) {
		mouseDown = true;
	  	$('.panel').addClass('moving');

		console.log(mouseDown);
  	curYPos = e.pageY; 
  	curXPos = e.pageX;
	});

	$(document).mouseup(function() {
		$('.moving').css('margin-left', '0px');
		$('.panel').removeClass('moving');
		mouseDown = false;
		console.log(mouseDown);
	});


	window.addEventListener('mousemove', function(e){ 
	  if(mouseDown === true){
	    $('.moving').css('margin-left', ((e.pageX - curXPos) * movementModifier ) + 'px');

	    detectMenuItem(e.pageY - panelOffset.top);	  
	  }
	});

	function detectMenuItem(y) {
		console.log(y);
		var cellHeight = $('.sideNav__item').height(),
				cellCount = Math.floor(y / cellHeight),
				cellTotal = $('.screen').height() / cellHeight;

		if (cellCount < 0) {
			cellCount = 0;
		} 

		if (cellCount > cellTotal) {
			cellCount = cellTotal;
		}

		var currentCell = cellCount + 1;

		console.log(currentCell);
	}

});
