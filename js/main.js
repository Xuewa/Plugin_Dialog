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
   
	var d=new d.Dialog({
		type:"ques",
		text:"你确定下单吗？",
		buttons:[
			{
				type:"left",
				text:"取消",
				callBack:function(){
					console.log('cancel!!');
				}
			},{
				type:"right",
				text:"确认下单",
				callBack:function(){
					
				}
			}
		]
	}).render();/*.on('alert',function(){
		alert('on function');
	});*/


});