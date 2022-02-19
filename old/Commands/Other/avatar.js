<<<<<<< Updated upstream:Commands/Other/avatar.js
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'avatar',
		aliases: ['av'],
		description: 'Shows the avatar of a certain user',
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
			? member.user.displayAvatarURL({ dynamic: true, size: 1024 })
			: member.displayAvatarURL({ dynamic: true, size: 1024 });

		const tag = member.user ? member.user.tag : member.tag;

		const DiffAvatar = (type) => {
			return member.user
				? member.user.displayAvatarURL({
					size: 1024,
					format: type,
				})
				: member.displayAvatarURL({ size: 1024, format: type });
		};

		const embed = new Discord.MessageEmbed()
			.setAuthor(tag, avatar)
			.setColor(config.embedColor)
			.setTitle('**Avatar**')
			.setDescription(
				`\`Links:\` **[png](${DiffAvatar('png')}) | [jpg](${DiffAvatar(
					'jpg',
				)}) | [gif](${DiffAvatar('gif')}) | [webp](${DiffAvatar('webp')})**`,
			)
			.setImage(avatar)
			.setFooter(
				`Requested by ${message.member.displayName}`,
				message.author.displayAvatarURL({ dynamic: true, size: 1024 }),
			)
			.setTimestamp();
		return message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'avatar',
        aliases: ['av'],
        description: 'Shows the avatar of a certain user',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(config.embedcolor)
            .setTitle(`**Avatar**`)
            .setDescription(`\`Links:\` **[png](${member.user.displayAvatarURL({ format: "png", size: 1024 })}) | [jpg](${member.user.displayAvatarURL({ format: "jpg", size: 1024 })}) | [gif](${member.user.displayAvatarURL({ format: "gif", size: 1024, dynamic: true })}) | [webp](${member.user.displayAvatarURL({ format: "webp", size: 1024 })})**`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
        return message.channel.send(embed)
    }
}
>>>>>>> Stashed changes:old/Commands/Other/avatar.js
