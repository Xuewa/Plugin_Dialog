define(["Widget","jquery"],function(w,$){

	function Dialog(config){
		this.config={
			type:"loading",
			text:"加载中...",
			buttons:null
		}
		this.extend(config);
		console.log(this.config);
	};
		
	Dialog.prototype=$.extend({},new w.Widget(),{
		renderUI:function(){
			this.container=$("<div class='dialog_container'></div>")
			if(this.config.type=='ques'){
				//dialog_window
				this.win=$("<div class='dialog_window "+this.config.type+"_win'></div>");
				//dialog_icon
				this.icon=$("<div class='dialog_icon "+this.config.type+"_icon'><span></span></div>");
			}else{
				this.win=$("<div class='dialog_window tip_win'></div>");
				this.icon=$("<div class='dialog_icon "+this.config.type+"_icon'></div>");
			}
			this.text=$("<div class='dialog_text'>"+this.config.text+"</div>");
			//dialog_btns
			if(this.config.buttons){
				this.outer_buttons=$("<div class='dialog_btns'></div>")
				for(var i in this.config.buttons){
					var btn=this.config.buttons[i];
					var btn_dom=$("<span class='"+btn.type+"_btn'>"+btn.text+"</span>");
					this.outer_buttons.append(btn_dom);
				}
			}
			this.container.append(this.win);
			this.win.append(this.icon);
			this.win.append(this.text);
			if(this.outer_buttons) this.win.append(this.outer_buttons);
			$('body').append(this.container);
			// alert(this.container.attr('class'));
		},
		//为dialog中的元素绑定事件
		bindUI:function(){
			var that=this;
			if(this.config.buttons!=null){
				for (var i =0;i<=this.config.buttons.length - 1;i++) {
					//btn绑定事件
					var btn=this.config.buttons[i];
					if(btn.callBack!=null){
						this.container.delegate('.'+this.config.buttons[i].type+'_btn',
							'click',btn.callBack);
					}
				}
			}
		},
		show:function(){
			this.fire('show');
		},
		hide:function(){
			this.fire('show');
		}
	});

return {Dialog:Dialog};
});