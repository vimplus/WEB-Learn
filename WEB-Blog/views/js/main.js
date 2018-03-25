
$(document).ready(function (e) {
    $('.search-case').click(function (e) {
        $('.site-search').toggleClass('search-show')
        $(this).toggleClass('icon-search').toggleClass('icon-close');
    });

    var oSj = 5000;
    var i = 0;
    var bar = $(".banner-box .bar");
    var oImg = $(".banner-box .img"); //获取图片盒子
    var oImgfirst = $('.banner-box .img li:first').clone(); //复制第一张图片
    oImg.append(oImgfirst); //将复制的第一张图片放到最后
    var imgNum = $(".banner-box .img li").size(); //获取图片数量

    //根据图片个数添加圆点按钮
    for (var j = 1; j <= imgNum - 1; j++) {
        $('.banner-box .li').append('<li></li>');
    }

    //给第一个按钮添加选中样式
    $('.banner-box .li li:first').addClass('index');


    //点击向右轮播
    $(".but-right").click(function() {
        int();
    });

    //点击向左轮播
    $(".but-left").click(function() {
        bar.stop().css('width', 0);
        i--;
        if (i == -1) {
            $('.banner-box .img').css('left', -(imgNum - 1) * 820); //用CSS进行图片位置变换，达到无缝拼接效果
            i = imgNum - 2;
        }
        oImg.stop().animate({
            left: -i * 820
        }, 500); //动画效果
        clearInterval(oTime);
        oTime = setInterval(function() {
            int();
        }, oSj);
        barAniMate(); //进度条函数动画效果
        $(".banner-box .li li").eq(i).addClass('index').siblings().removeClass('index'); //给相应的按钮添加样式
    });

    //鼠标移动到圆点后轮播
    $(".banner-box .li li").hover(function() {
        clearInterval(oTime); //清除定时器
        bar.stop().css('width', 0);
        var index = $(this).index();
        i = index;
        oImg.stop().animate({
            left: -index * 820
        }, 500); //动画效果
        bar.stop().css('width', 0);
        $(this).addClass('index').siblings().removeClass('index'); //给相应的按钮添加样式
    }, function() {
        barAniMate(); //进度条函数动画效果
        oTime = setInterval(function() {
            int();
        }, oSj);
    });

    //自动轮播
    var oTime = setInterval(function() {
        int();
    }, oSj);

    barAniMate(); //进度条函数动画效果

    //进度条函数动画效果
    function barAniMate() {
        bar.animate({
            width: '100%'
        }, oSj, function() {
            $(this).css('width', 0);
        });
    }

    //自动轮播函数
    function int() {
        bar.stop().css('width', 0);
        i++;
        if (i == imgNum) {
            oImg.css('left', 0); //用CSS进行图片位置变换，达到无缝拼接效果
            i = 1;
        }
        oImg.stop().animate({
            left: -i * 820
        }, 500); //动画效果
        barAniMate(); //进度条函数动画效果
        clearInterval(oTime);
        oTime = setInterval(function() {
            int();
        }, oSj);
        if (i == imgNum - 1) {
            $(".banner-box .li li").eq(0).addClass('index').siblings().removeClass('index'); //给相应的按钮添加样式

        } else {
            $(".banner-box .li li").eq(i).addClass('index').siblings().removeClass('index'); //给相应的按钮添加样式
        }
    }
});
