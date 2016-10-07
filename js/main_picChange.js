/**
 *requireJS的入口
 * by Xuewa 2016-09-14
 */
require.config({
    // baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery-1.9.1.min',
        // picChange:'picChange'
    }
});

require(["jquery","picChange"], function($,c) {
   // console.log(c);
   
	var picChange=new c.PicChange({
		// width:700,
		// height:270,
		// picWid:640,
		pics:['images/1.jpg','images/2.jpg','images/3.jpg',
			  'images/4.jpg','images/5.jpg','images/6.jpg',]
	}).render().autoPlay();
});