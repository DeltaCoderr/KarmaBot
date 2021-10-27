const Weky = require('../../Utils/Package/index');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'snake',
		aliases: ['snek'],
		description: 'Play the snake game in Discord!',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		await Weky.Snake({
			message,
			embed: {
				title: 'Snake | Karma',
				color: config.embedColor,
				footer: {
					text: '© Karma',
					icon_url: 'https://i.imgur.com/U34MPtp.png',
				},
			},
		});
	},
};
