import { MDCTextField } from '@material/textfield';
import { MDCTextFieldIcon } from '@material/textfield/icon';
import $ from "jquery";

$(document).ready(function () {
    $('.mdc-text-field').each(function(k, e) {
        new MDCTextField(e);
    });

    $('.mdc-text-field-icon').each(function(k, e) {
        new MDCTextFieldIcon(e);
    });
});