<<<<<<< Updated upstream:Commands/Fun/binary.js
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'binary',
		aliases: [],
		description: 'Shows your text in Binary Format.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const type = args[0];
		if (type !== 'encode' && type !== 'decode') {
			return message.reply(
				'Please specify a valid type. `encode` or `decode`.',
			);
		}

		const text = args.slice(1).join(' ');
		if (!text) {
			return message.reply('Please specify a text to convert.');
		}

		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor(config.embedColor)
			.setThumbnail('https://i.imgur.com/IMKDKx3.png')
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
		if (type === 'encode') {
			const data = Functions.binaryConvert(text, true);
			embed.setTitle('Text to Binary');
			embed.setDescription('**Binary Code:** `' + data + '`');
		} else if (type === 'decode') {
			const data = Functions.binaryConvert(text);
			embed.setTitle('Binary to Text');
			embed.setDescription('**Text:** `' + data + '`');
		}

		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    help: {
        name: 'binary',
        aliases: ['binary'],
        description: 'Shows your text in Binary Format.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {


        const url = `http://some-random-api.ml/binary?text=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured, please try again!`);
        }

        const embed = new MessageEmbed()
            .setTitle("Text to Binary")
            .setThumbnail(
                "https://png.pngtree.com/png-clipart/20200225/original/pngtree-binary-code-and-magnifying-glass-isometric-icon-png-image_5252004.jpg"
            )

            .setDescription("**Binary Code** - `" + data.binary + "`")
            .setTimestamp()
            .setFooter(
                "© Karma",
                "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
            )
            .setColor(config.embedcolor);

        await message.channel.send(embed);

    }
}
>>>>>>> Stashed changes:old/Commands/Fun/binary.js
