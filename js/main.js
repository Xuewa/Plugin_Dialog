/**
 *requireJS的入口
 * by Xuewa 2016-09-11
 */
require.config({
    // baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery-1.9.1.min'
    }
});
require(["jquery","Dialog"], function($,d) {
   // testing引入jq
   // console.log("jquery!");
   
	var dialog=new d.Dialog({
		type:"ques",
		text:"你确定下单吗？",
		buttons:[
			{
				type:"left",
				text:"取消",
				callBack:function(that){
					// console.log(that);
					// that.fire('hide');
				}
			},{
				type:"right",
				text:"确认下单",
				callBack:function(){
					
				}
			}
		]
	}).render();

});