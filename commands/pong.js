exports.run = {
  execute(channel, ustate, msg, self, client) {
    client.say(channel, "ping! [tbd]");
    return console.log('[C:PONG] test successful');
  }
}

exports.info = {
  "name": "pong",
  "wip": 1
}