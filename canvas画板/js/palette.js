function Draw(canvas,mask){
	//属性(画板、2d画布)
	this.canvas = canvas;
	this.mask = mask;
	this.ctx = this.canvas.getContext('2d');
	//画板样式(宽高)
	this.cw = this.canvas.width;
	this.ch = this.canvas.height;
	this.lineWidth = '3';
	this.lineCap = 'round';
	this.fillStyle = 'cyan';
	this.strokeStyle = 'pink';
	//填充样式(默认)
	this.style = 'fill';
	//历史记录
	this.history = [];
	//
	this.item = null;
}
	//方法
Draw.prototype = {
	//画线
	lines:function(){
		let that = this;
		this.mask.onmousedown = function(e){
			//获取相对于事件源的位置
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				//清除画布
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					//数组的最后一位放入画布中
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//开始画线
				that.ctx.beginPath();
				that.ctx.moveTo(ox,oy);
				that.ctx.lineTo(cx,cy);
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//闭合
				that.ctx.closePath();
				//描边
				that.ctx.stroke();
			}
			//
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//铅笔
	pencil:function(){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.ctx.beginPath();
			that.ctx.moveTo(ox,oy);
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//数组   线的长度    线之间的间距
				that.ctx.setLineDash([1,0]);
				//连线
				that.ctx.lineTo(cx,cy);
				that.ctx.stroke();
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//圆
	circle:function(){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//计算半径
				let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
				//开始画线
				that.ctx.beginPath();
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//画圆
				that.ctx.arc(ox,oy,r,0,Math.PI*2,false);
				that.ctx[that.style]();
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//矩形
	square:function(){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//计算半径
				let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
				//开始画线
				that.ctx.beginPath();
				that.ctx.moveTo(ox,oy);
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//画圆
				that.ctx.lineTo(ox,cy);
				that.ctx.lineTo(cx,cy);
				that.ctx.lineTo(cx,oy);
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//三角形
	trigon:function(){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//计算半径
				let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
				//开始画线
				that.ctx.beginPath();
				that.ctx.moveTo(ox,oy);
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//画圆
				that.ctx.lineTo(ox,cy);
				that.ctx.lineTo(cx,cy);
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//多边形
	polygon:function(bian){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//计算半径
				let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
				let deg = 360/bian/180*Math.PI;
				//开始画线
				that.ctx.beginPath();
				that.ctx.moveTo(ox+r,oy);
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//画线
				for (let i=1;i<bian; i++) {
					that.ctx.lineTo(ox+r*Math.cos(deg*i),oy+r*Math.sin(deg*i));
				}
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//多角星
	polystar:function(jiao){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				//计算半径
				let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2))*2;
				let r1 = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
				let deg = 360/jiao/180*Math.PI;
				//开始画线
				that.ctx.beginPath();
				that.ctx.moveTo(ox+r,oy);
				//设置线的样式
				that.ctx.lineWidth = that.lineWidth;
				that.ctx.lineCap = that.lineCap;
				that.ctx.strokeStyle = that.strokeStyle;
				that.ctx.fillStyle = that.fillStyle;
				//画线
				for (let i=0;i<jiao; i++) {
					if (i%2==0) {
						that.ctx.lineTo(ox+r*Math.cos(deg*i),oy+r*Math.sin(deg*i));
					}
					if (i%2==1) {
						that.ctx.lineTo(ox+r1*Math.cos(deg*i),oy+r1*Math.sin(deg*i));
					}
				}
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//橡皮
	eraser:function(era,w,h){
		let that = this;
		this.mask.onmousedown = function(){
			that.mask.onmousemove = function(e){
				let ox = e.offsetX, oy = e.offsetY;
				era.style.display = 'block';
				era.style.left = `${ox-w/2}px`;
				era.style.top = `${oy-h/2}px`;
				that.ctx.clearRect(ox-w/2,oy-h/2,w,h);
			}
			that.mask.onmouseup = function(){
				era.style.display = 'none';
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}
	},
	//文本
	font:function(){
		this.mask.ondblclick = function(e){
			let that = this;
			let ox = e.offsetX, oy = e.offsetY;
			this.ctx.clearRect(0,0,this.cw,this.ch);
			if (this.history.length>0) {
				this.ctx.putImageData(this.history[this.history.length-1],0,0);
			}
			let divs = document.createElement('div');
			divs.style.cssText = `
				width:100px; height:25px; 
				border:1px solid #000;
				position:absolute;
				left:${ox}px;top:${oy}px;
			`
			divs.contentEditable = 'true';
			this.mask.appendChild(divs);
			//原来的距离+鼠标移动的距离
			let lefts,tops
			divs.onmousedown = function(e){
				let ol = this.offsetLeft, ot = this.offsetTop;
				let cx = e.clientX, cy = e.clientY;
				that.mask.onmousemove = function(e){
					let ox = e.clientX, oy = e.clientY;
					lefts = ol+ox-cx;
					tops = ot+oy-cy;
					divs.style.left = `${lefts}px`;
					divs.style.top = `${tops}px`;
				}
				divs.onmouseup = function(){
//					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
					that.mask.onmousemove = null;
					this.onmouseup = null;
				}
			}
			divs.onblur = function(){
				let value = this.innerText;
				that.mask.removeChild(divs);
				that.ctx.font='bold 20px sans-serif';
				that.ctx.textAlign = 'center';
				that.ctx.textBaseline = 'middle';
				that.ctx.fillText(value,lefts,tops);
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
			}
			document.onkeydown = function(e){
				if (e.ctrlKey&&e.keyCode == 90) {
					let img = that.history.pop();
					that.ctx.putImageData(img,0,0);
				}
			}
		}.bind(this)
	},
	//反向
	reserve:function(){
		let imgdata = this.ctx.getImageData(0,0,this.cw,this.ch);
		let data = imgdata.data;
//		console.log(data);
		for (let i=0; i<data.length; i+=4) {
			data[i]=255-data[i];
			data[i+1]=255-data[i+1];
			data[i+2]=255-data[i+2];
		}
		this.ctx.putImageData(imgdata,0,0);
		this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
	},
	//剪切
	cutting:function(clipObj){
		//clipObj
		let that = this;
		this.mask.onmousedown = function(e){
			let w,h,minX,minY;
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				w = Math.abs(cx-ox), h = Math.abs(cy-oy);
				minX = cx > ox ? ox : cx;
				minY = cy > oy ? oy : cy;
//				console.log(w,h);
				clipObj.style.cssText = `
					display:block;
					left:${minX}px;top:${minY}px;
					width:${w}px;height:${h}px;
				`
				that.mask.onmouseup = function(){
					console.log(1);
					that.item = that.ctx.getImageData(minX,minY,w,h);
					that.ctx.clearRect(minX,minY,w,h);
					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
					that.ctx.putImageData(that.item,0,0);
					that.mask.onmousemove = null;
					that.mask.onmouseup = null;
					that.drag(minX,minY,w,h,clipObj);
				}
			}
		}
	},
	//移动
	drag:function(minX,minY,w,h,Obj){
		let that = this;
		this.mask.onmousemove = function(e){
			let cx = e.offsetX, cy = e.offsetY;
			if (cx>minX && cx<minX+w && cy>minY &&cy<minY+h) {
				that.mask.style.cursor = 'move';
			} else{
				that.mask.style.cursor = 'default';
			}
		}
		this.mask.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				let lefts = cx-ox+minX, tops = cy-oy+minX;
				obj.style.left = `${lefts}px`;
				obj.style.top = `${tops}px`;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length>0) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				that.ctx.putImageData(that.item,lefts,tops);
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				obj.style.cssText=`
		            display:none;
		            left:0px;
		            top:0px;
		            width:0px;
		            height:0px;
	            `
				that.mask.style.cursor='default';    
		       	that.mask.onmousemove=null;
		       	that.mask.onmouseup=null;
		       	that.mask.onmousedown=null;
			}
		}
	},
	//清除
	clear:function(){
		this.ctx.clearRect(0,0,this.cw,this.ch);
	}
}
