<<<<<<< Updated upstream:Commands/Image/affect.js
const Discord = require('discord.js');
const Canvacord = require('canvacord');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'affect',
		aliases: [],
		description: 'This won\'t affect my baby, Huh?',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const member = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args, true);

		if(!member) {
			return message.reply('Could not find the user.');
		}

		const avatar = member.user
			? member.user.displayAvatarURL({ size: 1024, format: 'png' })
			: member.displayAvatarURL({ size: 1024, format: 'png' });

		const m = await message.reply(`${emotes.load} **Please Wait...**`);

		const data = await Canvacord.Canvas.affect(avatar);
		const attachment = new Discord.MessageAttachment(data, 'affect.png');
		message.reply({ files: [attachment] }).then(() => m.delete());
	},
};
=======
const Canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
    help: {
        name: 'affect',
        aliases: ['affect'],
        description: 'This won\'t affect my baby, Huh?',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send(`${emotes.load} **Please Wait...**`);

        let avatar = user.user.displayAvatarURL({
            format: 'png',
        });

        await Canvacord.Canvas.affect(avatar)
            .then(data => {
                Canvacord.write(data, './affect.png')
                let attachment = new MessageAttachment(data, 'affect.png');
                m.delete({ timeout: 5000 }),
                    message.channel.send(attachment)
            });
    },
};
>>>>>>> Stashed changes:old/Commands/Image/affect.js
