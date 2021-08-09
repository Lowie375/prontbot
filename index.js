// require tmi.js, the discord.js Collection class, and fs
const TMI = require('tmi.js');
const C = require('@discordjs/collection');
const fs = require('fs');

// Define config options
const config = {
  identity: {
    username: process.env.bot_username,
    password: process.env.oauth_token
  },
  channels: [process.env.channel_name]
};

// Create the client
const client = new TMI.client(config);

// Load commands
const commands = new C.Collection();
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for(const file of commandFiles) {
  let cmd = require(`./commands/${file}`);
  commands.set(cmd.info.name, cmd);
}

// [E] triggers when a message comes in
client.on('message', (channel, ustate, msg, self) => {
  if(self || !msg.trim().startsWith(process.env.prefix)) return;

  // Trim whitespace + split off command and arguments
  const args = msg.trim().slice(process.env.prefix.length).split(/ +/);
  const cmdX = args.shift().toLowerCase();

  const command = commands.get(cmdX) || commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(cmdX));

  try {
    command.run.execute(channel, ustate, msg, self, client);
  } catch(e) {
    console.log(e.stack);
  }

  if(process.env.exp === "0" && command.info.wip === 1) {
    if(ustate.badges.broadcaster && ustate.badges.broadcaster === '1')
      client.action(process.env.channel_name, "can't do that right now. feed them experimental ink then try again!");
    else
      client.action(process.env.channel_name, "can't do that right now.");
  }
});

// [E] triggers on login
client.on('connected', (addr, port) => {
  console.log(`pronter go brrrr - connected to ${addr}:${port}`);
});

// [E] triggers on twitch ping
client.on('ping', () => {
  client.ping()
    .then(l => {
      console.log(`[T:PING] current latency: ${l}sec`);
  }).catch(e => {
      console.log(`[T:PING] error thrown: ${e}`);
  });
});

// [E] triggers on twitch pong
client.on('pong', l => {
  console.log(`[T:PONG] current latency: ${l}sec`);
})

// Connect to Twitch
client.connect();