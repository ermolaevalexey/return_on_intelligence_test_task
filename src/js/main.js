$(document).ready(function () {
	
	//Appending data-bg-image to code-samle block 
	//(it should be individual for each user, isn't it?)

	function setBg(element) {
		var bgi = element.data('backgroundImage');
		element.css('background-image', 'url('+ bgi +')');
	};

	setBg($('.user-responsibilities-item.sample-code'));

	//Editable fields functionality

	$('#user-name, #user-location').bind('focus', function() {
		var textContent = $(this).html(),
			$input = $(this);
		$input.parent().addClass('editing');

		$input.bind('keyup keydown', function() {
			if ($input.html() === '' && !$input.is(':focus')){
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

	$('#user-add-skills').bind('focus', function() {
		var textContent = $(this).html(),
			$input = $(this),
			$skillLevel = '';

		$input.parent().addClass('editing');

		$input.parent().find('#skill-level').on('change', function () {
			$skillLevel = $(this).val();
		});

		$input.parent().find('.edit-accept').click(function (e) {
			e.preventDefault();
			if ($input.html() === '' && !$input.is(':focus') || $input.html() === textContent){
				$input.parent().removeClass('editing');
				return;
			} else {
				var li = '<li class="user-skill-item ' + $skillLevel + '">'+ $input.html() + '</li>'
				$('.user-skill-list').append(li);
				$input.html(textContent);
				$input.parent().removeClass('editing');
			}
		});

	});


});