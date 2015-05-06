$(document).ready(function() {

	var blockedStreamers = ['/m0e_tv', '/summit1g'];
	var blockedGames = ['League of Legends', 'Dota 2'];

	blockGames(blockedGames);
	blockStreamers(blockedStreamers);
	addBlockUserButtons();

	MutationObserver = window.MutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    // fired when a mutation occurs
	    //console.log('MutationObserver Triggered');
	    blockGames(blockedGames);
	    blockStreamers(blockedStreamers);
	    // ...
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	var target = document//.querySelector('.js-streams.streams.items');
	var config = {subtree: true, attributes: false, childList: true, characterData:false}
	observer.observe(target, config);
});

function blockStreamers(blockedStreamers) {
	var streamUserNames = document.querySelectorAll('a.cap');
	for(i = 0; i < streamUserNames.length;i++)
	{
	    var item = streamUserNames[i];
	    var blockedBoolean = $.inArray(item.getAttribute('href'), blockedStreamers);
	    if (blockedBoolean != -1) {
	    	$(item).closest('div[class^="stream item"]').remove();
	    	//console.log('blocked ' + item.getAttribute('href'));
	    }
	}
}

function blockGames(blockedGames) {
	var streamBoxArts = document.querySelectorAll('a.boxart');
	for(i=0; i < streamBoxArts.length;i++)
	{
		var item = streamBoxArts[i];
		var blockedBoolean = $.inArray(item.getAttribute('title'), blockedGames);
		if (blockedBoolean != -1) {
			$(item).closest('div[class^="stream item"]').remove();
			//console.log('blocked ' + item.getAttribute('title'));
		}
	}
}

function addBlockUserButtons() {
	var usersList = $('p.info').children('a');
	for(i=0; i < usersList.length;i++) {
		var user = usersList[i];
		var newNode = document.createElement('a');
		newNode.setAttribute('href', '#');
		$(newNode).text('BLOCK');
		user.parentNode.insertBefore(newNode, user.nextSibling);
	}
}