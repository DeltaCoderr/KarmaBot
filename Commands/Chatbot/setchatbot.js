const Discord = require('discord.js');

const Database = require('../../Structures/Database');

module.exports = {
	help: {
		name: 'setchatbot',
		aliases: [],
		description: 'Sets a channel for the Chatbot.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (
			!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)
		) {
			return message.reply(
				`${emotes.error} You don't have the \`MANAGE_GUILD\` permission to use this command.`,
			);
		}

		const channel =
			message.mentions.channels.first() ||
			message.guild.channels.cache.get(args[0]);

		if (!channel || channel.type !== 'GUILD_TEXT') {
			return message.reply('Please enter a Valid Channel!');
		}

		try {
			message.guild.channels.cache
				.get(channel.id)
				.send(`**${emotes.verified} ChatBot Channel Set!**`);

			const db = await Database.findOne({ _id: message.guild.id });

			if (db) {
				db.chatbot = channel.id;
				await db.save();
			} else {
				const newDB = new Database({
					_id: message.guild.id,
					chatbot: channel.id,
				});
				await newDB.save();
			}

			message.reply(`Chatbot has been successfully set in <#${channel.id}>`);
		} catch (error) {
			console.log(error);
			message.reply(`Something went wrong!\n\`${error}\``);
		}
	},
};
