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
		},
		//为Carousel中的元素绑定事件
		bindUI:function(){
			// this.container.delegate('.prev_btn','click',this.showPic(picNum-1));
			// this.container.delegate('.next_btn','click',this.showPic(picNum+1));
		},
		showPic:function(picNum){
			var half=Math.ceil(this.config.pics.length/2);
			picNum=picNum%this.config.pics.length;
			console.log(picNum);				
			for (var i =0;i<=this.config.pics.length - 1;i++) {
				var flagNum=(i+picNum)%(this.config.pics.length)%half;		
				console.log(flagNum);				
				var imgW=Math.pow(0.8,(half-flagNum-1))*64;
				var imgH=Math.pow(0.8,(half-flagNum-1))*100;
				$('#imgA'+i).css({
					'zIndex':flagNum,
				});
				// console.log(Math.floor(i/half));
				if(i<half-1){
					$('#imgA'+i).css({
						 'left':(18/(half-1)*flagNum)+'%',
						 'top':(100-imgH)+'%',
						 // 'display':'none',
					});
				}else if(i==half-1){
					$('#imgA'+i).css({
						'left':'18%',
					// 'top'
					});
				}else if(i>half-1){
					var right=18/(half-1)*flagNum;
					console.log(i+'----'+right);
					$('#imgA'+i).css({
						 // 'right':(18/(half-1)*flagNum)+'%',
						 'left':(100-imgW-right)+'%',
						 'top':(100-imgH)+'%',
						 // 'display':'none'
					});
				}
				$('#imgA'+i).css({
					'width':imgW+'%',
					'height':imgH+'%',
					'opacity':Math.pow(0.6,(half-flagNum-1))
				});
			}
		},
		//停止播放
		stopAutoPlay:function(){

		}
		
	});

return {Carousel:Carousel};
});