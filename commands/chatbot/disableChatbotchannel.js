const Discord = require('discord.js');
const config = require('../../configs/config.json');
const emote = require('../../configs/emotes.json')
const { Database } = require("quickmongo")
const db = new Database(config.database)

module.exports = {
    config: {
        category: __dirname.split("commands\\")[1],
        name: 'disablechatbotchannel',
        description: 'Disables a ChatBot Channel',
        aliases: ["disablechatbotchannel"],
        usage: '<channel>',
        accessableby: "MANAGE_GUILD",
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
            embed: {
                color: config.embedcolor,
                title: `${emote.error} You do not have the required Permissions! - [MANAGE_GUILD] `
            }
        })
        try {
            let a = await db.fetch(`chatbot_${message.guild.id}`)

            if (!a) {
                return message.channel.send({
                    embed: {
                        color: config.embedcolor,
                        title: ` ${emote.error} There is no ChatBot channel set to Disable! `
                    }
                })
            } else {
                let channel = message.guild.channels.cache.get(a)
                // client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ${emote.verified} ChatBot Channel Disabled!**`)
                await db.delete(`chatbot_${message.guild.id}`)

                message.channel.send({
                    embed: {
                        color: config.embedcolor,
                        title: `${emote.verified} ChatBot Channel has been Succesfully Disabled! `
                    }
                })
            }
            return;
        } catch (err) {
            console.log(err)
            return message.channel.send(`${emote.error} Error - Missing Permissions or Channel Doesn't Exist`)
        }

    }
};