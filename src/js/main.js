$(document).ready(function () {
	
	function setBg(element) {
		var bgi = element.data('backgroundImage');
		element.css('background-image', 'url('+ bgi +')');
	};

	//console.log($('.user-responsibilities-item.sample-code').data());
	
	setBg($('.user-responsibilities-item.sample-code'));

	$('#user-name, #user-location').bind('focus focusout', function() {
		$(this).parent().toggleClass('editing');
	});

	$('#user-name, #user-location').bind('keyup keydown', function(e) {
		if ($(this).html() === '' || e.which === 16) {
			$(this).append('<b>&nbsp;</b>');
		} else if ($(this).html().length >= 1) {
			$('b').remove();
		}
	});

});