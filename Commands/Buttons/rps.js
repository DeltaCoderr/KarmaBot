const Weky = require('../../Utils/Package/index');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'rps',
		aliases: ['rockpaperscissors'],
		description: 'Lets\' play rps.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const opponent = message.mentions.users.first();
		if (!opponent) {
			return message.reply('You need to mention someone to play rps.');
		}
		await Weky.RockPaperScissors({
			message,
			opponent,
			embed: {
				title: 'Rock Paper Scissors | Karma',
				color: config.embedColor,
				footer: {
					text: '© Karma',
					icon_url: 'https://i.imgur.com/U34MPtp.png',
				},
			},
		});
	},
};
