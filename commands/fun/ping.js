const Discord = require('discord.js');
const {
    MessageEmbed
} = require('discord.js')
const config = require('../../configs/config.json');


module.exports = {
    config: {
        category: __dirname.split("commands\\")[1],
        name: 'ping',
        description: 'Shows bot latency',
        aliases: ["ping"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail("https://media.discordapp.net/attachments/747094092596510841/767079159977082910/2102a19ea556e1d1c54f40a3eda0d775.gif")
            .setDescription(`**${message.author.tag}**  🏓`)
            .addField("• Ping:", `\`${Math.round(client.ws.ping)} ms\``, true)
            .setTimestamp()
            .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
        message.channel.send(embed);

    }
}