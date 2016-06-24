$(document).ready(function() {

// Define variables for coordinates and mouse tracking
	var clickYPos = 0,
			clickXPos = 0,
			panelWidth = $(".panel").width(), 
			panelHeight = $(".panel").height(),
			panelOffset = $(".panel").offset(),
			cellHeight = $('.sideNav__item').height(),
			mouseDown = false,
			chosenCell = 1;

// Define variables for movement and regions
	var movementScaleX = 0.75,
			movementRangeY = 25,
			marginMax = false,
			maxX = 0.25 * panelWidth,
			lockXRange = maxX * 085;

// Define event listener for mouse movement
	window.addEventListener('mousemove', function(e){ 
		if(mouseDown === true){
			
			drawerSlide(e.pageX);

			var scaleY = verticalPosition(e.pageY);

			scrollIndicatorControl(scaleY);	  

			var calculatedY = scaleY * panelHeight;

			detectMenuItem(calculatedY);
		}
	});

// Define event listener for mouse down
	window.addEventListener('mousedown', function(e){ 

		var relativeX = (e.pageX - panelOffset.left),
				relativeY = (e.pageY - panelOffset.top);

		if (relativeX <= panelWidth && relativeX >= 0 && relativeY <= panelHeight && relativeY >= 0) {
			mouseDown = true;
			clickYPos = e.pageY; 
			clickXPos = e.pageX;
		}
	});

// Define event listener for mouseup
	window.addEventListener('mouseup', function(){ 
		mouseDown = false;
		changeActiveContent(chosenCell);
		$('.moving').css('margin-left', '0px');
		$('.panel').removeClass('moving');
		scrollIndicatorControl('lock');
	});

// Define function to detect which cell should be active based on mouse position
	function detectMenuItem(y) {
		var hoverCell = 1 + Math.floor(y / cellHeight),
				totalCells = Math.floor($('.screen').height() / cellHeight);

		if (hoverCell < 1) {
			hoverCell = 1;
		} 

		if (hoverCell > totalCells) {
			hoverCell = totalCells;
		}

		var currentCell = hoverCell;

		chosenCell = currentCell;

		$('.active').removeClass('active');
		$('.sideNav__item:nth-of-type(' + currentCell + ')').addClass('active');
	}

// Define function to control drawer open amount based on mouse movement
	function drawerSlide(i) {
		$('.panel').addClass('moving');

		var marginAdjustment = ((i - clickXPos) * movementScaleX);

		if (marginAdjustment > maxX ) {
			marginAdjustment = maxX;
			marginMax = true;
		}

		if (marginAdjustment < 0) {
			marginAdjustment = 0;
		}

		if (marginMax === true) {
			if (marginAdjustment > lockXRange) {
				marginAdjustment = maxX;

			} else if (marginAdjustment < lockXRange) {
				marginMax = false;
			}
		}

		$('.moving').css('margin-left', marginAdjustment + 'px');
	}

// Define function to calculate current mouse position in relation to click origin
	function verticalPosition(i) {
		var offsetY = -(clickYPos - i);
		
		if (offsetY < -movementRangeY) {
			offsetY = -movementRangeY;
		}

		if (offsetY > movementRangeY) {
			offsetY = movementRangeY;
		}

		var scaleY = ((offsetY/2) + (movementRangeY/2)) / movementRangeY;

		return scaleY;
	}
// Define function to change change active content panel on release event
	function changeActiveContent(i) {
		var foo = '-' + (panelHeight * (i - 1)) + 'px';
		$('.panel__content:nth-of-type(1)').css('margin-top', foo);
	}

// Define function to control scroll position indicator
	function scrollIndicatorControl(i) {
		var indicatorObj = $('.sideNav__indicator');
		var indicatorY = null;

		indicatorObj.removeClass('lock');

		if ( i === 'lock') {
			indicatorY = (chosenCell * cellHeight) -cellHeight;
			indicatorObj.addClass('lock');

		} else {
			indicatorY = i * (panelHeight - cellHeight);
		}

		indicatorObj.css({
				'top' : indicatorY,
				'height' : cellHeight
		});

	}

});
