const { checkPermission } = require('../../Base/Permissions');
const { db } = require('../../Structures/Database');


module.exports = {
    help: {
        name: 'setchatbotchannel',
        aliases: ['setchatbotchannel'],
        permissions: ['MANAGE_GUILD'],
        description: 'Sets a channel for the Chatbot.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message, args) => {
       
            /****   Checking Permissions    ****/
            let clientPermission = await checkPermission('client', message, [
                'MANAGE_GUILD',
            ]);
            if(clientPermission) return 

            let memberPermission = await checkPermission('member', message, [
                'MANAGE_GUILD',
            ])
            if(memberPermission) return;

            /****  Regular Code   ****/
            if(!args[0]) {

                const b = await db.fetch(`chatbot_${message.guild.id}`)
                const channelName =  message.guild.channels.cache.get(b);
                
                if(message.guild.channels.cache.has(b)) {
                        return message.channel.send(`**${emotes.verified} ChatBot Channel Set In This Server Is \`${channelName.name}\`!**`);
                } else {
                    return message.channel.send({embeds: [{
                        color: config.embedcolor,
                        title: `${emotes.error} Please Enter a Channel or Channel ID to set`
                    }]});
                };
            };

            let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

            if(!channel || channel.type !== 'text') return message.channel.send({embed: {
                color: config.embedcolor,
                title: `${emotes.error} Please enter a Valid Channel!`
            }});

            try {
                let a = await db.fetch(`chatbot_${message.guild.id}`);
        
                if (channel.id === a) {
                    return message.channel.send({embeds: [{
                    color: config.embedcolor,
                    title: `${emotes.info} This Channel is already set as ChatBot Channel!`
                }]});
                } else {
                    client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**${emotes.verified} ChatBot Channel Set!**`);
                    db.set(`chatbot_${message.guild.id}`, channel.id);
        
                   message.channel.send({embeds: [{
                    color: config.embedcolor,
                    title: `${emotes.verified} ChatBot Channel has been Set Successfully \`${channel.id}\``
                }});
                };

            } catch(error) {
                logger.error(error);
            }
    },
};