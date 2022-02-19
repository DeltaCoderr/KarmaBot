<<<<<<< Updated upstream:Commands/Fun/ping.js
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'ping',
		aliases: ['latency'],
		description: 'Shows Bot\'s Latency',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setDescription('Calculating ping.');
		const msg = await message.reply({ embeds: [embed] });
		embed.setThumbnail('https://i.imgur.com/yny2Ktc.gif');
		embed.setTitle(`**${message.author.tag}**  🏓`);
		embed.setDescription(
			`**❯ Bot Latency:** \`${Math.round(msg.createdTimestamp - message.createdTimestamp)} ms\`\n
			**❯ API Latency:** \`${Math.round(client.ws.ping)} ms\``,
		);
		embed.setTimestamp();
		embed.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
		msg.edit({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'ping',
        aliases: ['ping'],
        description: 'Shows Bot\'s Latency',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message) => {
       
        const embed = new MessageEmbed()
              .setColor(config.embedcolor)
              .setThumbnail("https://media.discordapp.net/attachments/747094092596510841/767079159977082910/2102a19ea556e1d1c54f40a3eda0d775.gif")
              .setDescription(`**${message.author.tag}**  🏓`)
              .addField("• Ping:", `\`${Math.round(client.ws.ping)} ms\``, true)
              .setTimestamp()
              .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
         message.channel.send(embed);
    },
}
>>>>>>> Stashed changes:old/Commands/Fun/ping.js
