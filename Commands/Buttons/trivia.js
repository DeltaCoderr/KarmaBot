const Weky = require('../../Utils/Package/index');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'trivia',
		aliases: [],
		description: 'Test your brain, with some fun questions.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		await Weky.Trivia({
			message,
			embed: {
				title: 'Trivia | Karma',
				color: config.embedColor,
				footer: {
					text: '© Karma',
					icon_url: 'https://i.imgur.com/U34MPtp.png',
				},
			},
		});
	},
};
