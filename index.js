const tmi = require('tmi.js');
const fs = require('fs');

// Define configuration options
const config = {
  identity: {
    username: process.env.bot_username,
    password: process.env.oauth_token
  },
  channels: [process.env.channel_name]
};

// Create a client with our options
const client = new tmi.client(config);
const commands = new Object();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  Object.defineProperty(commands, command.help.name, {
    value: command,
    writable: false
  });
}

// triggers when a message comes in
client.on('message', (channel, ustate, msg, self) => {
  if(self || !msg.trim().startsWith(process.env.prefix)) return;

  // Trim whitespace + split off command and arguments
  const args = msg.trim().slice(process.env.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // todo: dynamic handler (similar to gyro but with arrays/objects?)
});

// triggers on login
client.on('connected', (addr, port) => {
  console.log(`pronter go brrrr (connected to ${addr}:${port})`);
});

// triggers on twitch ping
client.on('ping', () => {
  client.ping()
    .then(l => {
      console.log(`[PING] current latency: ${l}sec`);
  }).catch(e => {
      console.log(`[PING] error thrown: ${e}`);
  });
});

// triggers on pong
client.on('pong', l => {
  console.log(`[PONG] current latency: ${l}sec`);
})

// Connect to Twitch
client.connect();