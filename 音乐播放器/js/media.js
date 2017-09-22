/*
* @Author: Administrator
* @Date:   2017-08-30 18:37:13
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-31 12:04:11
*/
window.onload=function() {
	let audio=document.querySelector('audio');
	let song=document.querySelector('.song');
	let singer=document.querySelector('.singer');
	let list=document.querySelector('.list');
	let photo=document.querySelector('.photo');
	let dSong=document.querySelector('.dSong');
	let current=document.querySelector('.current');
	let duration=document.querySelector('.duration');
	let progressBar=document.querySelector('.progressBar');
	let pause=document.querySelector('.pause');
	// let volum=document.querySelector('.volum');
	let volumC=document.querySelector('.volumC');
	let volumBtn=document.querySelector('.volumBtn');
	let next=document.querySelector('.next');
	let prev=document.querySelector('.prev');

	let i=0;
	render(database[i]);

	next.onclick=function(){
		i++;
		render(database[i]);
	}
	prev.onclick=function(){
		i--;
		render(database[i]);
	}
	//播放完进入下一首
	audio.onended=function(){
		i++;
		render(database[i]);
	}

	/*volumBtn.onmousedown=function(e){
		let ox=e.clientX;
		let left=volumBtn.offsetLeft;
		document.onmousemove=function(e){
			let cx=e.clientX;
			let lefts=cx-ox+left;
			if(lefts<=-7){
				lefts=-7;
			}
			if(lefts>=100-15+7){
				lefts=100-15+7;
			}
			volumBtn.style.left=`${lefts-7}px`;
			volumC.style.width=`${lefts}px`;
			audio.volum=(lefts+7)/100;
		}
		volumBtn.onmouseup=function(){
			volumBtn.onmouseup=null;
			document.onmousemove=null;
		}
	}*/

		audio.ontimeupdate=function(){
		//audio.currentTime   audio.duration
		//进度条
		let ct=time(audio.currentTime);
		let bili=audio.currentTime/audio.duration;
		progressBar.style.width=`${bili*100}%`;
		current.innerText=ct;
		database[i].lyrics.forEach((element,index)=>{
			if(element.time==ct){
				list.innerHTML='';
				let a=index;
				if(index<5){
					index=0;
				}else{
					index-=5;
				}
				for(let j=index;j<database[i].lyrics.length;j++){
					list.innerHTML+=`<li class='list${j}'>${database[i].lyrics[j].lyric}</li>`;
				}
				let obj=document.querySelector(`.list${a}`);
				obj.style.color='#0ab1d7';
			}
		})
	}

	pause.onclick=function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
		pause.classList.toggle('play');
	}
	function render(data){
		song.innerText=data.songs;
		singer.innerText=data.name;
		photo.src=data.photo;
		dSong.innerText=`${data.songs}-${data.name}`;
		current.innerText='00:00';
		duration.innerText=data.alltime;
		list.innerHTML='';
		audio.src=data.src;
		for(let i=0;i<data.lyrics.length;i++){
			list.innerHTML+=`<li class="list${i}">${data.lyrics[i].lyric}</li>`;
		}
	}

	//////////////////////////格式化时间////////////////////////////
	function time(date){
		let m=Math.floor(date/60)>=10?Math.floor(date/60):`0${Math.floor(date/60)}`;
		let s=Math.floor(date%60)>=10?Math.floor(date%60):`0${Math.floor(date%60)}`;
		return `${m}:${s}`
	}





}