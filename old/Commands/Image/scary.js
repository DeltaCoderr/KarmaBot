<<<<<<< Updated upstream:Commands/Image/scary.js
const undici = require('undici');
const Discord = require('discord.js');


const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'scary',
		aliases: [],
		description: 'S-Scary.',
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

		const data = await undici
			.fetch('https://v1.api.amethyste.moe/generate/scary', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Bearer ${config.AME_API}`,
				},
				body: `url=${encodeURIComponent(avatar)}`,
			})
			.then((res) => res.arrayBuffer());

		const buffer = Buffer.from(data);

		const attachment = new Discord.MessageAttachment(buffer, 'scary.png');
		message.reply({ files: [attachment] }).then(() => m.delete());
	},
};
=======
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(config.AME_API);
const { MessageAttachment } = require('discord.js');

module.exports = {
    help: {
        name: 'scary',
        aliases: ['scary'],
        description: 'S-Scary.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send(`${emotes.load} **Please Wait...**`);
        let buffer = await AmeAPI.generate("scary", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new MessageAttachment(buffer, "scary.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);

    }
}
>>>>>>> Stashed changes:old/Commands/Image/scary.js
