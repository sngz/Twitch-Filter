var blockedStreamers = ['/m0e_tv', '/summit1g', '/sodapoppin'];
var blockedGames = ['League of Legends', 'Dota 2'];

$(document).ready(function() {

	console.log("LOADED");
	blockGames(blockedGames);
	blockStreamers(blockedStreamers);
	addBlockUserButtons();

	MutationObserver = window.MutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    // fired when a mutation occurs
	    blockGames(blockedGames);
	    blockStreamers(blockedStreamers);
	    //addBlockUserButtons();
	    // ...
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	var target = document;
	var config = {subtree: true, attributes: false, childList: true, characterData:false};
	observer.observe(target, config);
});

function blockStreamers(blockedStreamers) {
	var streamUserNames = document.querySelectorAll('a.cap');
	for(i = 0; i < streamUserNames.length;i++)
	{
		var item = streamUserNames[i];
	    var blockedBoolean = $.inArray(item.getAttribute('href'), blockedStreamers);
	    if (blockedBoolean != -1) {
	    	$(item).closest('div[class^="stream item"]').parent().remove();
	    }
	}
};

function blockGames(blockedGames) {
	var streamBoxArts = document.querySelectorAll('a.boxart');
	for(i=0; i < streamBoxArts.length;i++)
	{
		var item = streamBoxArts[i];
		var blockedBoolean = $.inArray(item.getAttribute('title'), blockedGames);
		if (blockedBoolean != -1) {
			$(item).closest('div[class^="stream item"]').parent().remove();
		}
	}
};

function addBlockUserButtons() {
	var usersList = $('p.info').find('a:first');
	for(i = 0; i < usersList.length;i++) {
		var user = usersList[i];
		var streameUserName = user.text;
		var blockIdName = 'blockuser_link_' + streameUserName;
		var newNode = document.createElement('a');
		newNode.setAttribute('href', '#');
		newNode.setAttribute('id', blockIdName);
		$(newNode).text('BLOCK');
		user.parentNode.insertBefore(newNode, user.nextSibling);
		document.getElementById(blockIdName).addEventListener('click', createBlockUserFunc(streameUserName));
	}
};

function createBlockUserFunc(i) {
    return function() {
    	blockUser(i);
    };
}

function blockUser(streamer){
	streamer = "/"+streamer;
	blockedStreamers.push(streamer);
	blockStreamers(blockedStreamers);
};