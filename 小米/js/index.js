$(function(){
	//导航选项卡
	/*let navi=$('.naviga>li')
	for (let i=0;i<$('.naviga>li').length;i++) {
		navi.eq(i).mouseenter(function(){
			$('.xl-nav').css({height:'230px',boxShadow:'0 3px 6px rgba(0,0,0,0.15)'});
			$('.xl-nav ul').css({display:'none',zIndex:0});
			
		})
		$('.naviga').mouseleave(function(){
			$('.xl-nav').css({height:'0',boxShadow:'none'});
			$('.xl-nav ul').css('display','none');
		})
	}*/
	
	//自动轮播
	let banT=setInterval(banFn,3000);
	let banNum=0;
	function banFn(){
		banNum++;
		if (banNum>=$('.banner-pic>li').length) {
			banNum=0;
		}
		$('.banner-pic>li').css({opacity:0.3,zIndex:0});
		$('.banner-btn>li').css({background:'rgba(0,0,0,0.4)',border:'2px solid rgba(255,255,255,0.4)'});
		$('.banner-btn>li').eq(banNum).css({background:'rgba(255,255,255,0.4)',border:'2px solid rgba(0,0,0,0.4)'})
		$('.banner-pic>li').eq(banNum).css({opacity:1,zIndex:1});
	}
	//鼠标移入移出效果
	$('.banner').mouseenter(function(){
		clearInterval(banT);
	})
	$('.banner').mouseleave(function(){
		banT=setInterval(banFn,3000);
	})
	//反向轮播
	function banFn1(){
		banNum--;
		if (banNum<0) {
			banNum=$('.banner-pic>li').length-1;
		}
		$('.banner-pic>li').css({opacity:0.3,zIndex:0});
		$('.banner-btn>li').css({background:'rgba(0,0,0,0.4)',border:'2px solid rgba(255,255,255,0.4)'});
		$('.banner-btn>li').eq(banNum).css({background:'rgba(255,255,255,0.4)',border:'2px solid rgba(0,0,0,0.4)'})
		$('.banner-pic>li').eq(banNum).css({opacity:1,zIndex:1});
	}
	//圆点
	let banBtn=$('.banner-btn>li')
	for(let i=0;i<banBtn.length;i++){
		banBtn.eq(i).click(function(){
			$('.banner-pic>li').eq(banNum).css({opacity:0.3,zIndex:0});
			$('.banner-pic>li').eq(i).css({opacity:1,zIndex:1});
			banBtn.eq(banNum).css({background:'rgba(0,0,0,0.4)',border:'2px solid rgba(255,255,255,0.4)'})
			banBtn.eq(i).css({background:'rgba(255,255,255,0.4)',border:'2px solid rgba(0,0,0,0.4)'})
			banNum=i;
		})
	}
	//左边按钮
	$('.ban-go').click(banFn);
	//右边按钮
	$('.ban-forward').click(banFn1);
	//浏览器失去焦点
	$(window).blur(function(){
		clearInterval(banT);
	})
	$(window).focus(function(){
		banT=setInterval(banFn,4000);
	})
	
	//小米明星单品
	//设置开关
	let dpFlag = true;
	//获取ul元素
	let mxdpLis = $('.danpinb-lis')
	//li个数
	let childnum = mxdpLis.children().length;
	//一个li的宽度
	let lisw = mxdpLis.children()[0].offsetWidth+parseInt(getComputedStyle(mxdpLis.children()[0],null).marginRight)
	//设置ul宽度
	mxdpLis.width(childnum*lisw);
	//时间函数
	let dpT = setInterval(move,3000);
	//当前屏数、最大屏数
	let dpNum = 0;
	let dpNummax= `${childnum/5}`;
	//右点击
	$('.more .moreright').click(function(){
		if(dpNum==dpNummax-2){
			$(this).removeClass('disabled');
		}
		if (dpNum>=dpNummax-1) {
			return;
		}
		dpNum++;
		mxdpLis.css('margin-left',`${-1240*dpNum}px`);
		$('.more .moreleft').addClass('disabled');
	})
	//左点击
	$('.more .moreleft').click(function(){
		if(dpNum==dpNummax-2){
			$(this).removeClass('disabled');
		}
		if (dpNum<=0) {
			return;
		}
		dpNum--;
		mxdpLis.css('margin-left',`${-1240*dpNum}px`);
		$('.more .moreright').addClass('disabled');
	})
	//自动轮播
	function move(){
		if(dpFlag){
			if (dpNum>=dpNummax-1) {
				dpFlag = false;
				$('.more .moreright').removeClass('disabled');
				return;
			}
			dpNum++;
		}else if(!dpFlag){
			if(dpNum <=0){
				dpFlag = true;
				$('.more .moreleft').removeClass('disabled');
				return;
			}
			dpNum--;
		}
		mxdpLis.css('margin-left',`${-1240*dpNum}px`);
		$('.more .moreright').addClass('disabled');
		$('.more .moreleft').addClass('disabled');
	}
})