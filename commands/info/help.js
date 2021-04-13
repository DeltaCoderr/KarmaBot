    const {
        MessageEmbed
    } = require("discord.js");
    const {
        readdirSync
    } = require("fs");
    const {
        stripIndents
    } = require("common-tags");
    const {
        embedcolor
    } = require("../../configs/config.json");
    const {
        prefix
    } = require('../../configs/config.json');

    module.exports = {
        config: {
            category: __dirname.split("commands\\")[1],
            name: "help",
            aliases: ["h"],
            usage: "[command name] (optional)",
            category: "info",
            description: "Displays all commands that the karma has.",
            accessableby: "everyone"
        },
        run: async (client, message, args) => {

            const embed = new MessageEmbed()
                .setColor(embedcolor)
                .setAuthor(`${message.guild.me.displayName}`, message.guild.iconURL())
                .setThumbnail(client.user.displayAvatarURL())

            if (!args[0]) {

                embed.setDescription(`**Karma's Prefix Is \`${prefix}\`\n\nFor Help Related To A Particular Command Type -\n\`${prefix}help [command name] Or ${prefix}help [alias]\`**`)
                embed.setFooter(`${message.guild.me.displayName} | Total Commands - ${client.commands.size - 1} Loaded`, client.user.displayAvatarURL());
                embed.addField(`${client.emotes.info} Info [4] - `, '`help`, `info`, `invite`, `uptime`')
                embed.addField(`${client.emotes.anime} Anime [15] - `, '`anime`, `baka`, `fact`, `hug`, `karma`, `kiss`, `neko`, `pat`, `poke`, `slap`, `smug`, `tickle`, `waifu`, `whatanime`, `wink`')
                embed.addField(`${client.emotes.chatbot} Chatbot [3] - `, '`chatbot`, `disableChatbotchannel`, `setChatbotchannel`')
                embed.addField(`${client.emotes.fun} Fun [13] - `, '`binary`, `clyde`, `comment`, `eject`, `emojify`, `github`, `iq`, `npm`, `osu`, `ping`, `reddit`, `weather`, `zalgo`')
                embed.addField(`${client.emotes.image} Image [10] - `, '`fire`, `respect`, `rip`, `scary`, `trash`, `triggered`, `beautiful`, `affect`, `delete`, `thomas`')
                embed.addField(`${client.emotes.music1} Music [14] - `, '`clear-queue`, `filter`, `filters`, `loop`, `np`, `pause`, `lyrics`, `play`, `queue`, `resume`, `shuffle`, `skip` `stop`, `volume`, `leave`')
                embed.addField(`${client.emotes.other} Other [7] -`, '`avatar`, `profile`, `serverinfo`, `snipe`, `urban`, `wiki`, `addemoji`, `emojilist`')
                if (message.channel.nsfw) {
                    embed.addField(`${client.emotes.nsfw} NSFW [3] - `, '`hentai`, `thighs`, `bondage`')
                } else {
                    embed.addField(`${client.emotes.nsfw} NSFW [3] - `, '**This section can only be used on NSFW Channel**')
                }
                embed.setFooter('© Karma', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
                embed.setImage('https://cdn.discordapp.com/attachments/770248422992248862/780032317909237760/unknown.png')
                embed.setTimestamp()

                return message.channel.send(embed)
            } else {
                let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
                command = command.config

                embed.setDescription(stripIndents `**Karma Prefix Is \`${prefix}\`**\n
                ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
                ** Description -** ${command.description || "No Description provided."}\n
                ** Usage -** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}\n
                ** Needed Permissions -** ${command.accessableby || "everyone can use this command!"}\n
                ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
                embed.setFooter(message.guild.name, message.guild.iconURL())

                return message.channel.send(embed)
            }
        }
    };