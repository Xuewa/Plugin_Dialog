/**
 * Widget类高度抽象
 * by Xuewa 2016-09-11
 */
define(["jquery"],function($){
	function Widget(config){
		this.config=null;
		this.container=null;
		this.extend(config);
	}

	Widget.prototype={
		extend:function(config){
			this.config=$.extend(this.config,config);
		},
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
			if(typeof this.handlers[type]=='undefined'
				||this.handlers[type].length==0){
				return;
			};
			if(this.handlers[type] instanceof Array)
				for (var i = 0;i<=this.handlers[type].length - 1;i++) {
					this.handlers[type][i](data);
				};
		},
		render:function(){
			this.renderUI();
			this.handlers={};
			this.bindUI();
			//先注册好show和hide方法
			this.on('show',function(){
				this.container.show();
			});
			this.on('hide',function(){
				this.container.hide();
			});
			return this;
		},
		//删除插件
		destroy:function(){
			this.destructor();
		},
		renderUI:function(){},
		bindUI:function(){},
		destructor:function(){},
	};

	//返回是对象
	return {Widget:Widget};
});