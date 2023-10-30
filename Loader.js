const glob = require("glob");
const fs = require("fs/promises"); // Use the async version of fs
const { promisify } = require("util");
const { Bot } = require("./Structures/Client");

const globPromise = promisify(glob);

/**
 * @param {Bot} client
 */

async function loadCommands(client) {
  try {
    const commandFolders = await fs.readdir('./Commands');

    for (const folder of commandFolders) {
      const commandFiles = (await fs.readdir(`./Commands/${folder}`)).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.slashCommands.push(command.data.toJSON());
        console.log(`[LOADED]: Command - ${file}`);
      }
    }
  } catch (error) {
    console.error(`An error occurred while loading commands: ${error}`);
  }
}

async function loadEvents(client) {
  try {
    const files = await fs.readdir(`${__dirname}/Events`);
    if (!files.length) {
      console.warn(`[WARN]: Event Folder Doesn't have any files.`);
      return;
    }

    for (const file of files) {
      const event = require(`./Events/${file}`);
      const eventName = file.split(".")[0];
      const eventHandler = (...args) => event.execute(...args, client);

      if (event.once) {
        client.once(eventName, eventHandler);
      } else {
        client.on(eventName, eventHandler);
      }
      console.log(`[LOADED]: Event - ${file}`);
    }
  } catch (error) {
    console.error(`An error occurred while loading events: ${error}`);
  }
}

async function loadSelectMenus(client) {
  try {
    const SelectMenuFiles = (await fs.readdir(`./SelectMenus`)).filter(file => file.endsWith('.js'));
    for (const file of SelectMenuFiles) {
      const selectMenu = require(`./SelectMenus/${file}`);
      client.selectMenus.set(selectMenu.data.name, selectMenu);
      console.log(`[LOADED]: SelectMenu - ${file}`);
    }
  } catch (error) {
    console.error(`An error occurred while loading Select Menus: ${error}`);
  }
}

module.exports = { loadCommands, loadEvents, loadSelectMenus };
