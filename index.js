// require tmi.js, the discord.js Collection class, fs, and colors
const TMI = require('tmi.js');
const C = require('@discordjs/collection');
const fs = require('fs');
const col = require('colors');

// Define config options
const config = {
  identity: {
    username: process.env.bot_user,
    password: process.env.oauth_token
  },
  channels: [process.env.channel]
};

// Colour setup
col.setTheme({
  c: 'brightGreen',
  t: 'brightMagenta',
  n: 'white',
});

// Create the client + initialize client info
const client = new TMI.client(config);
client.up = Date.now();
client.commands = new C.Collection();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for(const file of commandFiles) {
  let cmd = require(`./commands/${file}`);
  client.commands.set(cmd.info.name, cmd);
}

// [E] triggers when a message comes in
client.on('message', (channel, ustate, msg, self) => {
  if(self || !msg.trim().startsWith(process.env.prefix)) return;

  // Trim whitespace + split off command and arguments
  const args = msg.trim().slice(process.env.prefix.length).split(/ +/);
  const cmdX = args.shift().toLowerCase();

  // Find the command
  const command = client.commands.get(cmdX) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(cmdX));
  if(!command) return;

  // Don't run any non-experimental commands when experimental mode is off
  if(process.env.exp === "0" && command.info.wip === 1) {
    if(ustate.badges.broadcaster && ustate.badges.broadcaster === '1')
      return client.action(channel, "can't do that right now. feed them experimental ink then try again!");
    else
      return client.action(channel, "can't do that right now.");
  }

  // Run the command
  try {
    command.run.execute(channel, ustate, msg, client);
  } catch(e) {
    console.log(`${command.info.log} error thrown:\n${e.stack}`);
  }
});

// [E] triggers on login
client.on('connected', (addr, port) => {
  console.log(`[N:INDX] pronter go `.n + `brrrr`.bold.italic.n + ` - connected to ${addr}:${port}`.n);
});

// [E] triggers on twitch ping
client.on('ping', () => {
  client.ping()
    .then(l => {
      console.log(`[T:PING] current latency: ${l*1000}ms`.t);
  }).catch(e => {
      console.log(`[T:PING] error thrown: ${e}`);
  });
});

// [E] triggers on twitch pong
client.on('pong', l => {
  console.log(`[T:PONG] current latency: ${l*1000}ms`.t);
})

// Connect to Twitch
client.connect();