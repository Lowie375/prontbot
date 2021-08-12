// Require bent and colors
const bent = require('bent');
const helix = bent('https://api.twitch.tv/helix');
const col = require('colors');

function reDateTimer(ms) {
  // Converts milliseconds into 
  let secs = Math.floor(ms/1000); // seconds
  let mins = Math.floor(secs/60); // minutes
  secs -= mins*60;
  let hrs = Math.floor(mins/60); // hours
  mins -= hrs*60;
  let days = Math.floor(hrs/24); // days
  hrs -= days*24;

  // Outputs the data above in a nice format
  let display = "";
  switch (days) {
    case 0: break;
    case 1: display += `${days}d `; break;
    default: display += `${days}d `; break;
  }
  display += `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  // Returns the output
  return display;
}

exports.run = {
  execute(channel, ustate, msg, client) {
    // get current stream info (broken code atm, will try to redo eventually)
    /*helix('/streams', 200, {'authorization': `Bearer ${process.env.app_token}`, 'user-login': channel,})
    helix('/users', {'authorization': `Bearer ${process.env.app_token}`, 'login': channel})
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log(e.stack);
    });*/

    // get current time
    var now = Date.now();

    // prep outputs
    //var streamUp = now - Date(streamInfo.data[0].started_at)
    var botUp = now - client.up;
    var redate = reDateTimer(botUp);

    // output prontbot uptime
    client.say(channel, `i've been online for ${redate}!`);
    return console.log(`${exports.info.log} ${redate} (${botUp}ms)`.c);
  }
}

exports.info = {
  "name": "uptime",
  "log": "[C:UPTM]",
  "aliases": ["up", "online", "readytime"],
  "wip": 1
}