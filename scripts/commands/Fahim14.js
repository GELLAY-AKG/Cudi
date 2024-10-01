const fs = require("fs");
module.exports.config = {
  name: "Fahim14",
  version: "2.0.0",
  permission: 0,
  credits: "nayan",
  description: "",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("@Fʌʀɩʜʌ Aĸtʜɘʀ Pʀɩƴʌ")==0 || (event.body.indexOf("priya")==0 || (event.body.indexOf("fariya")==0 || (event.body.indexOf("l")==0)))) {
		var msg = {
				body: "সবাই দেখে রাখো যে এইটা আমাদের বস ফাহিম এর বউ 😇😻 :))"
    }
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
