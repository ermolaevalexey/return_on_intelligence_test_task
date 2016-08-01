$(document).ready(function () {
	
	function setBg(element) {
		var bgi = element.data('backgroundImage');
		element.css('background-image', 'url('+ bgi +')');
	};

	//console.log($('.user-responsibilities-item.sample-code').data());
	
	setBg($('.user-responsibilities-item.sample-code'));

	$('#user-name, #user-location').bind('focus focusout', function() {
		$(this).toggleClass('editing');
	});

});