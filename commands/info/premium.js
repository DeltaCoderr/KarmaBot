const Discord = require('discord.js');
const db = require("quick.db");
const config = require('../../configs/config.json');



module.exports = {
    config: {
        name: 'premium',
        description: '',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
    const yembed = new Discord.MessageEmbed()

    .setTitle(`:white_check_mark: คุณเป็น premium, ${message.author.tag}`)

    .setColor(`GREEN`)
    const xembed = new Discord.MessageEmbed()
    .setTitle(`:x: คุณไม่ใช่ premium, ${message.author.tag}`)
    .setColor(`RED`);
    if (db.get(`premium.${message.author.id}`)) { //output : premium user
  //true
  message.channel.send(yembed);
} else {
  //false
  message.channel.send(xembed);
}
    }
}