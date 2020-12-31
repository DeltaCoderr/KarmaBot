const Discord = require('discord.js');
const config = require('../../configs/config.json');
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'addemoji',
        description: 'Adds a given Emoji to the server',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.channel.send(`${client.emotes.error} You don't have the permissions to use this command [Manage Emojis]!`)
        }

        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;
            const name = args.slice(1).join(" ");
            try {
                const Added = new MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(`${client.emotes.verified} Emoji Added`)
                .setDescription(
                `${client.emotes.verified} Emoji Has Been Added! | Name : ${name || `${customemoji.name}`} | Preview : [Click Me](${Link})`
                    );
                await message.guild.emojis.create(
                    `${Link}`,
                    `${name || `${customemoji.name}`}`
                )
                return message.channel.send(Added)
            } catch (err) {
                console.log(err)
                return message.channel.send(`${client.emotes.error} An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n- The emojis size is too big.\`\`\``)
           
            }
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`${client.emotes.error} **Please Give Me A Valid Emoji!**`);
            message.channel.send(
                `${client.emotes.error} **You Can Use Normal Emoji Without Adding In Server!**`
            );
        }

    }
}
