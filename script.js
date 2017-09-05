/**
 * @author David Myers
 * @see https://stackoverflow.com/a/24463352/7089212
 */
var rem = function (count)
{
    var unit = $('html').css('font-size');

    if (typeof count !== 'undefined' && count > 0)
    {
        return (parseInt(unit) * count);
    }
    else
    {
        return parseInt(unit);
    }
}

var closeAllLayalDropdowns = function(choiceHeight) {
	$('.layal-drop-down').removeClass('-opened').addClass('-closed');
	$('.layal-drop-down').css('margin-bottom', '');
	$('.layal-drop-down > .choice:first-child').addClass('-selectable');
}

var openDropDown = function(dropDown) {
	var nOfChoices = dropDown.children().length;
	var choiceHeight = 3.4 * rem();
		
	dropDown.removeClass('-closed').addClass('-opened');
	dropDown.children(':first').removeClass('-selectable');
	dropDown.css('margin-bottom', parseFloat(dropDown.css('margin-bottom'))-(nOfChoices * choiceHeight) + choiceHeight);
}

var closeDropDown = function(dropDown) {
	dropDown.removeClass('-opened').addClass('-closed');
	dropDown.children(':first').addClass('-selectable');
	dropDown.css('margin-bottom', '');
}
// TODO: navigation using keybord, web-aria
// TODO: set height and overflow: hidden in js and not in style?
$(document).ready(function() {

	var choiceHeight = 3.4 * rem();

	$('.layal-drop-down').addClass('-js-enabled -closed');
	
	$('.layal-drop-down').click(function() {
		var nOfChoices = $(this).children().length;
		closeAllLayalDropdowns(choiceHeight);
		$(this).removeClass('-closed').addClass('-opened');
		$(this).children(':first').removeClass('-selectable');
		$(this).css('margin-bottom', parseFloat($(this).css('margin-bottom'))-(nOfChoices * choiceHeight) + choiceHeight);
	});

	$(document).click(function(event){
		if (!$(event.target).closest('.layal-drop-down').length) {
			closeAllLayalDropdowns();
		}
	});

	$('.layal-drop-down > .choice > .field').change(function() {
		$(this).closest('.layal-drop-down').find('.choice').addClass('-selectable');
		$(this).closest('.choice').removeClass('-selectable');
		$(this).closest('.layal-drop-down').find('p').text($(this).closest('label').text());
		//$(this).closest('.layal-drop-down').removeClass('-opened').addClass('-closed');
		//$(this).closest('.layal-drop-down').children(':first').addClass('-selectable');
		//$(this).closest('.layal-drop-down').css('margin-bottom', '');
	});

	$(document).on('focus', '.layal-drop-down > .choice > .field', function(e){
		$(e.target).closest('.choice').addClass('layal-focused');
		$(e.target).closest('.layal-drop-down').scrollTop(0);
		if ($(e.target).closest('.layal-drop-down').hasClass('-closed')) {
			openDropDown($(e.target).closest('.layal-drop-down'));
		}
	});

	$(document).on('focusout', '.layal-drop-down > .choice > .field', function(e){
		$(e.target).closest('.choice').removeClass('layal-focused');
		if (0 === $(e.target).closest('.choice.layal-focused').length) {
			closeDropDown($(e.target).closest('.layal-drop-down'));
		}
	});
});