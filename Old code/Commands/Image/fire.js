const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(config.AME_API);
const { MessageAttachment } = require('discord.js');

module.exports = {
    help: {
        name: 'fire',
        aliases: ['fire'],
        description: 'test',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send(`${emotes.load} **Please Wait...**`);
        let buffer = await AmeAPI.generate("fire", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new MessageAttachment(buffer, "fire.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);

    }
}