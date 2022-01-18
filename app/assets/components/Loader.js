import $ from "jquery";

window.onbeforeunload = function () {
    $('.Loader').show();
}

document.onreadystatechange = function () {
    if (document.readyState == "complete")
        $('.Loader').hide();
}