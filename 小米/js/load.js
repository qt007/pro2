window.addEventListener('load',function(){
	let wh = window.innerHeight;
	let body = document.querySelector('body');
	let section = document.querySelectorAll('section');
	let newArr = [];
	Array.prototype.forEach.call(section,function(element){
		newArr.push(element.offsetTop);
	})
	window.onscroll = function(){
		let sct = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
		newArr.forEach(function(value,index){
			//判断屏幕高度加页面滚动距离  是否大于  元素距左上角距离
			if ( wh+sct > value+200) {
				//遍历img元素
				let imgs = section[index].getElementsByTagName('img');
				for (let i=0; i<imgs.length; i++) {
					//给img元素添加src属性
					imgs[i].src= imgs[i].getAttribute('imgpath');
				}
			}
		})
	}
})