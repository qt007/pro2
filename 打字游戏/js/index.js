/*
 属性:初始值
 用来进行描述对象
   哪些字符个数速度出现的位置得分减分生命关卡
 
 方法:函数
 对象可以实现的功能
 开始消除产生字符(个数,哪些字符),下一关,重新开始
 
 
 下落   得分   重新开始(去重,关卡,字母图)
 * */

function Game(){
	//字母数组
	this.charSheet = [
						['Q','img/Q.png'],['W','img/W.png'],['E','img/E.png'],
						['R','img/R.png'],['T','img/T.png'],['Y','img/Y.png'],
						['U','img/U.png'],['I','img/I.png'],['O','img/O.png'],
						['P','img/P.png'],['A','img/A.png'],['S','img/S.png'],
						['D','img/D.png'],['F','img/F.png'],['G','img/G.png'],
						['H','img/H.png'],['J','img/J.png'],['K','img/K.png'],
						['L','img/L.png'],['Z','img/Z.png'],['X','img/X.png'],
						['C','img/C.png'],['V','img/V.png'],['B','img/B.png'],
						['N','img/N.png'],['M','img/M.png']
					];
	//出现字母的个数
	this.length = 5;
	//出现字母的数组
	this.elements = [];
	//字母位置的数组
	this.positions = [];
	//下落速度
	this.speed = 10;
	//分数默认值
	this.score = 0;
	this.fen = document.querySelector('.score>span');
	//生命默认值
	this.life = 10;
	this.sheng = document.querySelector('.life>span');
	//关卡默认值
	this.level = 1;
	this.levels = document.querySelector('.level>span');
	this.gq = 10;
}
//游戏原型
Game.prototype = {
	//开始游戏
	start:function(){
		//产生多个字母
		this.getChars(this.length);
		//向下掉落
		this.drop();
		//按键消失
		this.keys();
	},
	//产生多个字母
	getChars:function(length){
		for (let i=0; i<length; i++) {
			this.getChar();
		}
	},
	//检查字母是否重复
	checkRepeat:function(num){
		return this.elements.some(value=>this.charSheet[num][0]==value.innerText);
	},
	//检查位置是否重复
	checkPosition:function(lefts){
		return this.positions.some(function(value){
			return Math.abs(value - lefts) < 50
		})
	},
	//产生一个字母
	getChar:function(){
		let num = Math.floor(Math.random()*this.charSheet.length);;
		let body = document.querySelector('body');
		let lefts = Math.random()*(window.innerWidth-400)+200;;
		let tops = Math.random()*100;
		//字母重复
		do{
			num = Math.floor(Math.random()*this.charSheet.length);
		}while(this.checkRepeat(num))
		//位置重复
		do{
			lefts = Math.random()*(window.innerWidth-400)+200;
		}while(this.checkPosition(lefts))
		
		//创建一个div
		let divs = document.createElement('div');
		//给div样式
		divs.classList.add('char');
		//将div插入到body
		body.appendChild(divs);
		//给div定位
		divs.style.left = `${lefts}px`;
		divs.style.top = `${tops}px`;
		divs.style.backgroundImage = `url(${this.charSheet[num][1]})`;
		//给div加文本(字母)
		divs.innerText = this.charSheet[num][0];
		this.elements.push(divs);
		this.positions.push(lefts);
	},
	drop:function(){
		let that = this;
		//时间函数  循环
		this.t = setInterval(function(){
			for (let i=0; i<that.elements.length; i++) {
				let tops = that.elements[i].offsetTop;
				that.elements[i].style.top = `${tops+that.speed}px`;
				if (tops>=500) {
					that.life--;
					that.sheng.innerText=that.life;
					document.body.removeChild(that.elements[i]);
					that.elements.splice(i,1);
					that.positions.splice(i,1);
				}
			}
			if(that.life==0){
				that.confirms();
			}
			if (that.elements.length<that.length) {
				that.getChar();
			}
		},300)
	},
	keys:function(){
		//65  a  toLowerCase()
		let that = this;
		document.onkeydown = function(e){
			for (let i=0; i<that.elements.length; i++) {
				let inner = that.elements[i].innerText;
//				String.fromCharCode(e.keyCode)
				if (e.keyCode==inner.charCodeAt()) {
					that.score++;
					that.fen.innerText = that.score;
					document.body.removeChild(that.elements[i]);
					that.elements.splice(i,1);
					that.positions.splice(i,1);
				}
			}
			if (that.score==that.gq){
				that.next();
			}
		}
	},
	next:function(){
		clearInterval(this.t);
		for (let i=0; i<this.elements.length; i++) {
			document.body.removeChild(this.elements[i]);
		}
		this.elements = [];
		this.positions = [];
		//关卡加一
		this.level ++;
		this.levels.innerText = this.level;
		//增加难度  字母数加一
		if(this.length>15){
			this.speeds();
		}else{
			this.length++;
		}
		this.score = 0;
		this.fen.innerText = this.score;
		this.life = 10;
		this.sheng.innerText=this.life;
		this.start();
	},
	speeds:function(){
		this.speed++;
	},
	confirms:function(){
		clearInterval(this.t);
		for (let i=0; i<this.elements.length; i++) {
			document.body.removeChild(this.elements[i]);
		}
		this.elements = [];
		this.positions = [];
		let back = confirm('是否退出游戏?');
		if (back) {
			close();
		} else{
			this.level = 1;
			this.levels.innerText = this.level;
			//增加难度  字母数加一
			this.length = 5;
			this.score = 0;
			this.fen.innerText = this.score;
			this.life = 10;
			this.sheng.innerText=this.life;
			this.start();
		}
	},
}
