const Discord = require('discord.js');
const db = require("quick.db");
const config = require('../../configs/config.json');



module.exports = {
    config: {
        name: '',
        description: '',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
    const yembed = new Discord.MessageEmbed()

    .setTitle(`:white_check_mark: คุณกรุณาใส่ไอดีของผู้เล่น premium, ${message.author.tag}`)

    .setColor(`GREEN`);
    const addembed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: เพิ่ม premium ให้กับ <@!${args[0]}> แล้ว, ${message.author.tag}`)
    .setColor(`GREEN`);
    
    if (message.author.id !== '360498353462575115') return message.channel.send(`\`${message.author.username}\` คุณไม่สามารถ เพิ่ม ได้ คุณไม่มี \`Permission\` แห่งความหล่อ เหมือน กู`);
    if (!args[0]) return message.channel.send(yembed);
        
    message.channel.send(addembed);
    db.push(`premium.${args[0]}`, true);
    }
}