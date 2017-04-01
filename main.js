var Steam = require('steam');

var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser(steamClient);
var steamFriends = new Steam.SteamFriends(steamClient);

steamClient.connect();
steamClient.on('connected', function() {
	steamUser.logOn({
		account_name: 'username',
		password: 'password'
	});
});

steamClient.on('logOnResponse', function(logonResp) {
	if(logonResp.eresult === Steam.EResult.OK) {
		console.log("Connected to Steam");
		start();
	}
});

steamFriends.on('friendMsg', function(user, message, type){
	if(type == Steam.EChatEntryType.ChatMsg) {
		steamFriends.sendMessage(user, "this is a bot");
	}
});

function sbhtimer() {
	steamUser.gamesPlayed(null);
	console.log("stopped game");
	setTimeout(start, 3000);
}

function start() {
		console.log("Set online/offline Status...");
		steamFriends.setPersonaState(Steam.EPersonaState.Online);
		console.log("Starting games...");
		steamUser.gamesPlayed({"games_played": [{"game_id": 730}]});
		console.log("games started");
		console.log("happy idling");
		setTimeout(sbhtimer, 1800000);
}