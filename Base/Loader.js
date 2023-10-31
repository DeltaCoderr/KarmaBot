const fs = require('fs');
const path = require('path');

module.exports = {
  loadCommands: async function (client) {
    const commandsDir = path.join(__dirname, '../Commands');

    // Use async readdir to make it non-blocking
    const dirContents = await fs.promises.readdir(commandsDir);

    for (const dir of dirContents) {
      const dirPath = path.join(commandsDir, dir);
      const commands = await fs.promises.readdir(dirPath);

      for (const file of commands) {
        const filePath = path.join(dirPath, file);
        const pull = require(filePath);

        if (pull.help && pull.help.name) {
          client.commands.set(pull.help.name, pull);

          if (pull.help.aliases && Array.isArray(pull.help.aliases)) {
            pull.help.aliases.forEach((alias) => {
              client.aliases.set(alias, pull.help.name);
            });
          }
        }
      }
    }

    console.log(`Successfully loaded ${client.commands.size} commands.`);
  },

  loadEvents: async function (client) {
    const eventsDir = path.join(__dirname, '../Events');
    const eventFiles = await fs.promises.readdir(eventsDir);

    for (const file of eventFiles) {
      const eventName = path.parse(file).name;
      const event = require(path.join(eventsDir, file));

      client.on(eventName, (eventHandler) => event(eventHandler, client));
    }

    console.log(`Successfully loaded ${eventFiles.length} events.`);
  },
};
