/**
 * Widget类高度抽象
 * by Xuewa 2016-09-11
 */
define(["jquery"],function(w,$){
	function Widget(){
		this.DialogBox=null;
	}

	Widget.prototype={
		//绑定事件
		on:function(type,handler){
			if(typeof this.handlers[type]=='undefined'){
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
			// alert('on function');
		},
		//触发事件
		fire:function(type,data){

		},
		render:function(){
			this.renderUI();
			this.handlers={};
			this.initUI();
			this.bindUI();
		},
		//删除插件
		destroy:function(){
			this.destructor();
		},
		renderUI:function(){},
		bindUI:function(){},
		destructor:function(){},
		initUI:function(){}
	};

	//返回是对象
	return {Widget:Widget};
});