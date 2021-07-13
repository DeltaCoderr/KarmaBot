
module.exports = {
    help: {
        name: 'eval',
        aliases: ['eval'],
        description: 'Evaluate any Javascript Code.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        if (config.devs !== message.author.id) return message.channel.send('Only the Developer can use this command.');

        const content = message.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve, reject) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== 'string') {
                output = require('util').inspect(output, { depth: 0 });
            }
            if (output.includes(client.token)) {
                output = output.replace(message.client.token, 'T0K3N');
            }
            message.channel.send(output, {
                code: 'js'
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(message.client.token)) {
                err = err.replace(message.client.token, 'T0K3N');
            }
            message.channel.send(err, {
                code: 'js'
            });
        });

    }
}