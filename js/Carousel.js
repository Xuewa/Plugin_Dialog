define(["Widget","jquery"],function(w,$){

	function Carousel(config){
		this.config={
			
		}
		this.extend(config);
		console.log(this.config);
	};
		
	Carousel.prototype=$.extend({},new w.Widget(),{
		renderUI:function(){
			this.container=$("<div class='carousel_container'></div>");
			this.prev_btn=$("<div class='carousel_btn prev_btn'><span class='prev_icon'></span></div>");
			this.next_btn=$("<div class='carousel_btn next_btn'><span class='next_icon'></span></div>");
			this.pics=$("<div class='carousel_pics'></div>");
			this.pic_list=$("<ul class='carousel_list'></ul>");
			//渲染li元素的位置
			if(this.config.pics.length%2==0){
				this.config.pics.push(this.config.pics[0]);
			}
			if(this.config.pics.length>0){
				var imgW=100;
				for (var i =0;i<= this.config.pics.length - 1; i++) {
					var pic=this.config.pics[i];
					imgW=imgW*0.9;
					var pic_item=$("<li class='carousel_item'>"+
						"<a id='imgA"+i+"' href='#' "+
						"style='background-image:url("+pic+");background-repeat:no-repeat;background-size:100% 100%;'/></a></li>");
					this.pic_list.append(pic_item);
				}
			}
			this.container.append(this.prev_btn);
			this.container.append(this.next_btn);
			this.pics.append(this.pic_list);
			this.container.append(this.pics);
			$("body").append(this.container);
			this.renderAllCss();
		},
		//固定每个位置的样式
		renderAllCss:function(){
			this.half=Math.ceil(this.config.pics.length/2);
			this.styleList=[];
			for (var i=0;i<= this.config.pics.length-1;i++){
				var imgaStyle;
				var imgW=Math.pow(0.8,(this.half-i-1))*64;
				var imgH=Math.pow(0.8,(this.half-i-1))*100;
				if(i<this.half-1){
					imgaStyle={
						'zIndex':i,
						'left':(18/(this.half-1)*i)+'%',
						'top':(100-imgH)+'%',
						'width':imgW+'%',
						'height':imgH+'%',
						'opacity':Math.pow(0.6,(this.half-i-1)),
					};
				}else if(i==(this.half-1)){
					imgaStyle={
						'zIndex':i,
						'left':'18%',
						'top':(100-imgH)+'%',
						'width':imgW+'%',
						'height':imgH+'%',
						'opacity':Math.pow(0.6,(this.half-i-1)),
					};
				}else{
					//右半边的位置标识
					var flagNum=this.half-2-(i%(this.half));
					var right=18/(this.half-1)*flagNum;
					imgW=Math.pow(0.6,(this.half-1-flagNum))*64;
					imgH=Math.pow(0.8,(this.half-1-flagNum))*100;
					console.log(i+'----'+right);
					imgaStyle={
						'zIndex':flagNum,
						'left':(100-imgW-right)+'%',
						'top':(100-imgH)+'%',
						'width':imgW+'%',
						'height':imgH+'%',
						'opacity':Math.pow(0.6,(this.half-1-flagNum)),
					};
				}
				this.styleList[i]=imgaStyle;
			};	
			console.log(this.styleList);
		},
		//为Carousel中的元素绑定事件
		bindUI:function(){
			// this.container.delegate('.prev_btn','click',this.showPic(picNum-1));
			// this.container.delegate('.next_btn','click',this.showPic(picNum+1));
		},
		//根据偏移量定位css
		showPic:function(picNum){
			picNum=picNum%this.config.pics.length;
			// console.log(picNum);		
			for (var i =0;i<=this.config.pics.length-1;i++){
				var flagNum=(i+picNum)%this.config.pics.length;
				$('#imgA'+i).css(this.styleList[flagNum]);
			}
			return this;
		},
		// animateBydirection:function(dirFlag){

		// },
		//自动播放******ing******
		autoPlay:function(){
			for (var i =0;i<=this.config.pics.length - 1;i++) {
				var item=$('#imgA'+i);
				// console.log(item);
				if(i<this.config.pics.length-1){
					console.log(this.styleList[i]+'----'+this.styleList[i+1]);
					item.animate(this.styleList[i+1],5000);
				}
				else item.animate(this.styleList[0],5000);
			}
		}
		
	});

return {Carousel:Carousel};
});