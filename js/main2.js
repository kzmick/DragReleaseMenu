$(document).ready(function() {

	var clickYPos = 0,
	  	clickXPos = 0,
	    panelWidth = $(".panel").width(), 
			panelHeight = $(".panel").height(),
			panelOffset = $(".panel").offset(),
	    mouseDown = false;

	var movementScaleX = 0.5,
			movementRangeY = 25,
			maxX = 0.25 * panelWidth;


	window.addEventListener('mousemove', function(e){ 
	  if(mouseDown === true){
	  	$('.panel').addClass('moving');

	  	var marginAdjustment = ((e.pageX - clickXPos) * movementScaleX );

	  		if (marginAdjustment > maxX) {
	  			marginAdjustment = maxX;
	  		}

	    $('.moving').css('margin-left', marginAdjustment + 'px');

	    // var calculatedY = e.pageY - panelOffset.top;

	    var offsetY = -(clickYPos - e.pageY);
	    
	    if (offsetY < -movementRangeY) {
	    	offsetY = -movementRangeY;
	    }

	    if (offsetY > movementRangeY) {
	    	offsetY = movementRangeY;
	    }

	    var scaleY = ((offsetY/2) + (movementRangeY/2)) / movementRangeY;


	    var calculatedY = scaleY * panelHeight;

	    detectMenuItem(calculatedY);	  
	  }
	});

	window.addEventListener('mousedown', function(e){ 

	  var relativeX = (e.pageX - panelOffset.left),
				relativeY = (e.pageY - panelOffset.top);

	  if (relativeX <= panelWidth && relativeX >= 0 && relativeY <= panelHeight && relativeY >= 0) {
	  	mouseDown = true;
	  	clickYPos = e.pageY; 
	  	clickXPos = e.pageX;
	  }

	});

	window.addEventListener('mouseup', function(){ 
		mouseDown = false; 
		$('.moving').css('margin-left', '0px');
		$('.panel').removeClass('moving');
	});

	function detectMenuItem(y) {
		var cellHeight = $('.sideNav__item').height(),
				hoverCell = 1 + Math.floor(y / cellHeight),
				totalCells = Math.floor($('.screen').height() / cellHeight);

		if (hoverCell < 1) {
			hoverCell = 1;
		} 

		if (hoverCell > totalCells) {
			hoverCell = totalCells;
		}

		var currentCell = hoverCell;

		$('.active').removeClass('active');
		$('.sideNav__item:nth-of-type(' + currentCell + ')').addClass('active');
		console.log("currentCell " + currentCell);
		console.log("totalCells " + totalCells);

	}

});
