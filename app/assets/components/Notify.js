import $ from 'jquery';

$(document).ready(function () {
    setTimeout(() => {
        $('.Notify').fadeOut('medium');
    }, 5000);

    $('.NotifyClose').click(function() {
        $(this).parents('.Notify').fadeOut('medium');
    });
});