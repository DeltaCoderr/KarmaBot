const config = require('../../configs/config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = async (client, message) => {
    let prefix = config.prefix
    try{
        if (message.author.bot || message.channel.type === "dm") return;
        if(!message.content.startsWith(prefix)) return;
    
        let timeout = 60 * 1000
  
        let myDaily = await db.get(`timeout`)
    
        if(!db.has(`${message.guild.id}.${message.author.id}.messageCount`)) {
            db.set(`${message.guild.id}.${message.author.id}.messageCount`, 1)
        } else {
            db.add(`${message.guild.id}.${message.author.id}.messageCount`, 1)
        }
    
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        var commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if (commandfile) commandfile.run(client, message, args);
        
    } catch (error) {
        console.log(error);
    }
   

};
