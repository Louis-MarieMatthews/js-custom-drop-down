/**
 * @author David Myers
 * @see https://stackoverflow.com/a/24463352/7089212
 */
const rem = function getPixelHeightOfOneRem()
{
	const unit = $('html').css('font-size');
	return parseInt(unit);
}

const getAllDropDowns = function fGetAllDropDowns() {
	return $('.js-custom-drop-down');
}

const getAllDropDownInputs = function fGetAllDropDownInputs() {
	return $('.js-custom-drop-down > .js-list > .js-choice > .js-label > .js-input');
}

const getAllClosedDropDownInputs = function fGetAllClosedDropDownInputs() {
	return $('.js-custom-drop-down.-js-closed > .js-list > .js-choice > .js-label > .js-input');
}

const getAllOpenDropDownInputs = function fGetAllOpenDropDownInputs() {
	return $('.js-custom-drop-down.-js-open > .js-list > .js-choice > .js-label > .js-input');
}


const openDropDown = function fOpenDropDown($dropDown) {
	$dropDown.removeClass('-js-closed').addClass('-js-open');
	
	// updates margin-bottom
	const oldBMargin = parseFloat($dropDown.css('margin-bottom'));
	const listHeight = $dropDown.children('.js-list').height();
	$dropDown.css('margin-bottom', oldBMargin - listHeight);
}

const closeDropDown = function fCloseDropDown($dropDown) {
	// updates margin-bottom
	const oldBMargin = parseFloat($dropDown.css('margin-bottom'));
	const listHeight = $dropDown.children('.js-list').height();
	$dropDown.css('margin-bottom', oldBMargin + listHeight);

	$dropDown.removeClass('-js-open').addClass('-js-closed');
}

$(document).ready(function () {
	// enables all custom drop-downs and closes them
	getAllDropDowns().addClass('-js-enabled -js-closed');
	
	// FIXME focus callback should be added when drop down is closed and removed when drop down is open
	getAllDropDownInputs().focus(function () {
		$dropDown = $(this).closest('.js-custom-drop-down');
		if ($dropDown.hasClass('-js-closed')) {
			openDropDown($dropDown);
		}
	});
	
	// FIXME focusout callback should be added when drop down gets open and removed when drop down gets closed
	getAllDropDowns().focusout(function () {
		$dropDown = $(this).closest('.js-custom-drop-down');
		if ($dropDown.hasClass('-js-open')) {
			closeDropDown($dropDown);
		}
	});
});

