# js-custom-drop-down
*js-custom-drop-down* allows you to have drop-downs in your HTML pages that you
can *fully customise* with CSS!

It requires jQuery, without preventing users who disabled JavaScript from using 
your page. It is keyboard-operable and uses valid, semantic HTML5.

All CSS classes are prefixed with `js` or `-js`. The CSS coding style used is 
[RSCSS](http://rscss.io/). The JavaScript coding style used is the 
[AirBnb coding style](https://github.com/airbnb/javascript).

You need to include the `js-custom-drop-down.min.css` and the `script.js` files 
to be able to use drop-downs in your pages.

The structure of a drop-down is show in `cdd.html`. You can use the following 
code as a quick start for your drop-down. Don't forget:
 * to put something inside the `js-currentchoice` paragraph, 
 * to give the `input` elements a `name` and a `value`, 
 * and to add text to the labels.
~~~~
<div class="js-custom-drop-down">
  <p class="js-currentchoice"></p>
  <ul class="js-list">
    <li class="js-choice">
      <label class="js-label">
        <input class="js-input" name="" type="radio" value="">
      </label>
    </li>
  </ul>
</div>
~~~~

The CSS code can be fully customised. `custom-style.scss` is an example of a 
custom stylesheet used in conjuction with *js-custom-drop-down*. You can remove 
or modify all the CSS code contained within this file without affecting the core
features of the drop-downs. However, *do not modify `js-custom-drop-down.scss`.

## TODO
 * Check accessibility with screen readers.
 * Check usability on mobiles devices.
 * Fix FIXME and TODOs.
 * Publish on NPM.
 * Check full conformance to the AirBnb coding style.
 * Update version of js-custom-drop-down in package.json.