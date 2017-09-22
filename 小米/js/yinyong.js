window.addEventListener('load',function(){
	let more1 = $('.more1')[0];
	//获取按键左
	let goleft = $('.moreleft1',more1)[0];
	//获取按键右
	let goright = $('.moreright1',more1)[0];
	//获取ul
	let mxdpLis = $('.tuijianbot')[0];
	//获取颜色类
	let disabled = $('.disabled');
	dlunbo(goleft,goright,mxdpLis,disabled);
})