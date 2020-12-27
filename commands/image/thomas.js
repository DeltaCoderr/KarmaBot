const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
    config: {
        name: 'thomas',
        description: 'Thomas a User!',
        aliases: ["thomas"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
 //   const m = client.findMember(message, args, true);
   
 let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
 let m = await message.channel.send("**Please Wait...**");   
 let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Thomas().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "thomas.png");
    m.delete({ timeout: 5000 });
    message.channel.send(attach);
  },
};