// ==UserScript==
// @name	books24x7_readable
// @namespace	http://zhangtai.me
// @description	Change fonts on books24x7
// @author	Zhang Tai
// @version	1.2
// @require jquery.js
// @resource bootstrap bootstrp.css
// @include	http://www.books24x7.com/assetviewer.aspx*
// ==/UserScript==

$(document).ready(function(){
    
    progressRaw = $(".b24-chunknavigate img[title]").attr("title");
    progressDig = $(".b24-chunknavigate img[title]").attr("title").match(/\d+/g);
    
    (function(font) {
	var	head = document.getElementsByTagName('head')[0],
		link = document.createElement('link'),
		style = document.createElement('style'),
		rules = document.createTextNode('#ctl00_ContentPlaceHolder1_ContentPanel * { font-family: "' + font.family + '", arial, sans-serif !important }');

    link.rel  = 'stylesheet';
	link.href = 'http://fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
	head.appendChild(link);
	
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	head.appendChild(style);
    
})({ family:'Antic Slab', style:['400','700'] });


  
$( "#ctl00_ContentPlaceHolder1_TopProgressControl_PreviousSection" ).attr( "src", "http://icons.iconarchive.com/icons/visualpharm/ios7v2/32/Arrows-Back-icon.png" );
$( "#ctl00_ContentPlaceHolder1_TopProgressControl_NextSection" ).attr( "src", "http://icons.iconarchive.com/icons/visualpharm/ios7v2/32/Arrows-Forward-icon.png" );
    
$( "#FullText1" ).before( "<a href='http://www.books24x7.com/bookshelf.asp'><img src='http://png-1.findicons.com/files/icons/1580/devine_icons_part_2/24/home.png' /></a>" );
$( "#UnattachedAnnotationsHere" ).after("<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: " + progressDig + "%;'>" + progressRaw + "</div></div>");
    
    
    
});