const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const emotes = require('../../Configs/emotes');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'urban',
		aliases: [],
		description: 'Shows the Urban definition',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.reply(`${emotes.error} Boi, Provide a Word.`);
		}

		let { list } = await undici.fetch(
			`http://api.urbandictionary.com/v0/define?term=${args.join(' ')}`,
		).then((res) => res.json());
		if (list.length === 0) {
			return message.reply(
				`${emotes.error} No results found for **${args.join(' ')}**.`,
			);
		}
		list = Functions.shuffleArray(list);
		list = list[0];

		const embed = new Discord.MessageEmbed()
			.setAuthor(
				'Urban Dictionary',
				'https://files.catbox.moe/kkkxw3.png',
				list.permalink,
			)
			.setThumbnail('https://i.imgur.com/HhgP1Hq.png')
			.setTitle(`Definition of ${list.word}`)
			.setDescription(list.definition)
			.setURL(list.permalink)
			.addField('Example(s)', list.example ? list.example : 'N/A')
			.setColor(config.embedColor)
			.setFooter(`Submitted by ${list.author}`)
			.setTimestamp();
		return message.reply({ embeds: [embed] });
	},
};
