import $ from "jquery";

function CenterBlockAbsolute() {
  $('.CenterBlockAbsolute,.CenterBlockAbsoluteOff').each(function (a, e) {
    var e = $(e);

    if (e.height() > $(window).height()) {
      $(e).removeClass('CenterBlockAbsolute');
      $(e).addClass('CenterBlockAbsoluteOff');
    } else {
      if (!e.hasClass('CenterBlockAbsolute')) {
        e.addClass('CenterBlockAbsolute');
        e.removeClass('CenterBlockAbsoluteOff');
      }
    }
  });
}

$(document).ready(function () {
  CenterBlockAbsolute();
})

$(window).resize(function () {
  CenterBlockAbsolute();
});