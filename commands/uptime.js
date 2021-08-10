exports.run = {
  execute(channel, ustate, msg, self, client) {
    client.say(channel, "sorry, i'm not self-aware yet. *shrug*");
    return console.log(`${exports.info.log} test successful - make prontbot self-aware next time`);
  }
}

exports.info = {
  "name": "uptime",
  "log": "[C:UPTM]",
  "aliases": ["up", "online", "readytime"],
  "wip": 1
}