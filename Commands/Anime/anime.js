const { MessageEmbed } = require('discord.js');
const Scraper = require('mal-scraper');

module.exports = {
    help: {
        name: 'anime',
        aliases: ['anime'],
        description: 'Shows Information about an Anime.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let Text = args.join(" ");
        if (!Text) return message.channel.send(`Please give something!`);
        if (Text.length > 200) return message.channel.send(`Text limit is 200`);
        let Msg = await message.channel.send(`**Searching it for you ${emotes.load}**`);
        let Replaced = Text.replace(/ /g, " ");
        await Msg.delete();
        let Anime;
        let Embed;
        try {
            Anime = await Scraper.getInfoFromName(Replaced);
            if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";
            Embed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setURL(Anime.url)
                .setTitle(Anime.title)
                .setDescription(Anime.synopsis)
                .addField(`Type`, Anime.type, true)
                .addField(`Status`, Anime.status, true)
                .addField(`Premiered`, Anime.premiered, true)
                .addField(`Episodes`, Anime.episodes, true)
                .addField(`Duration`, Anime.duration, true)
                .addField(`Popularity`, Anime.popularity, true)
                .addField(`Genres`, Anime.genres.join(", "))
                .setThumbnail(Anime.picture)
                .setFooter(`Score - ${Anime.score}`)
                .setTimestamp();
        } catch (error) {
            console.log(error)
            return message.channel.send(`No anime found!`)
        };
        return message.channel.send({embeds: [Embed]});
    },
};