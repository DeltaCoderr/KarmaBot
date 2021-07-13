const { checkPermission } = require('../../Base/Permissions');
const { db } = require('../../Structures/Database');


module.exports = {
    help: {
        name: 'disablechatbotchannel',
        aliases: ['disablechatbotchannel'],
        permissions: ['MANAGE_GUILD'],
        description: 'Disables the channel for the chatbot',
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

            try {

                let a = db.fetch(`chatbot_${message.guild.id}`);

                if(!a) {
                    return message.channel.send({embed: {
                        color: config.embedcolor,
                        title: `${emotes.error} There is no Chatbot channel to disable!`
                    }});
                } else {

                    let channel = message.guild.channels.cache.get(a);
                    db.delete(`chatbot_${message.guild.id}`);

                    message.channel.send({embed: {
                        color: config.embed,
                        title: `${emotes.verified} Chatbot Channel has been succesfully disabled!`
                    }});
                } return;
                
            } catch(err) {
                logger.error(err);
            }
    }
}