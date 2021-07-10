const { MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const { sfw: { tickle }, } = new nekos();


module.exports = {
    help: {
        name: 'tickle',
        aliases: ['tickle'],
        description: 'TICKLE THEM RN.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {
        const { url } = await tickle().catch(() => { });

        if (!url) return message.channel.send(`Could not connect to nekos.life`);

        const embed = new MessageEmbed();

        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === client.user.id
        ) {
            return message.channel.send(
                `B~Baka ${message.member}! Stop that~ it tickles!`
            );
        } else if (
            message.mentions.members.size &&
            message.mentions.members.first().id === message.author.id
        ) {
            return message.channel.send(`Wai~ Seriously!?`);
        } else if (message.mentions.members.size) {
            return message.channel.send(
                embed
                    .setColor(config.embedcolor)
                    .setDescription(`${message.member} started tickling ${message.mentions.members.first()}!`)
                    .setImage(url)
            );
        } else {
            return message.channel.send(
                embed.setColor(config.embedcolor).setImage(url)
            );
        }
    }
}