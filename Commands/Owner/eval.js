const Command = require("../../Client/Command");

module.exports = new Command({
    name: "eval",
    aliases: ["eval"],
    description: "The ping of the bot",
    category: "Misc",
    run: async (client, message, args) => {

        if (!message.author.id === '552814506070507531') return
        const content = message.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== 'string') {
                output = require('util').inspect(output, { depth: 0 });
            }
            if (output.includes(client.token)) {
                output = output.replace(message.client.token, 'T0K3N');
            }
            message.reply(output, {
                code: 'js'
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(message.client.token)) {
                err = err.replace(message.client.token, 'T0K3N');
            }
            message.reply(err, {
                code: 'js'
            });
        });
    },
    exec: async (client, interaction) => {
        interaction.reply(`Use the prefix for testing.`).catch(() => { });
    },
});
