const Discord = require('discord.js');

const Database = require('../../Structures/Database');

module.exports = {
	help: {
		name: 'disablechatbot',
		aliases: [],
		description: 'Disables the channel for the chatbot',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		if (
			!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)
		) {
			return message.reply(
				`${emotes.error} You don't have the \`MANAGE_GUILD\` permission to use this command.`,
			);
		}

		const db = await Database.findOne({ _id: message.guild.id });
		const channel = db ? db.chatbot : null;

		if (!channel) {
			return message.reply(
				`${emotes.error} There is no chatbot channel to disable!`,
			);
		} else {
			await Database.findOneAndDelete(
				{ _id: message.guild.id },
				{ useFindAndModify: false },
			);
			return message.reply(
				`${emotes.verified} Chatbot has been succesfully disabled!`,
			);
		}
	},
};
