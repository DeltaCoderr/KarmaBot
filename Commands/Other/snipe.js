const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'snipe',
		aliases: [],
		description: 'Shows the latest Deleted Message.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const msg = client.snipes.get(message.channel.id);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTimestamp();
		if (!msg) {
			embed.setDescription(
				`<@${message.author.id}> **There are no deleted messages.**`,
			);
			embed.setAuthor(message.guild.name, message.guild.iconURL());
			embed.setFooter(client.user.username, client.user.avatarURL());
			return message.reply({ embeds: [embed] });
		}

		if (msg.content) {
			embed.addField('Content Of the Message :', msg.content);
			embed.setAuthor(msg.author, msg.authorimg);
			embed.setFooter(
				'Requested by ' + message.author.tag,
				message.author.displayAvatarURL({ dynamic: true }),
			);
			embed.setTimestamp();
		}

		if (msg.image) {
			embed.setImage(msg.image);
			embed.setDescription('**Content of the message:**');
			embed.setAuthor(msg.author, msg.authorimg);
		}

		message.reply({ embeds: [embed] });
	},
};
