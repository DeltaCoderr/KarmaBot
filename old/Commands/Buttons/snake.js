<<<<<<< Updated upstream:Commands/Buttons/snake.js
const Weky = require('../../Utils/Package/index');


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
=======
const { Snake } = require('weky')

module.exports = {
  help: {
    name: 'snake',
    aliases: ['snake'],
    description: 'Play the snake game in Discord!',
    category: __dirname.split("Commands\\")[1]
  },
  run: async (client, message) => {

    await Snake({
      message: message,
      embed: {
        title: 'Snake ',
        description: 'GG, you scored **{{score}}** points!',
        color: config.embedcolor,
        footer: '©️ Karma Bot',
        timestamp: true
      },
      emojis: {
        empty: '⬛',
        snakeBody: '🐍',
        food: '🍎',
        up: '⬆️',
        right: '⬅️',
        down: '⬇️',
        left: '➡️',
      },
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      buttonText: 'Cancel'
    });
  }
}
>>>>>>> Stashed changes:old/Commands/Buttons/snake.js
