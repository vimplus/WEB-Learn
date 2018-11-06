
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);


const main = {
	getList: function () {
		$.ajax({
			type: 'get',
			url: '/api/user/getList',
			data: {
				page: 1,
				size: 10,
			},
			success: function (res) {
				console.log('-----res:', res);
				if (res && res.code === 10000) {
					main.renderStoreList(res.data.list);
				}
			},
			error: function (err) {
				console.log('-----err:', err);
			}
		})
	},
	renderStoreList: function (list) {
		let liTemps = '';
		for (let i = 0; i < list.length; i++) {
			const item = list[i];
			liTemps += `
				<li class="list-item">
				<div class="list-item-container">
					<a class="list-item-anchor" href="/edit.html?id=${item.id}">
						<h3>
							<span class="list-title">用户名：${item.username}</span>
							<span class="list-price">28.7<span><span class="primary-color">元</span>起</span></span>
						</h3>
						<div class="list-address">
							<div class="list-location">东城区香河园路1号当代MOMA北区T4座</div>
						</div>
						<button data-id="${item.id}" style="color: #f00">删除</button>
						<div class="list-status">
							<div class="tpp-tips tpp-outline-info">观影小食</div>
							<div class="tpp-tips tpp-outline-info">可停车</div>
							<div class="tpp-tips tpp-outline-info">艺术影院</div>
						</div>
						<ul class="list-activity">
							<li class="activity-item">
								<span class="icon-activity icon-3">惠</span>
								江湖儿女等7部影片特惠
							</li>
						</ul>
					</a>
				</div>
			</li>`;	
		}
		$('#listBox').append(liTemps);

		$('#listBox').on('click', 'button', function (event) {
			const id = $(this).data('id');
			$.ajax({
				type: 'post',
				url: '/api/user/delete',
				data: {
					userId: id
				},
				success: function (res) {
					console.log('-----res:', res);
					if (res && res.code === 10000) {
						alert('删除成功！');
						$('#listBox').empty();
						main.getList();
					}
				},
				error: function (err) {
					console.log('-----err:', err);
				}
			})
			// debugger
			return false;
		})
	},
	renderEditData: function () {
		var userId = $.getUrlParam('id');
		$.ajax({
			type: 'get',
			url: '/api/user/userInfo',
			data: {
				userId: userId
			},
			success: function (res) {
				console.log('-----res:', res);
				if (res && res.code === 10000) {
					var userInfo = res.data;
					$('#username').val(userInfo.username);
					$('#age').val(userInfo.age);
				}
			},
			error: function (err) {
				console.log('-----err:', err);
			}
		})
	},
	saveUserInfo: function () {
		$('#btnSaveUserInfo').on('click', function (event) {
			var userId = $.getUrlParam('id');
			var username = $('#username').val();
			var age = $('#age').val();
			$.ajax({
				type: 'post',
				url: '/api/user/updateInfo',
				data: {
					userId: userId,
					username: username,
					age: age
				},
				success: function (res) {
					console.log('-----res:', res);
					if (res && res.code === 10000) {
						alert('保存成功！')
					}
				},
				error: function (err) {
					console.log('-----err:', err);
				}
			})
		})
	}
}



$(document).ready(function(){
	// 获取列表
	main.getList();
	// 渲染编辑页数据
	main.renderEditData();
	main.saveUserInfo();


	$("#movieTab").on('click','ul li',function(event){
		 var selected = $(this).attr('aria-selected');
		 if(selected === 'true'){
		 	return;
		 }else{
               $(this).addClass('active').siblings().removeClass('active');
				var index = $(this).data('index');
				var trans = `translate3d(${index * 22}vw,0vw,0vw)`;
				$('.tab-link-bar').css({
					transform:trans,
					width:'22vw'	
				})
				$('.tpp-tab-panel').toggleClass('hide');
			$(this).attr('aria-selected','true').siblings().attr('aria-selected','false');	
		 }

	})
  
	$('.tab-link-bar').css({
		  transform: 'translate3d(0vw, 0vw, 0vw)',
          width: '22vw'
	});

   //city-selector
	$('.city-c').on('click',function(event){
		$('.tpp-city-selector').removeClass('hide');
	});

	$('.btn-close').on('click',function(event){
		//event.stopPropagation();
		$('.tpp-city-selector').addClass('hide');
	});

	//cinema-search-container
	$('.search-selector').on('click',function(event){
		$('.cinema-search-container').removeClass('hide');
	});

	$('.cinema-search-cancel').on('click',function(event){
		$('.cinema-search-container').addClass('hide');
	})

	$('#regionSelector').click(function(){
		$(this).toggleClass('down');
		$('.regionName').toggle();
	});


	// register的逻辑
	$('#registerBtn').on('click', function (event) {
		var username = $('#username').val();
		var password = $('#password').val();

		$.ajax({
			type: 'post',
			url: '/api/user/register',
			data: {
				username: username,
				password: password
			},
			success: function (res) {
				console.log('-----res:', res);
				if (res && res.code === 10000) {
					alert('恭喜你，注册成功！')
				}
			},
			error: function (err) {
				console.log('-----err:', err);
			}
		})
	})


	$('#loginBtn').on('click', function (event) {
		var username = $('#username').val();
		var password = $('#password').val();

		$.ajax({
			type: 'post',
			url: '/api/user/login',
			data: {
				username: username,
				password: password
			},
			success: function (res) {
				console.log('-----res:', res);
				if (res && res.code === 10000) {
					// location.href = '/';
					Storage.setCookie('token', res.data.token);

				} else if (res && res.code === 80001) {
					alert('密码错误！')
				}
				// else if (res && res.code === 88888) {
				// 	location.href = '/login.html'
				// }
			},
			error: function (err) {
				console.log('-----err:', err);
			}
		})
	})


})


// banner
TouchSlide({ 
	slideCell:"#tpp-banner",
	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
	mainCell:".bd ul", 
	effect:"leftLoop", 
	autoPlay:true,//自动播放
	autoPage:true, //自动分页
	delayTime:400,//毫秒；切换效果持续时间（执行一次效果用多少毫秒）
	interTime:3000//毫秒；自动运行间隔（隔多少毫秒后执行下一个效果
	// switchLoad:"_src" //切换加载，真实图片路径为"_src" 
});



	