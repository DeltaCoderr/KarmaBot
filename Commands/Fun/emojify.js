
module.exports = {
    help: {
        name: 'emojify',
        aliases: ['emojify'],
        description: 'Emojify the text.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        if (!args[0]) {
            return message.channel.send(
                '❎ Please provide valid text.',
            );
        }

        const specialChars = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   ',
        };

        const emojified = `${args.join(' ')}`.toLowerCase().split('').map(letter => {
            if (/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}: `;
            }
            else if (specialChars[letter]) {
                return `${specialChars[letter]} `;
            }
            return letter;
        }).join('');

        if (emojified.length > 2000) {
            return message.channel.send(`${emotes.error} The emojified message exceeds 2000 characters.`);
        }

        message.channel.send(emojified);


    }
}