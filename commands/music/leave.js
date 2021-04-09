const { embedcolor } = require('../../configs/config.json');
const Discord = require('discord.js')
module.exports = {
    config: {
        name: "leave",
        aliases: [],
        category: "music",
        description: "Leave the voice channel",
    },
run: async (client, message, args) => {

const embednoinvoice = new Discord.MessageEmbed()
.setTitle('Error!')
.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
.setFooter('Karma Music System')
.setColor(embedcolor)
if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

client.player.setRepeatMode(message, false);
client.player.stop(message);

await message.member.voice.channel.leave()

const left = new Discord.MessageEmbed()
.setTitle('Left The Voice Channel')
.setDescription(`${client.emotes.success} **Successfully left the voice channel!**`)
.setFooter('Karma Music System')
.setColor(embedcolor)
return message.channel.send(left)
}
}
