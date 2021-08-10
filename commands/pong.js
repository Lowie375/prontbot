exports.run = {
  execute(channel, ustate, msg, self, client) {
    let start = Date.now();
    client.ping()
    .then(l => {
      client.say(channel, "pong? VoHiYo")
      .then(() => {
        let end = Date.now();
        client.say(channel, `${end-start}ms (local) - ${l*1000}ms (twitch)`)
        console.log(`${exports.info.log} local: ${end-start}ms - twitch: ${l*1000}ms`);
      });
    });
  }
}

exports.info = {
  "name": "pong",
  "log": "[C:PONG]",
  "wip": 0
}