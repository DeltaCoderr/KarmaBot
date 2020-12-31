const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'ban',
        description: 'Ban a member from your server!',
        usage: '<@user> [reason]',
        accessableby: "Moderators",
    },
    run: async (client, message, args) => {
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply('i don\'t have ban members permission.')
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('you don\'t have ban members permission.')

            const noargs = new MessageEmbed()
            .addField("Error!", "```diff\n- No user mentioned!```")
            .addField("Usage", `\`\`\`diff\n+ ${prefix}ban [user] (reason)\`\`\``)
            .setColor("#FF0000")
            if (!args[0]) return message.channel.send(noargs) 

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());

            const nomember = new MessageEmbed()
            .addField("Error!", "```diff\n- Unable to find that user!```")
            .addField("Try", "```diff\n+ Checking if that user is in this server, and rerun the command again!```")
            .setColor("#FF0000")

            const selfban = new MessageEmbed()
            .addField("Error!", "```diff\n- You can't ban yourself!```")
            .addField("Try", "```diff\n+ Mentioning someone again!```")
            .setColor("#FF0000")
            if (!banMember) return message.channel.send(nomember);
            if (banMember === message.member) return message.channel.send(selfban)

            var reason = args.slice(1).join(" ");
   const unbannable = new MessageEmbed()
            .addField("Error!", "```diff\n- Unable to ban that user!```")
            .addField("Try", "```diff\n+ Checking your role permission or make sure that user is not higher than yours!```")
            .setColor("#FF0000")

            if (!banMember.bannable) return message.channel.send(unbannable)
            try {

                const userbanned = new MessageEmbed()
            .addField("Banned!", `\`\`\`diff\n- You got banned from ${message.guild.name}!\`\`\``)
            .addField("Reason", `\`\`\`diff\n+ ${reason || "None."}!\`\`\``)
            .addField("Moderator", `\`\`\`diff\n+ ${message.author.tag}!\`\`\``)
            .setColor("#FF0000")
            banMember.send(userbanned).then(() =>
                message.guild.members.ban(banMember, { days: 7, reason: reason })).catch(() => null)
            } catch {
                message.guild.members.ban(banMember, { days: 7, reason: reason })
            }
            if (reason) {
            var sembed = new MessageEmbed()
               .addField("Banned!", `\`\`\`diff\n+ ${banMember.user.tag} - [${banMember.user.id}] has been banned!\`\`\``)
               .addField("Reason", `\`\`\`diff\n+ ${reason || "None."}!\`\`\``)
              .setColor("#FF0000")
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
              .addField("Banned!", `\`\`\`diff\n+ ${banMember.user.tag} - [${banMember.user.id}] has been banned!\`\`\``)
              .setColor("#FF0000")
            message.channel.send(sembed2)
            }
    }
}
