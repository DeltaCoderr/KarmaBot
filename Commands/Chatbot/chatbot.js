const Command = require("../../Client/Command");
const { MessageEmbed } = require("discord.js")
const Database = require("../../Client/Database");

module.exports = new Command({
	name: "chatbot",
	aliases: ["chatbot"],
	description: "Shows the Information about the chatbot.",
	category: "Chatbot",
	run: async (client, message, args) => {
		message.reply(`This is a Slash Command \`(/)\``)
	},
	exec: async (client, interaction) => {
		const db = await Database.findOne({ ID: `chatbot_${interaction.guildId}` });
		const channel = db ? interaction.guild.channels.cache.get(db.data) : 'None';

		const embed = new MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setTitle('🤖 Chatbot Configuration')
			.setDescription(`**Chatbot channel:** ${channel}`)
			.addField('・Set Channel', '`/setchatbot`', true)
			.addField('・Disable Channel', '`/disablechatbot`', true)
			.setColor(Config.embedColor)
			.setTimestamp()

		interaction.reply({
			embeds: [embed]
		})

	},
});
