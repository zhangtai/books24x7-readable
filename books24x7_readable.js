// ==UserScript==
// @name	books24x7_readable - (chapter section)
// @namespace	http://zhangtai.me
// @description	New version - (chapter section)
// @author	Zhang Tai
// @version	1.3
// @require jquery.js
// @include	http://www.books24x7.com/assetviewer.aspx*
// ==/UserScript==

$(document).ready(function(){
    // Font change
    (function(font) {
	var	head = document.getElementsByTagName('head')[0],
		link = document.createElement('link'),
		style = document.createElement('style'),
		rules = document.createTextNode('#ctl00_ContentPlaceHolder1_ContentPanel * { font-family: "' + font.family + '", arial, sans-serif }');

    link.rel  = 'stylesheet';
	link.href = '//fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
	head.appendChild(link);
	
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	head.appendChild(style);
    
    })({ family:'Alef', style:['400','700'] });   //End of the fonts, candidates: Open Sans Condensed, Antic Slab, Bitter, Nunito, Alef
    
    // Page navi panel
	$("#download").after("<a id='newPrevPage' href='#'><span class='pageNaviIndictor'><</span></a><a id='newNextPage' href='#'><span class='pageNaviIndictor'>></span></a>");  
    
    // Get all current chapter articles
    var bookID = $('#ctl00_ContentPlaceHolder1_ChapterMenuSection_AssetIdHidden').attr('value');
    
    // table content change
    $('#divChapterTOCMenu').append('<div id="newChapterSessions" class="ui vertical menu"></div>');
    if (! $('div.b24-chaptertoc2-selected > a').text() == '') {
        $('#newChapterSessions').append('<a href="#" class="item">' + $('div.b24-chaptertoc2-selected > a').text() + '</a>');
    };    
//    $('#newChapterSessions').append('<a href="#" class="item">' + $('div.b24-chaptertoc2-selected > a').text() + '</a>');
    
    var chapterSectionTitle = new Array();
    $('a.b24-chaptertoc2').each(function(){
        $('#newChapterSessions').append('<a href="#" class="item">' + $(this).text() + '</a>');
        chapterSectionTitle.push($(this).text());
    });
    $('#newChapterSessions a.item:first-child').addClass('active');
    chapterSectionTitle.unshift($('div.b24-chaptertoc2-selected > a').text());
    
    // Change first section ID
    var chunkid = new Array();
      $('#divChapterTOCMenu table input').each(function(){
          chunkid.push($(this).attr('value'));
        });
    $('#ctl00_ContentPlaceHolder1_ContentPanel > div > div.chapter').attr("id", chunkid[0]);
      // Load the contents
      for (var i = 1; i < chunkid.length; i++) {
        $('#ctl00_ContentPlaceHolder1_ContentPanel > div').append("<div id='" + chunkid[i] + "' class='chapter' style='display:none;'></div>");
        $('#' + chunkid[i]).load("assetviewer.aspx?bookid=" + bookID + "&chunkid=" + chunkid[i] + " #ctl00_ContentPlaceHolder1_ContentPanel div.chapter > .section");

      }
    
	
    
    // Page navigation.
    var chunkIndex = 0;
    var initProgressChapter = Math.round((chunkIndex + 1) * 100 / chunkid.length);
    $( "#UnattachedAnnotationsHere" ).after("<div class='progress'><div id='progress-bar' class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: " + initProgressChapter + "%;'></div></div>");
	$( ".progress" ).click(function() {
      $( "#MenuTD" ).toggle( "fast" );
    });
    
    $('#newNextPage').click(function() {
      if (chunkIndex < chunkid.length - 1) {
          $('#' + chunkid[chunkIndex]).removeClass('animated fadeInRight fadeInLeft');
          $('#newChapterSessions a:nth-child(' + (chunkIndex + 1) + ')').removeClass('active');
          $('#' + chunkid[chunkIndex]).hide();
          $('#' + chunkid[chunkIndex + 1]).show();
          $('#' + chunkid[chunkIndex + 1]).addClass('animated fadeInRight');
          chunkIndex += 1;
          console.log(chunkIndex);
          $('#newChapterSessions a:nth-child(' + (chunkIndex + 1) + ')').addClass('active');
          var progressChapter = Math.round((chunkIndex + 1) * 100 / chunkid.length);
          $('#progress-bar').css("width", progressChapter + "%");
      }
    });
    
    $('#newPrevPage').click(function() {
      if (chunkIndex > 0) {
          $('#' + chunkid[chunkIndex]).removeClass('animated fadeInRight fadeInLeft');
          $('#newChapterSessions a:nth-child(' + (chunkIndex + 1) + ')').removeClass('active');
          $('#' + chunkid[chunkIndex]).hide();
          $('#' + chunkid[chunkIndex - 1]).show();
          $('#' + chunkid[chunkIndex - 1]).addClass('animated fadeInLeft');
          chunkIndex -= 1;
          $('#newChapterSessions a:nth-child(' + (chunkIndex + 1) + ')').addClass('active');
          console.log(chunkIndex);
          var progressChapter = Math.round((chunkIndex + 1) * 100 / chunkid.length);
          $('#progress-bar').css("width", progressChapter + "%");
      }
    });        
        
    $('#MenuTD').prepend($('#ctl00_ContentPlaceHolder1_AssetMetaUpdatePanel'));
    $('#container #ctl00_ContentPlaceHolder1_AssetMetaUpdatePanel').remove();
    
    $('#ctl00_ContentPlaceHolder1_AssetMetaUpdatePanel a > div > img').hover(function() {
      $( "#ctl00_ContentPlaceHolder1_AssetMetaControl_bookseparator" ).toggle( "fast" );
    });
    
});
