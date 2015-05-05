$(document).ready(function() {
	var streamItems = document.querySelectorAll('a.cap');
	var blockedStreamers = ["/m0e_tv", "/summit1g"];
	for(i = 0; i < streamItems.length;i++)
	{
	    var item = streamItems[i];
	    var blockedBoolean = $.inArray(item.getAttribute('href'), blockedStreamers)
	    if (blockedBoolean != -1) {
	    	$(item).closest('div[class^="stream item"]').css('display', 'none');
	    	console.log("blocked " + item.getAttribute('href'));
	    }
	}
});