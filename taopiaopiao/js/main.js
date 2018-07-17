


$(document).ready(function () {
    $('#J_movieTab').on('click', 'ul li', function (event) {
        var selected = $(this).attr('aria-selected');
        if (selected === 'true') {
            return;
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).data('index');
            var trans = `translate3d(${index * 86}px, 0px, 0px)`;
            $('.tab-ink-bar').css({
                transform: trans,
                width: '86px'
            });

            $('.tpp-tab-panel').toggleClass('hide');
            $(this).attr('aria-selected', 'true').siblings().attr('aria-selected', 'false');
        }
    })
    $('.tab-ink-bar').css({
        transform: 'translate3d(0px, 0px, 0px)',
        width: '86px'
    })
});