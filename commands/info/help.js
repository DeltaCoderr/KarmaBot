    const {
        MessageEmbed
    } = require("discord.js");
    const {
        stripIndents
    } = require("common-tags");
    const {
        embedcolor
    } = require("../../configs/config.json");
    const {
        prefix,
        dev
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
                let commandCategories = []

                client.commands.forEach(c => {
                    if (!commandCategories.includes(c.config.category)) {
                        if (dev !== message.author.id && c.config.category === "owner") return;
                        if (!message.channel.nsfw && c.config.category === "nsfw") return;

                        commandCategories.push(c.config.category)
                    }
                })

                commandCategories.forEach(cat => {
                    let cmds = client.commands.filter(c => c.config.category === cat)
                    embed.addField(`${client.emotes[cat]} ${cat.toProperCase()} [${cmds.size}]`, cmds.map(c => `\`${c.config.name}\``).join(" "))
                })

                embed.setFooter(`${message.guild.me.displayName} | Total Commands - ${client.commands.size - 1} Loaded`, client.user.displayAvatarURL());
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

    /**
     * 
     * @returns {string} A string that has first character upper cased
     */
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };