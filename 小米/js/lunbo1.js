function dlunbo(goleft,goright,mxdpLis,disabled){
	//获取ul子元素的个数
	let childnum =  mxdpLis.childElementCount;
	//一个li占用的宽度:本身宽度
	//getComputedStyle获取元素中css属性列表,不想获取伪元素的属性值请填写为null
	let lisw = mxdpLis.children[0].offsetWidth+parseInt(getComputedStyle(mxdpLis.children[0],null).marginRight);
	//js设置ul的宽度
	mxdpLis.style.width = `${childnum*lisw}px`;
	//定义一个时间函数
	let dpFlag = true;
	let dpT = setInterval(move,3000);
	//默认开始为第0屏
	let dpNum = 0;
	//最大能出几屏
	let dpNummax= `${childnum/5}`;
	//右键的点击事件
	goright.onclick = function(){
		if(dpNum==dpNummax-2){
			goright.classList.remove('disabled');
		}
		if (dpNum>=dpNummax-1) {
			return;
		}
		dpNum++;
		mxdpLis.style.marginLeft = `${-1240*dpNum}px`;
		goleft.classList.add('disabled');
	}
	goleft.onclick = function(){
		if(dpNum==dpNummax-2){
			goleft.classList.remove('disabled');
		}
		if (dpNum<=0) {
			return;
		}
		dpNum--;
		mxdpLis.style.marginLeft = `${-1240*dpNum}px`;
		goright.classList.add('disabled');
	}
	//自动轮播
	function move(){
		if(dpFlag){
			if (dpNum>=dpNummax-1) {
				dpFlag = false;
				goright.classList.remove('disabled');
				return;
			}
			dpNum++;
		}else if(!dpFlag){
			if(dpNum <=0){
				dpFlag = true;
				goleft.classList.remove('disabled');
				return;
			}
			dpNum--;
		}
		mxdpLis.style.marginLeft = `${-1240*dpNum}px`;
		goleft.classList.add('disabled');
		goright.classList.add('disabled');
	}
}