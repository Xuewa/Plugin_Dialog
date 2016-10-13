/**
 * written by Xuewa
 * first written on 2016/08/23
 * change on 2016/10/6
 */
define(["Widget","jquery"],function(w,$){

	function PicChange(config){
		this.config={
		};
		this.extend(config);
		// console.log(this.config);
	}

	PicChange.prototype=$.extend({},new w.Widget(),{
		/*生成UI */
		renderUI:function() {
			this.size=this.config.pics.length;
			this.oldIndex=1;
			this.index=1;
			this.animated=true;
			this.timer;
			this._startX=0;
			this._endX=0;
			//container
			this.container=$('<div id="picsContainer"></div>');
			//imgs
			if(this.size>0)
				for (var i in this.config.pics) {
					var item=this.config.pics[i];
					var imgItem=$('<img src="'+item+'" style="left:'+(-i*100)+'%;">');
					this.container.append(imgItem);
				}
			//btns
			this.btn_con=$('<div id="btns"></div>');
			if(this.size>0)
				for (var i in this.config.pics) {
					var btnItem;
					if(i==0) btnItem=$('<a index="'+i+'" class="pic_btn on"></a>');
					else btnItem=$('<a index="'+i+'" class="pic_btn"></a>');
					this.btn_con.append(btnItem);
				}
			//prev+next
			this.prev_btn=$('<div id="prev" class="Tleft mid_btn">&lt;</div>');
			this.next_btn=$('<div id="next" class="Tright mid_btn">&gt;</div>');

			this.container.append(this.btn_con);
			this.container.append(this.prev_btn);
			this.container.append(this.next_btn);
			$('body').append(this.container);
			this.imgList=$('img');
			this.btns=$('.pic_btn');
			// console.log($('img'));
		},
		// 为Carousel中的元素绑定事件
		bindUI:function(){
			var _this=this;
			//prev
			this.prev_btn.on('click',{global:this},this.prevFunc);
			//next
			this.next_btn.on('click',{global:this},this.nextFunc);
			//滑动屏幕
			this.container.on("touchstart",{global:this},this.touchStart);
			this.container.on("touchmove",this.touchMove);
			this.container.on("touchend",{global:this},this.touchEnd);
			//点击btn
			for (var i =0;i<=this.size-1;i++){
				this.btns.each(function(){
					$(this).on('click',{global:this},function(e){
						if (!e.data.global.animated) return;
						e.data.global.index=parseInt(this.getAttribute('index'));
						e.data.global.animateByIdx();
						e.data.global.stop();
						e.data.global.autoPlay();
					});
				});
				
			}
		},
		prevFunc:function(e){
			var _this=e.data.global;
			if(!_this.animated) return;
			_this.index--;
			_this.animateByIndex();
		},
		nextFunc:function(e){
			var _this=e.data.global;
			if(!_this.animated) return;
			_this.index++;
			_this.animateByIndex();
		},
		// /*动画:use setTimeout 递归调用*/
		// animateByIdx:function(){
		// //toTop
		// 	if(this.oldIndex==this.index||animated) return;
		// 	if(this.index>this.size) index=1;
		// 	else if (this.index<1) this.index=this.size;
		// 	var offSet=index-oldIndex;

		// 	var inteval=10;
		// 	var time=30;
		// 	var step=1;
		// 	var speed=offSet*(100)/(time);
		// 	var des=100*offSet;
		// 	var oldLefts=[];
		// 	for (var j =0;j<=this.size-1;j++) {
		// 		oldLefts[j]=parseInt(pics[j].style.left);
		// 	}
		// 	var animate=function(){
		// 		if(step<time){//变化范围
		// 			for (var j =0;j<=pics.length-1;j++) {
		// 				var newLeft=oldLefts[j]+step*speed+'%';
		// 				// if(j==1) console.log(step+"--   "+newLeft);
		// 				pics[j].style.left=newLeft;
		// 			}
		// 			step++;
		// 			setTimeout(animate,inteval);
		// 			animated=true;
		// 		}else{
		// 			for (var j =0;j<=pics.length-1;j++) {
		// 				pics[j].style.left=oldLefts[j]+des+'%';
		// 				// console.log(j+"--"+oldLefts[j]+'---'+pics[j].style.left);
		// 			}
		// 			animated=false;
		// 		}
		// 	}
		// 	animate();
		// 	this.moveBtn();
		// },
		/*动画:use animate 不用递归*/
		animateByIndex:function(){
			if(this.oldIndex==this.index||(!this.animated)) {
				console.log('noAnimate');
				return;
			}
			this.animated=false;
			if(this.index>this.size) this.index=1;
			else if (this.index<1) this.index=this.size;
			
			var _this=this;
			var offSet=this.index-this.oldIndex;
			var des=offSet*100;

			var inteval=500;
			for (var j =0;j<=this.size-1;j++) {
				var imgItem=this.imgList[j];
				var oldLeft=parseInt(imgItem.style.left);
				var cssObj={'left':oldLeft+des+'%'};
				$(imgItem).animate(cssObj,inteval,function(){
					_this.animated=true;
					_this.oldIndex=_this.index;
				});
			}
			this.moveBtn();
		},
		/*相应改变btn*/
		moveBtn:function(){
			// var btns=$('.pic_btn');
			//一定先删除class=on
			for (var i=0;i<=this.btns.length-1;i++) {
				if(this.btns[i].className.indexOf(' on')>0)
				{
					this.btns[i].className=this.btns[i].className.replace(' on','');
					break;
				}
			}
			this.btns[this.index-1].className+=' on';
			this.oldIndex=this.index;
		},
		autoPlay:function(){
			var _this=this;
			this.timer=setInterval(function(){
				_this.next_btn.click();
			},4000);
		},
		stopPlay:function(){
			if(this.timer) clearInterval(this.timer);
		},
		/*touch*/
		touchStart:function(e) { // 滑屏开始
			var touch = event.touches[0];
			this._startX = touch.pageX;
			e.data.global.stopPlay();
			// console.log(this._startX);
		},

		touchMove:function () { // 滑屏
			var touch = event.touches[0];
			this._endX = touch.pageX;
			// console.log(this._startX+"----"+this._endX);
		},
		touchEnd:function(e) { // 滑屏结束
			console.log(e.data.global.animated);
			//test
			if (!e.data.global.animated) return;
			if(this._endX-this._startX>10) {
				// 必须先停掉timmer
				e.data.global.stopPlay();
				e.data.global.index++;
			}else if(this._endX-this._startX<-10&&this._endX>0){
				console.log(this._startX+'---'+this._endX+'--left');
				// 必须先停掉timmer
				e.data.global.stopPlay();
				e.data.global.index--;
			}
			// console.log(event);
			e.data.global.animateByIndex();
			e.data.global.stopPlay();
			e.data.global.autoPlay();
			this._endX = 0;
			this._startX = 0;
		},
	});

	return {PicChange:PicChange};
});

