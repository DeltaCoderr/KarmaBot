const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const { checkPermission } = require('../../Base/Permissions');
let isUrl = require("is-url");
const { parse } = require("twemoji-parser");
module.exports = {
    help: {
        name: 'addemoji',
        aliases: ['addmemoji'],
        description: 'Adds an emoji to your server',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        /****   Checking Permissions    ****/
        let clientPermission = await checkPermission('client', message, [
            'MANAGE_EMOJIS',
        ]);
        if (clientPermission) return

        let memberPermission = await checkPermission('member', message, [
            'MANAGE_EMOJIS',
        ])
        if (memberPermission) return;

        /***       Regular Code      ***/
        let type = "";
        let name = "";
        let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);

        if (emote) {
            emote = args[0];
            type = "emoji";
            name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
        } else {
            emote = `${args.find(arg => isUrl(arg))}`
            name = args.find(arg => arg != emote);
            type = "url";
        }
        let emoji = { name: "" };
        let Link;
        if (type == "emoji") {
            emoji = Discord.Util.parseEmoji(emote);
            Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
        } else {
            if (!name) return message.channel.send("Please Provide an Name for the Emoji!\n`k!addemoji [Link] [Emoji Name]` ");
            Link = message.attachments.first() ? message.attachments.first().url : emote
        }

        try {
            const Added = new MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(`${emotes.verified} Emoji Added`)
                .setDescription(`${emotes.verified} Emoji has been Added! | Name : ${name || `${emoji.name}`} | Preview : [Click Here](${Link})`);

            await message.guild.emojis.create(`${Link}`, `${`${name || emoji.name}`}`)
            message.channel.send({embeds: [Added]})
        } catch (err) {
            console.log(err)
            return message.channel.send(`${emotes.error} An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n- The emoji size is too big.\`\`\``)
        }
    }
}