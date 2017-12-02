$(document).ready(function(){
	$('.navbar-collapse').on('click', 'a', function() {
		if (!$(this).hasClass('dropdown-toggle')) {
			$('nav').removeClass('in');
		} 
	});	
});