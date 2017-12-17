
$(document).ready(function (e) {
    $('.search-case').click(function (e) {
        $('.site-search').toggleClass('search-show')
        $(this).toggleClass('icon-search').toggleClass('icon-close');
    });
});
