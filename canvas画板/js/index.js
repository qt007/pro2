window.onload=function(){
	//获取元素
	//线条
	let line = document.querySelector('.tool_line');
	let pencil = document.querySelector('.tool_pencil');
	let circle = document.querySelector('.shape_circle');
	let square = document.querySelector('.shape_square')
	let trigon = document.querySelector('.shape_trigon');
	let polygon = document.querySelector('.shape_polygon');
	let polystar = document.querySelector('.shape_polystar');
	let tool_eraser = document.querySelector('.tool_eraser');
	let era = document.querySelector('.eraser');
	let w = era.offsetWidth, h = era.offsetHeight;
	let texts = document.querySelector('.tool_text');
	let save = document.querySelector('.save');
	let reserve = document.querySelector('.reserve');
	let cutting = document.querySelector('.tool_cutting');
	let clip = document.querySelector('.clip');
	//画板
	let canvas = document.querySelector('canvas');
	let mask = document.querySelector('.mask');
	//描边填充
	let stroke=document.querySelector(".stroke_box");
	let fill=document.querySelector(".fill_box");
	let strokec=document.querySelector(".stroke>input");
	let fillc=document.querySelector(".fill>input");
	//清除
	let clear=document.querySelector(".clear");
	//new一个对象
	let canva = new Draw(canvas,mask);
	line.onclick = function(){
		canva.lines();
	}
	pencil.onclick = function(){
		canva.pencil();
	}
	circle.onclick = function(){
		canva.circle();
	}
	square.onclick = function(){
		canva.square();
	}
	trigon.onclick = function(){
		canva.trigon();
	}
	polygon.onclick = function(){
		canva.polygon(5);
	}
	polystar.onclick = function(){
		canva.polystar(10);
	}
	tool_eraser.onclick = function(){
		canva.eraser(era,w,h);
	}
	texts.onclick = function(){
		canva.font();
	}
	save.onclick = function(){
		this.href = canvas.toDataURL('img/png');
		this.download = 'a.png';
	}
	reserve.onclick = function(){
		canva.reserve();
	}
	/*cutting.onclick = function(){
		canva.cutting(clip);
	}*/
	stroke.onclick=function(){
		canva.style="stroke";
	}
	fill.onclick=function(){
		canva.style="fill";
	}
	strokec.onchange=function(){
		canva.strokeStyle=this.value;
	}
	fillc.onchange=function(){
		canva.fillStyle=this.value;
	}
	clear.onclick=function(){
		canva.clear();
	}
	let eraser =document.querySelector(".eraser");
	eraser.style.display="none";
}
