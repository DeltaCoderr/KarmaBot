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

        const link = ["pornhub.com", "nhentai.net", "xnxx.com", ".xxx", "porn", "sex"]
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
            if (message.content.toLowerCase().includes("pornhub.com") || message.content.toLowerCase().includes("nhentai.net") || message.content.toLowerCase().includes("xnxx.com") || message.content.toLowerCase().includes("xxx") || message.content.toLowerCase().includes("porn") || message.content.toLowerCase().includes("sex") || message.content.toLowerCase().includes("fuck")){
                return message.channel.send("No NSFW please")
            } else {
            const embed = new MessageEmbed()
                .setTitle(`🌐 ${body.url} `)
                .setColor(config.embedcolor)
                .setTimestamp()
                .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                .setImage(`${body.screenshot}`)
            message.channel.send(embed);
            }
        }
    }
