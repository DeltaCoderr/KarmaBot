<<<<<<< Updated upstream:Commands/Anime/slap.js
const undici = require('undici');
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'slap',
		aliases: [],
		description: 'Slap someone go go!.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args);

		if(!victim) {
			return message.reply('Could not find the user.');
		}

		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/slap',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed().setColor(config.embedColor);

		if (victim && victim.id === client.user.id) {
			const msg = [
				'Ouch! How dare you slap me?',
				'Stop that!',
				'It hurts! ;-;',
			][Math.floor(Math.random() * 2)];
			return message.reply(msg);
		} else if (victim && victim.id === message.author.id) {
			return message.reply('Wai~ Seriously!?');
		} else if (victim) {
			embed.setImage(url);
			embed.setDescription(`${message.member} slapped ${victim}!`);
			return message.reply({ embeds: [embed] });
		} else {
			return message.reply('Are you practicing to slap or smth?');
		}
	},
};
=======
const { MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const { sfw: { slap }, } = new nekos()

module.exports = {
    help: {
        name: 'slap',
        aliases: ['slap'],
        description: 'Slap someone go go!.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message) => {
        const { url } = await slap().catch(() => {});

        if (!url) return message.channel.send(`Could not connect to nekos.life`);
    
        const embed = new MessageEmbed();
    
        if (
          message.mentions.members.size &&
          message.mentions.members.first().id === client.user.id
        ) {
          return message.channel.send(
            `${
              [`Ouch! How dare you slap me!`, `Stop that!`, `It hurts! ;-;`][
                Math.floor(Math.random() * 2)
              ]
            }`
          );
        } else if (
          message.mentions.members.size &&
          message.mentions.members.first().id === message.author.id
        ) {
          return message.channel.send(`Wai~ Seriously!?`);
        } else if (message.mentions.members.size) {
          return message.channel.send(
            embed
              .setColor(config.embedcolor)
              .setDescription(`${message.member} slapped ${message.mentions.members.first()}!`)
              .setImage(url)
          );
        } else {
          return message.channel.send( `${message.member}, are you practicing to slap or something?`);
        }

    }
}
>>>>>>> Stashed changes:old/Commands/Anime/slap.js
