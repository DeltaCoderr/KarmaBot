const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'screenshot',
        aliases: ['ss', 'screenshot'],
        description: 'Shows the Web Screenshots',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

            const body = await fetch(`https://shot.screenshotapi.net/screenshot?&url=${encodeURIComponent(args.join(" "))}&fresh=true&output=json&file_type=png&wait_for_event=load`)
           .then(res => res.json().catch(() => { }));

            if (args.length === 0) return message.channel.send({
               embed: {
                    color: config.embedcolor,
                    title: "Please provide a valid URL!"
               }
            })
            if (!body) return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    title: "❌ Error"
                }
            })
            if (body.error) return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    title: "❌ Error URL not found"
                }
            });

            const embed = new MessageEmbed()
                .setTitle(`🌐 ${body.url} `)
                .setColor(config.embedcolor)
                .setTimestamp()
                .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                .setImage(`${body.screenshot}`)
            message.channel.send(embed);
        }
    }
