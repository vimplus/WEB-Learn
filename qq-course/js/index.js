$(document).ready(function () {
    $('#js-menu').on('click', function (e) {
        $('#js-submenu').toggle();
        $('#js-modal-mask').toggle();
        $('body').toggleClass('disable-scroll')
    })


    $('#js-hd-serch').on('focus', function (e) {
        $('.js-search').addClass('search-focus');
        $('.js-hot-search').addClass('js-hot-focus');
        $('#js-modal-mask').show();
    })

    $('#js-hd-serch').on('blur', function (e) {
        $('.js-search').removeClass('search-focus');
        $('.js-hot-search').removeClass('js-hot-focus');
        $('#js-modal-mask').hide();
    })
})
