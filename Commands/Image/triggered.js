const Canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
    help: {
        name: 'triggered',
        aliases: ['triggered'],
        description: 'Triggered, Dang.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message, args) => {
         
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send(`${emotes.load} **Please Wait...**`);

        let avatar = user.user.displayAvatarURL({
            format: 'png',
        });

        await Canvacord.Canvas.trigger(avatar)
            .then(data => {
                Canvacord.write(data, './triggered.gif')
                let attachment = new MessageAttachment(data, 'triggered.gif');
                m.delete({ timeout: 5000 }),
                    message.channel.send(attachment)
            });
    }
}