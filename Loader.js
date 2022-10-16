const glob = require("glob");
const fs = require("fs");
const { promisify } = require("util");
const { Bot } = require("./Structures/Client");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */

async function LoadCommands(client) {


  const commandFolders = fs.readdirSync('./Commands');

  for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`./Commands/${folder}/${file}`);
      client.commands.set(command.data.name, command);
      client.slashCommands.push(command.data.toJSON());
      console.log(`[LOADED]: Command - ${file}`);
    }
  }
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
      if(event.once) client.once(eventName, (...args)=> event.execute(...args, client));
      else client.on(eventName, (...args)=> event.execute(...args, client));
      console.log(`[LOADED]: Event - ${files[i]}`);
    }
  });
}

async function LoadSelectMenus(client) {
  const SelectMenuFiles = fs.readdirSync(`./SelectMenus`).filter(file => file.endsWith('.js'));
  for (const file of SelectMenuFiles) {
    const selectMenu = require(`./SelectMenus/${file}`);
    client.selectMenus.set(selectMenu.data.name, selectMenu);
    console.log(`[LOADED]: SelectMenu - ${file}`);
  }
}

module.exports = { LoadCommands, LoadEvents, LoadSelectMenus };
