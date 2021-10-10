const Weky = require('../../Package/index');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'fight',
		aliases: ['battle'],
		description: 'Lets\' fight.',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message) => {
		const opponent = message.mentions.users.first();
		if (!opponent) {
			return message.reply('You need to mention someone to fight.');
		}
		await Weky.Fight({
			message,
			opponent,
			embed: {
				title: 'Fight | Karma',
				color: config.embedColor,
				footer: {
					text: '© Karma',
					icon_url: 'https://i.imgur.com/U34MPtp.png',
				},
			},
		});
	},
};
