$(document).ready(function(){function o(o){console.log(o);var e=$(".sideNav__item").height(),n=Math.floor(o/e),a=$(".screen").height()/e;0>n&&(n=0),n>a&&(n=a);var s=n+1;console.log(s)}var e=0,n=0,a=$(".panel").offset(),s=!1,i=.25;$(".panel").mousedown(function(o){s=!0,$(".panel").addClass("moving"),console.log(s),e=o.pageY,n=o.pageX}),$(document).mouseup(function(){$(".moving").css("margin-left","0px"),$(".panel").removeClass("moving"),s=!1,console.log(s)}),window.addEventListener("mousemove",function(e){s===!0&&($(".moving").css("margin-left",(e.pageX-n)*i+"px"),o(e.pageY-a.top))})});