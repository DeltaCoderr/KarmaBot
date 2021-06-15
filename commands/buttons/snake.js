const Discord = require("discord.js")
const config = require('../../configs/config.json');
const { Snake }  = require("weky")

module.exports = {
    config: {
        name: 'snake',
        description: '',
        aliases: ["snake"],
        usage: '',
        accessableby: "",
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
