import $ from "jquery";

window.onbeforeunload = function () {
    $('.Loader').show();
}

document.onreadystatechange = function () {
    if (document.readyState == "complete")
        $('.Loader').hide();
}

// on change url
window.addEventListener("popstate", function () {
    console.log('asdasd');
    $('.Loader').show();
});

// $('[href]').click(function() {
//     console.log('href')
//     $('.Loader').show();
// });