const Discord = require('discord.js');
const Canvacord = require('canvacord');
const emotes = require('../../Configs/emotes');

module.exports = {
	help: {
		name: 'comment',
		aliases: ['ytcomment'],
		description: 'Shows your text as a Youtube Comment.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const comment = args.join('');
		if (!comment) {
			return message.reply(`${emotes.error} Provide something to Comment!`);
		}
		const yt = await Canvacord.Canvas.youtube({
			avatar: message.author.displayAvatarURL({ format: 'png' }),
			username: message.author.username,
			content: args.join(' '),
		});
		const attachment = new Discord.MessageAttachment(yt, 'comment.png');
		message.reply({ files: [attachment] });
	},
};
