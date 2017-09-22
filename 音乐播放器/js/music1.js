/*
 	格式化时间
	进度条(当前播放时间/总时间)
	音量0-1
	歌词(判断歌词时间和当前播放时间    往下重写)
	收藏(新建数组、push当前歌曲),保存到localStorage
*/

window.onload = function(){
	
	
	
	
	
	
	
	
	
	/***********************************编辑页面函数************************************/
	
	
	/***********************************格式化时间*************************************/
	
	
	/************************************音量拖拽************************************/
	
	/*volumeBtn.onmousedown = function(e){
		let cx = e.clientX, cy = e.clientY;
		let left = e.offsetLeft;
		document.onmousemove = function(e){
			let ox = e.clientX, oy = e.clientY;
			let lefts = cx-ox+left;
			if (lefts <= -7) {
				lefts = -7;
			}
			if (lefts >= lefts-15+7) {
				lefts = lefts-15+7;
			}
			volumeBtn.style.left = `${lefts-7}px;`
			volumeC.style.width = `${lefts}px`;
			audio.volume = `${lefts+7}/100`;
		}
		volumeBtn.onmouseup = function(){
			document.onmousemove = null;
			volumeBtn.onmouseup = null;
		}
	}*/
	
}
