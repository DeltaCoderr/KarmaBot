const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'ping',
		aliases: ['latency'],
		description: 'Shows Bot\'s Latency',
		category: __dirname.split('Commands/')[1],
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
