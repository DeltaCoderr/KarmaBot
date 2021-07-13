
const fs = require('fs');
const { Bot } = require('./Structures/Client');

/**
 * @param { Bot } client
 */

async function LoadCommands(client) {

    let folders = await fs.readdirSync(`${__dirname}/Commands`);

    folders.forEach((folder) => {
        fs.readdir(`${__dirname}/Commands/${folder}`, (err, files) => {

            if (err) return logger.error(`An Error Occured while Loading Commands. ${err.stack}`);

            if (!files) return logger.warn(`[WARN]: No Files found in "${folder.toUpperCase()}" Dir.`);

            files.forEach((file) => {

                let props = require(`./Commands/${folder}/${file}`);

                /* Name */
                if (!props.help || !props.help.name) return logger.error(`[WARN]: ${file} doesn't have enough Properties.`);

                client.commands.set(props.help.name, props);

                /* Aliases */
                if (!props.help.aliases) return logger.warn(`[WARN]: ${file} doesn't have enough Aliases.`);

                for (i = 0; i < props.help.aliases.length; i++) {
                    client.aliases.set(props.help.aliases[i], props.help.name);
                };
            });
            logger.success(`[LOADED]: Folder - ${folder}`);
        });
    });
}

async function LoadEvents(client) {

    fs.readdir(`${__dirname}/Events`, async (err, files) => {

        if (err) return logger.error(`An Error Occcured While Loading Events. ${err.stack}`);

        if (!files) return logger.warn(`[WARN]: Event Folder Doesn't have any files.`);

        for (i = 0; i < files.length; i++) {
            const event = require(`./Events/${files[i]}`);
            let eventName = files[i].split(".")[0];
            client.on(eventName, event.bind(null, client));
            logger.log(`[LOADED]: Event - ${files[i]}`);
        }
    });
}

async function LoadPlayerEvents(client) {

    const { Player } = require('discord-player');

    const player = new Player(client, {
        enableLive: true,
        autoSelfDeaf: true,
        leaveOnEnd: true,
        leaveOnEndCooldown: 5000,
        leaveOnEmpty: true,
        leaveOnStop: true
    })

    client.player = player

    fs.readdir('./player-events/', (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const event = require(`./player-events/${file}`), eventName = file.split(".")[0];
            logger.info(`Loading player event ${eventName}`);
            client.player.on(eventName, event.bind(null, client));
        });
    });

}

async function LoadButtons(client) {
    const disbut = require('discord-buttons')(client)
}

module.exports = { LoadCommands, LoadEvents, LoadPlayerEvents, LoadButtons }