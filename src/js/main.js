$(document).ready(function () {
	
	//Appending data-bg-image to code-samle block 
	//(it should be individual for each user, isn't it?)

	function setBg(element) {
		var bgi = element.data('backgroundImage');
		element.css('background-image', 'url('+ bgi +')');
	};

	function deleteItem(element, trigger) {
		//Removing li element from list
		element.find(trigger).on('click', function (e) {
			e.preventDefault();
			$(this).parent().remove();
		});
	};

	deleteItem($('.user-skill-list .user-skill-item'), '.delete-skill');
	setBg($('.user-responsibilities-item.sample-code'));

	//Editable fields functionality

	$('#user-name, #user-location').bind('focus', function() {
		var textContent = $(this).html(),
			$input = $(this);
		$input.parent().addClass('editing');

		//We typed nothing and focus is broken
		$input.bind('keyup keydown', function() {
			if ($input.html() === '' && !$input.is(':focus')){
				$input.append(textContent);
			}
		});

		//Applying new value
		$input.parent().find('.edit-accept').click(function (e) {
			e.preventDefault();
			var newContent = $input.html() || textContent;
			$input.html(newContent);
			$input.parent().removeClass('editing');
		});

		//Cancelling typing and return previous value
		$input.parent().find('.edit-decline').click(function (e) {
			e.preventDefault();
			var oldContent = textContent;
			$input.html(oldContent);
			$input.parent().removeClass('editing');
		});

	});

	//Add skills field functionality

	$('#user-add-skills').bind('focus', function () {
		var textContent = $(this).html(),
			$input = $(this),
			//Remember default value of skill level
			$skillLevel = $input.parent().find('#skill-level').val(); 

		$input.parent().addClass('editing');

		//Applying new value of skill level
		$input.parent().find('#skill-level').on('change', function () {
			$skillLevel = $(this).val();
		});

		//Trying to append skill
		$input.parent().find('.edit-accept').on('click', function (e) {
			e.preventDefault();
			//We typed nothing and focus is broken or we've got default placeholder value
			if ($input.html() === '' && !$input.is(':focus') || $input.html() === textContent){
				$input.parent().removeClass('editing');
				return;
			} else {
				//Appending new li element to list
				var li = '<li class="user-skill-item ' + $skillLevel + '">'+ $input.html() + '<a href="#" class="delete-skill"></a>' + '</li>';
				$(li).appendTo($('.user-skill-list'));
				deleteItem($('.user-skill-list .user-skill-item'), '.delete-skill');
				$input.html(textContent);
				$input.parent().removeClass('editing');
			}
		});

	});

});