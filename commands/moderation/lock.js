const { MessageEmbed } = require("discord.js")
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: "lock",
        aliases: [""],
        description: "Lock a channel so no one will be able to send messages except mod, admins, managers",
        category: "moderation",
        usage: "",
        accessableby: "Administrator",
    },
    run: async (bot, message, args) => {
     if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You need `Manage Channels` permission for this command!');
     
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(e => e.name === args[0]) || message.guild.channels.cache.find(e => e.name.startsWith(args[0]) || message.guild.channels.cache.find(p => p.name.endsWith(args[0])))

    if(!channel) return message.channel.send('Please provide a channel to lock!')
    
    if(channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) return message.channel.send("That channel is already locked.");
        
    let reason = args.slice(1).join(' ')
    
    try {
     await channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });
    if(reason) {
    const rr = new MessageEmbed()
    .addField('Channel Locked!', `\`\`\`diff\n+ This channel has been locked by ${message.author.tag}!\`\`\``)
    .addField('Reason', `\`\`\`diff\n+ ${reason}\`\`\``)
    .setColor(config.embedcolor)
    channel.send(rr)
    } else {
    const rrr = new MessageEmbed()
   .addField('Channel Locked!', `\`\`\`diff\n+ This channel has been locked by ${message.author.tag}!\`\`\``)
   .setColor(config.embedcolor)
    channel.send(rrr)
    }
    message.channel.send(`<#${channel.id}> has been successfully locked.`)
        } catch(err) {
        console.log(err)
        return message.channel.send('An error has occured.')
        }
    }
}
