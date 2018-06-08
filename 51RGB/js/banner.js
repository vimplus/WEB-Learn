(function($){
	$.fn.changePic = function(options){
		var defaults = {
            figureTime:5000,         //切换时间
            figureBtnAct: 'ctrl-sel', //按钮 li 的样式
            aroundEvent:'click',     //左右按钮事件
            showButton: true ,       //开关
            switcHover: true,        //开关
            clickNode:$(".page-ctrl li"),//点击的节点
            loopNode:$(".banner-pic"),//运动的层
            loopCircle:"-1200px", //运动的范围
            loopTime:700, //运动切换的时间
            sameNode:$(".same-pic-lop"), //相同层
            attrData:"statics", //自定义属性
            leftBtn:$(".next-ctrl"),
            rightBtn:$(".prev-ctrl"),
		}

		options =$.extend(defaults, options);
		this.each(function(){
			var _this = $(this); //_this 是 你的触发点
			var oLi = _this.find(options.clickNode); // 切换按钮 
			var oWid = _this.find(options.sameNode).width(); //获取相同循环点的宽度 
			var oLen = _this.find(options.sameNode).length; //获取循环点的个数
			var oBnnerWid = oWid * oLen; // 循环点外层赋值宽度
			options.loopNode.width(oBnnerWid); // 外层 加上这个宽度
			var time,page = 0; // 定义 参数，可以一起放在defaults上
			time = setInterval(function(){ // 循环开始
				moveLeft();
			},options.figureTime);
			function moveLeft(){ // 下一张
				page ++;
				if (page > oLen-1) page = 0;
				options.loopNode.animate({
					"left":options.loopCircle
				},options.loopTime,function(){
					$(this).children().first().appendTo(options.loopNode.css("left","0px"));
					options.showButton = true;
				});
				oLi.eq(page).addClass(options.figureBtnAct).siblings().removeClass(options.figureBtnAct)
			};
			function moveRight(){ // 上一张
				page --;
				if (page < 0) page = oLen-1;
				options.loopNode.children().last().prependTo(options.loopNode).parent().css("left",options.loopCircle).animate({
					"left":"0px"
				},options.loopTime,function(){
					options.showButton = true;
				});
				oLi.eq(page).addClass(options.figureBtnAct).siblings().removeClass(options.figureBtnAct)
			};
			_this.mouseover(function(event) {  //鼠标在上边的时候停止运动
				/* Act on the event */
				clearInterval(time);
			}).mouseleave(function(event) { //离开继续
				/* Act on the event */
				if (options.switcHover) {
					options.loopNode.html("");
					for (var i = 0; i < oLen; i++) {
						options.loopNode.append("<img src='img/a"+((i+page)%oLen+1)+".png' name='"+(i+page)%oLen+"' alt='' />")
					};
				};
				time = setInterval(function(){
					moveLeft();
				},options.figureTime)
			}); 
			options.rightBtn.on(options.aroundEvent, function(event) {  //按钮点击切换
				if (options.showButton) {
					moveRight();
				};
				options.showButton = false;
			});
			options.leftBtn.on(options.aroundEvent,function(event) { //按钮点击切换
				if (options.showButton) {
					moveLeft();
				};
				options.showButton = false;
			});
			oLi.on(options.aroundEvent, function(event) { // 切换点
				/* Act on the event */
				if (options.switcHover) {
					options.switcHover = false;
					page = $(this).index();
					var oName = options.loopNode.children(options.sameNode).eq(0).attr(options.attrData);
					oLi.eq(page).addClass(options.figureBtnAct).siblings().removeClass(options.figureBtnAct);
					if (page != oName) {
						options.loopNode.children(options.sameNode).filter("["+options.attrData+"="+page+"]").insertAfter(options.loopNode.children(options.sameNode).first()).stop().parent().animate({
							"left":options.loopCircle
						},options.loopTime,function(){
							options.loopNode.children(options.sameNode).first().appendTo(options.loopNode).parent().css("left","0px");
							options.switcHover = true;
						})
					}else{
						options.switcHover = true
					};
				};

			});
		});
	}
})(jQuery);
