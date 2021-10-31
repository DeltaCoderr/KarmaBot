const { WouldYouRather } = require('weky')
require('@weky/inlinereply');

module.exports = {
    help: {
        name: 'wyr',
        aliases: ['wouldyourather'],
        description: 'Would you Rather? Hmm..',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (message) => {

        await WouldYouRather({
            message: message,
            embed: {
                title: 'Would you rather...',
                color: config.embedcolor,
                footer: '©️ Karma Bot',
                timestamp: true
            },
            thinkMessage: 'Let me think...',
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttons: { optionA: 'Option A', optionB: 'Option B' }
        });
    }
}
