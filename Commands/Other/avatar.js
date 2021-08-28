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
        return message.channel.send({embeds: [embed]})
    }
}