const { TicTacToe } = require('weky')

module.exports = {
    help: {
        name: 'ttt',
        aliases: ['tictactoe'],
        description: 'TicTacToe game, wahoo~!',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        if (!args[0]) return message.channel.send("Please Provide someone to battle with.")
        const opponent = message.mentions.users.first()
        const game = new TicTacToe({
            message: message,
            opponent: opponent,
            xColor: 'red',
            oColor: 'blurple',
            xEmoji: '❌',
            oEmoji: '0️⃣',
        })

        game.start()
    }
}