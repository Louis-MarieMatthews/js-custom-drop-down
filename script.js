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

// there can only be one open drop-down at the same time
const getAllOpenDropDownInputs = function fGetAllOpenDropDownInputs() {
	return $('.js-custom-drop-down.-js-open > .js-list > .js-choice > .js-label > .js-input');
}

const getCurrentlyOpenDropDown = function fGetCurrentlyOpenDropDown() {
	return $('.js-custom-drop-down.-js-open');
}

const getAllInteractiveElements = function fGetAllInteractiveElements() {
	return $('a[href], audio[controls], button, details, embed, iframe, img[usemap], input:not(input[type="hidden"]), keygen, label, select, textarea, video[controls]');
}

const getAllDropDownCurrentChoices = function fGetAllDropDownCurrentChoices() {
	return $('.js-custom-drop-down > .js-currentchoice');
}

const openDropDown = function fOpenDropDown($dropDown) {
	// closes the currently open drop-down
	closeDropDown(getCurrentlyOpenDropDown());

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

// FIXME what if there are other interactive elements inside the drop-down?
// FIXME what if a closed drop-down gets focus after one?
// TODO add namespaces to all classes (js-cdd-…) and/or use configurable class names
const processNewFocusIn = function processNewFocusIn() {
	const $this = $(this);
	const parentDropDownIfAny = $this.closest('.js-custom-drop-down');
	const isWithinDropDown = 0 !== parentDropDownIfAny.length;
	if (isWithinDropDown && parentDropDownIfAny.hasClass('-js-closed')) {
		// closes the currently open drop-down
		openDropDown(parentDropDownIfAny);
	} else if (!isWithinDropDown) {
		console.log($this);
		// closes the currently open drop-down
		closeDropDown(getCurrentlyOpenDropDown());
	}
}

$(document).ready(function () {
	// enables all custom drop-downs and closes them
	getAllDropDowns().addClass('-js-enabled -js-closed');

	// process keyboard inputs
	getAllInteractiveElements().focusin(processNewFocusIn);

	// process clicks - step 0
	getAllDropDowns().click(function () {
		$(this).addClass('-js-just-clicked');
	});

	// process clicks - step 1
	$(document).click(function () {
		const $openDropDown = getCurrentlyOpenDropDown();
		if ($openDropDown.hasClass('-js-just-clicked')) {
			$openDropDown.removeClass('-js-just-clicked');
		} else {
			closeDropDown($openDropDown);
		}
	});

	// process clicks - step 2 (on current choice)
	getAllDropDownCurrentChoices().click(function () {
		const $parentDropDown = $(this).closest('.js-custom-drop-down');
		if ($parentDropDown.hasClass('-js-closed')) {
			openDropDown($parentDropDown);
		}
	});
});
