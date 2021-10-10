const Discord = require('discord.js');
const config = require('../../Configs/config');
const emotes = require('../../Configs/emotes');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'addemoji',
		aliases: [],
		description: 'Adds an emoji to your server',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message, args) => {
		if (!message.member.permissions.has('1073741824n')) {
			return message.reply(
				`${emotes.error} You don't have the \`MANAGE_GUILD\` permission to use this command.`,
			);
		}

		const URL = args[0];
		if (!URL || !Functions.isUrl(URL)) {
			return message.reply('Please provide an emoji url.');
		}

		const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, '') : null;
		if (!name) {
			return message.reply('Please provide an emoji name.');
		}
		if (name.length < 2 || name > 32) {
			return message.reply(
				'Emoji name should be greater than 2 and less than 32.',
			);
		}

		try {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${emotes.verified} Emoji Added`)
				.setDescription(
					`${emotes.verified} Emoji has been Added! | Name : ${name} | Preview : [Click Here](${URL})`,
				);

			await message.guild.emojis.create(URL, name);
			message.reply({ embeds: [embed] });
		} catch (err) {
			console.log(err);
			return message.reply(`${emotes.error} An error has occured!`);
		}
	},
};
