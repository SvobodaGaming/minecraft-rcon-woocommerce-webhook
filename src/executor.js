const rcon = require('rcon');
const { RconOptions } = require('../config');

function execute(host, ports, passwords, nickname, value, type) {
    function handleAuth(client) {
      if (type === 'coins') {
        client.send(`${process.env.MC_COINS_ADD} ${nickname} ${value}`);
      } else if (type === 'unban') {
        client.send(`${process.env.MC_UNBAN} ${nickname}`);
      }
    }
  
    function handleResponse(msg) {
      console.log(`RCON response: ${msg}`);
    }
  
    function handleError(err) {
      console.log(`Error: ${err}`);
    }
  
    function handleClose() {
      console.log('Connection closed');
      process.exit();
    }
  
    for (let i = 0; i < ports.length; i++) {
      const client = new rcon(host, ports[i], passwords[i], RconOptions);
  
      client.on('auth', () => handleAuth(client))
        .on('response', handleResponse)
        .on('error', handleError)
        .on('end', handleClose);
      client.connect();
    }
}

module.exports = {
    execute
}
