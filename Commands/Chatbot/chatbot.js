const Discord = require('discord.js');


const Database = require('../../Structures/Database');

module.exports = {
	help: {
		name: 'chatbot',
		aliases: [],
		description: 'Shows the Chatbot config.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const db = await Database.findOne({ ID: `chatbot_${message.guild.id}` });
		const channel = db
			? message.guild.channels.cache.get(db.data)
				? `<#${message.guild.channels.cache.get(db.data).id}>`
				: 'None'
			: 'None';

		const embed = new Discord.MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setTitle('🤖 Chatbot Configuration')
			.setDescription(
				`**Chatbot Channel:**
           ${channel}
           
          **${emotes.info} Usage:**
           Type \`${config.prefix}setchatbot\` - To Set a Channel 
           Type \`${config.prefix}disablechatbot\` - To Disable a Channel.
  
          **${emotes.info} Example:**
           \`${config.prefix}setchatbot\` <#${message.channel.id}>
           \`${config.prefix}disablechatbot\``,
			)
			.addField(
				'Support Link: ',
				'**[Click Here!](https://discord.gg/NtyaM9d)**',
				true,
			)
			.addField(
				'Vote Link:',
				'**[Click Here!](https://top.gg/bot/636484020301201418/vote)**',
				true,
			)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
			.setColor(config.embedColor);

		message.reply({ embeds: [embed] });
	},
};
