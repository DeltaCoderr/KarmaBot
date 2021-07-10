const { WouldYouRather } = require('weky')

module.exports = {
    help: {
        name: 'wyr',
        aliases: ['wouldyourather'],
        description: 'Would you Rather? Hmm..',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        await WouldYouRather(message);
    }
}