

$(document).ready(function () {

  $('[data-toggle="tooltip"]').tooltip();

  $('input[type="file"]').change(function () {
    var img = $(this).val();
    $('.fileInputText').text(img.substr(12, img.length));
  });

  $('.sideNav i.fa-cog').click(function () {
    $('.sideNav').toggleClass('active');
  });
});
