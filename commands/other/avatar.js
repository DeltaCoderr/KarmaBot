const Discord = require('discord.js');
const config = require('../../configs/config.json');
const displayFmts = {
	jpg: 'JPEG',
	png: 'PNG',
	gif: 'GIF',
	webp: 'WebP'
};

module.exports = {
    config: {
        name: 'avatar',
        description: 'Show user avatar',
        aliases: ["av"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(e => e.user.username === args.join(' ')) || message.member;
		const formats = ['png'];
		if (user.user.avatar) formats.push('jpg', 'webp');
		const format = user.user.avatar && user.user.avatar.startsWith('a_') ? 'gif' : 'png';
		if (format === 'gif') formats.push('gif');
		const embed = new MessageEmbed()
			.setTitle(user.user.tag)
			.setDescription(
                formats.map(fmt => `[${displayFmts[fmt]}](${user.user.displayAvatarURL({ format: fmt, size: 2048 })})`).join(' | ')
			)
			.setImage(user.user.displayAvatarURL({ format, size: 2048 }))
			.setColor(config.embedcolor);
		return message.channel.send(embed);
    }
}

