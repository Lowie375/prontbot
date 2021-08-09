exports.run = {
  execute(channel, ustate, msg, self, client) {
    client.say(channel, "pong! [tbd]");
    return console.log('[C:PING] test successful');
  }
}

exports.info = {
  "name": "ping",
  "wip": 1
}