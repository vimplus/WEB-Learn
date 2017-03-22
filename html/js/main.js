// 首页nav导航
$(function(){
	$('.nav ul li').click(function(){
		$(this).addClass('on').siblings().removeClass('on')
		$(this).parent('ul').find('a').removeClass('on')
		$(this).children('a').addClass('on')
	})
})

$(function(){
	// 首页banner图轮播
	jQuery(".banner").slide({
	    mainCell: ".banner-pic",
	    autoPlay: true,
	    effect: "leftLoop",
	    delayTime: 1000,
	    easing: "easeInQuint",
	    mouseOverStop: true,
	}
	);
    // banner图轮播结束
    //首页 右侧轮播图
	jQuery(".focusbox").slide({
	    mainCell: ".focus",
	    autoPlay: true,
	    effect: "leftLoop",
	    delayTime: 1000,
	    easing: "easeInQuint",
	    mouseOverStop: true,
	}
	);
})
//首页右侧新闻资讯列表字数限制在30字以内,多余cut掉
$(function(){
	 for (var i = 0; i < $('.item .text').length; i++) {
		$('.item .text').eq(i).text($('.item .text').eq(i).text().substring(0,30))
	 }
})

//列表页 顶部时间
$(function(){
	var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		time = new Date()
		$('.welcome .time').text(time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + ' ' + week[time.getDay()])

// 列表页导航

/*	$('.common-nav>li>ul').hide()//二级菜单隐藏
	$('.common-nav>li a').mouseenter(function(){
		$(this).parent('li').children('ul').show()//hover a显示
	})
	$('.common-nav>li').mouseleave(function(){
		$(this).children('ul').hide()//leave li隐藏
	})

	for (var i = 0; i < $('.common-nav>li').length; i++) {
		var len = $('.common-nav>li').eq(i).find('li').length//每个li下面二级菜单元素个数

		$('.common-nav>li').eq(i).children('ul').css({"width":len*115 + 84*2,"right":0})
		$('.common-nav>li').eq(0).children('ul').css({"width":len*115 + 84*2,"right":-300})
	};
*/

	// 新闻报轮播
	$('.imagebox>a').first().show().siblings('a').hide()
    var index = 0;
    var set;
    $('.imagebox>.num>span').on("click",function(){
        clearInterval(set)
        index = $(this).index()
        $(this).addClass('on').siblings('span').removeClass('on')
        $('.imagebox>a').eq(index).css("display","block").siblings('a').css("display","none")
    }).mouseleave(function(){
        set = setInterval(auto,4000)
    })
    
    function auto(){
        index + 1 === $('.imagebox>a').length ? index = 0 : index += 1;
        $('.imagebox>a').eq(index).css("display","block").siblings('a').css("display","none")
        $('.imagebox>.num>span').eq(index).addClass('on').siblings('span').removeClass('on')
    }
    set = setInterval(auto,4000)

})


