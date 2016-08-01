$(document).ready(function () {
	
	function setBg(element) {
		var bgi = element.data('backgroundImage');
		element.css('background-image', 'url('+ bgi +')');
	};

	//console.log($('.user-responsibilities-item.sample-code').data());
	
	setBg($('.user-responsibilities-item.sample-code'));

	$('#user-name, #user-location').bind('focus', function() {
		var textContent = $(this).html(),
			$input = $(this);
		$input.parent().addClass('editing');

		$input.bind('keyup keydown', function() {
			if ($input.html() === ''){
				$input.append(textContent);
			}
		});

		$input.parent().find('.edit-accept').click(function (e) {
			e.preventDefault();
			var newContent = $input.html() || textContent;
			$input.html(newContent);
			$input.parent().removeClass('editing');
		});

		$input.parent().find('.edit-decline').click(function (e) {
			e.preventDefault();
			var oldContent = textContent;
			$input.html(oldContent);
			$input.parent().removeClass('editing');
		});

	});


});