const { MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const { sfw: { smug }, } = new nekos();

module.exports = {
    help: {
        name: 'smug',
        aliases: ['smug'],
        description: 'Yes, Smug.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        const { url } = await smug().catch(() => { });

        if (!url) return message.channel.send(`Could not connect to nekos.life`);

        message.channel.send(
            new MessageEmbed()
                .setColor(config.embedcolor)
                .setImage(url)
                .setDescription(`${message.member} smugs.`)
        );
    }
}