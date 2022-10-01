const glob = require("glob");
const fs = require("fs");
const { promisify } = require("util");
const { Bot } = require("./Structures/Client");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */

async function LoadCommands(client) {
  const commandFiles = await globPromise(`${__dirname}/Commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });
  console.log(`[LOADED] : `);
}

async function LoadEvents(client) {
  fs.readdir(`${__dirname}/Events`, async (err, files) => {
    if (err)
      return console.error(
        `An Error Occcured While Loading Events. ${err.stack}`
      );

    if (!files)
      return console.warn(`[WARN]: Event Folder Doesn't have any files.`);

    for (let i = 0; i < files.length; i++) {
      const event = require(`./Events/${files[i]}`);
      let eventName = files[i].split(".")[0];
      client.on(eventName, event.bind(null, client));
      console.log(`[LOADED]: Event - ${files[i]}`);
    }
  });
}

module.exports = { LoadCommands, LoadEvents };
