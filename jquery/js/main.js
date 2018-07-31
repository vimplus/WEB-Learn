


// window.onload = function () {
//     debugger
//     var box = document.getElementById('box');
//     console.dir(box); 
// }

$(document).ready(function () {
    // debugger
    var box = $('#box');
    console.dir(box);

    $('#btn').on('click', function (event) {
        var span = $('<span class="error">你点击我干嘛?</span>');
        console.log(span);
        box.append(span);

        $('#hoverBox').slideToggle();
    });

    $('#hoverBox').hover(function () {
        $(this).text('你想干嘛？');
    }, function () {
        $(this).text('是不是害怕了？');
    });

    $('#ipt').on('focus', function (params) {
        console.log('获取焦点');
    });
    $('#ipt').on('blur', function (params) {
        console.log('失去焦点');
    });
});
