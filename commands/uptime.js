exports.run = {
  execute(channel, ustate, msg, self, client) {
    client.say(channel, "sorry, i'm not self-aware yet. *shrug*");
    return console.log('[C:UPTIME] test successful');
  }
}

exports.info = {
  "name": "uptime",
  "aliases": ["up", "online", "readytime"],
  "wip": 1
}