const { MessageEmbed } = require('discord.js') 
const Genius = require("genius-lyrics");
const Client = new Genius.Client("");

module.exports = {
    help: {
        name: 'lyrics',
        aliases: ['lyrics'],
        description: 'Get the Lyrics of any song',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (message, args) => {

        let embed = new MessageEmbed()
            .setDescription(` ${emotes.load} **Please wait, im looking for the Lyrics, It can take \`few \` seconds**.`)
            .setColor("FF0000")
        if (!args.length) {
            return message.channel.send("Please provide the Song name.")
        }

        const msg = await message.channel.send(embed)
        try {
            const songs = await Client.songs.search(args.join(" "));
            const lyrics = await songs[0].lyrics();
            const artist = await Client.artists.get()

            console.log(lyrics)
            console.log(artist.name)

            if (lyrics.length > 4095) {
                msg.delete()
                return message.channel.send('Lyrics are too long to be returned as embed');
            }

            if (lyrics.length < 2048) {
                const lyricsEmbed = new MessageEmbed()

                    .setColor("FF0000")
                    .setDescription(lyrics.trim())
                    .setTimestamp()
                    .setFooter('© Karma Music', 'https://cdn.discordapp.com/attachments/725019921159028808/739771007803326505/Screenshot_20200803-1503282.png');;;
                return msg.edit(lyricsEmbed);
            } else {
                // lyrics.length > 2048
                const firstLyricsEmbed = new MessageEmbed()
                    .setAuthor('Karma Lyrics', 'https://cdn.discordapp.com/attachments/725019921159028808/739771007803326505/Screenshot_20200803-1503282.png')
                    .setColor("FF0000")
                    .setDescription(lyrics.slice(0, 2048));;
                const secondLyricsEmbed = new MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(lyrics.slice(2048, lyrics.length))
                    .setTimestamp()
                    .setFooter('© Karma Music', 'https://cdn.discordapp.com/attachments/725019921159028808/739771007803326505/Screenshot_20200803-1503282.png');;
                msg.edit(firstLyricsEmbed);
                message.channel.send(secondLyricsEmbed);
                return;
            }

        } catch (e) {

            embed.setDescription("Got err : " + e)
            msg.edit(embed)
            console.log(e);
        }
    }
}