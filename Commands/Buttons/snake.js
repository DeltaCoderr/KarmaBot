const { Snake } = require('weky')

module.exports = {
    help: {
        name: 'snake',
        aliases: ['snake'],
        description: 'Play the snake game in Discord!',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        const game = new Snake({
            message: message,
            embed: {
                title: 'Snake',
                color: config.embedcolor,
                gameOverTitle: "Game Over",
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🐍',
                food: '🍎 ',
                //controls
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️'
            }
        })
        game.start()
    }
}