const Weky = require('../../Utils/Package/index');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'guessthepokemon',
		aliases: ['gtp'],
		description: 'Guess the pokemon',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		await Weky.GuessThePokemon({
			message,
			embed: {
				title: 'Guess The Pokémon | Karma',
				color: config.embedColor,
				footer: {
					text: '© Karma',
					icon_url: 'https://i.imgur.com/U34MPtp.png',
				},
			},
		});
	},
};
