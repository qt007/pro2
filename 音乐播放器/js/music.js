window.onload = function(){
	let song = document.querySelector('.song')
	let singer = document.querySelector('.singer');
	let list = document.querySelector('.list');
	let audios = document.querySelector('audio');
	let pause = document.querySelector('.pause');
	let zanting = document.querySelector('.zanting');
	let bofang = document.querySelector('.bofang');
	let photo = document.querySelector('.pic>img');
	let dsong = document.querySelector('.dsong');
	let current = document.querySelector('.current');
	let duration = document.querySelector('.duration');
	let progressBar = document.querySelector('.progressBar');
	let previous = document.querySelector('.forward');
	let next = document.querySelector('.go');
	
	//当前播放第几首
	let i = 0;
	//上一首
	previous.onclick = function(){
		i--;
		if (i<0) {
			i=database.length-1;
		}
		render(database[i]);
		
	}
	//下一首
	next.onclick = function(){
		i++;
		if (i>database.length-1) {
			i=0;
		}
		render(database[i]);
	}
	
	render(database[i])
	function render (data){
		song.innerText = data.songs;
		singer.innerText = data.name;
		audios.src = data.src;
		list.innerHTML='';
		for (let i=0; i<data.lyrics.length; i++) {
			list.innerHTML+=`
				<li class='list${i}'>${data.lyrics[i].lyric}</li>
			`
		}
		photo.src = data.photo;
		dsong.innerText = data.songs;
		current.innerText = '00:00';
		duration.innerText = data.alltime;
	}
	
	//暂停播放
	pause.onclick = function(){
		if(audios.paused){
			audios.play();
			zanting.style.display = 'none';
			bofang.style.display = 'block';
		}else{
			audios.pause();
			zanting.style.display = 'block';
			bofang.style.display = 'none';
		}
	}
	
	//播放中
	audios.ontimeupdate = function(){
		//当前播放时间audio.currentTime	//总时间audio.duration
		//当前播放时间(调用格式化时间参数)
		let ct = time(audios.currentTime);
		//进度条
		let bili = audios.currentTime/audios.duration;
		progressBar.style.width = `${bili*100}%`;
		//播放时间
		current.innerText = ct;
		//歌词
		database[i].lyrics.forEach((element,index)=>{
			if (element.time == ct) {
				list.innerHTML = '';
				let a = index;
				if (index<5) {
					index = 0;
				} else {
					index -= 5;
				}
				for (let j=index; j<database[i].lyrics.length; j++) {
					list.innerHTML += `
						<li class='list${j}'>${database[i].lyrics[j].lyric}</li>
					`
				}
				let obj = document.querySelector(`.list${a}`);
				obj.style.color = 'cyan';
			}
		})
		
	}
	function time(data){
		let m = Math.floor(data/60) >= 10 ? Math.floor(data/60) : `0${Math.floor(data/60)}`;
		let s = Math.floor(data%60) >=10 ? Math.floor(data%60) : `0${Math.floor(data%60)}`;
		return `${m}:${s}`;
	}
	
	
	// 音量

let left1;
let yinliang=document.querySelector('.yinliang')
let yl1=document.querySelector('.yl1')
let yl2=document.querySelector('.yl2')
let yl3=document.querySelector('.yl3')
yinliang.onmousedown=function(e){
    let ox=e.clientX;
    left1=yl2.offsetLeft;
   yinliang.onmousemove=function(e){
	   	let cx=e.clientX;
          
	   	let lefts=cx-ox+left1;
	   	if(lefts<=-5){
	       lefts=-5
	   	}
	   	if(lefts>=100){
	   		lefts=100
	   	}
	   	yl2.style.left=lefts+5+'px'
	   	yl3.style.width=lefts+5+'px'
	   	audios.volume=(lefts+5)/105;
	   	
	   	yinliang.onmouseup=function(){
	   	yinliang.onmousemove=null;
	   	yinliang.onmouseup=null;
   }
	   	

   }

 
}
}
