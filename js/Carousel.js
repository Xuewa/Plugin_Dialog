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
					var pic_item=$("<li class='carousel_item'"+
						" style='z-index:"+(5-i)+";left:"+(100/4*i)+"%'>"+
						"<a href='#'><img id='img"+i+"' src='"+pic+"' "+ 
						"style='width:"+imgW+"%;height:"+imgW+"%;opacity:"+(imgW*0.8/100)+"'/></a></li>");
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
			this.container.delegate('.prev_btn','click',this.showPic(picNum-1));
			this.container.delegate('.next_btn','click',this.showPic(picNum+1));
		},
		showPic:function(picNum){
			var imgDom=$('#img'+picNum);
			var half=Math.ceil(this.config.pics.length/2);
			for (var i =0;i<=this.config.pics.length - 1;i++) {
				// var flagNum=
			}
		}
		
	});

return {Carousel:Carousel};
});