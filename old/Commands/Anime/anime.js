<<<<<<< Updated upstream:Commands/Anime/anime.js
const undici = require('undici');
const Discord = require('discord.js');



module.exports = {
	help: {
		name: 'anime',
		aliases: [],
		description: 'Shows Information about an animeInfo.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const anime = args.join(' ');
		if (!anime) {
			return message.reply('Please give an anime!');
		}
		const msg = await message.reply(`**Searching it for you ${emotes.load}**`);
		const id = await undici
			.fetch(`https://api.jikan.moe/v3/search/anime?q=${anime}`)
			.then((res) => res.json());
		if (id.error) {
			return message.reply('No anime found!');
		}
		const animeID = id.results[0].mal_id;
		const animeInfo = await undici
			.fetch(`https://api.jikan.moe/v3/anime/${animeID}`)
			.then((res) => res.json());
		if (animeInfo.genres && animeInfo.genres.length < 0) {
			animeInfo.genres = ['None'];
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setURL(animeInfo.url)
			.setTitle(`${animeInfo.title_english} | ${animeInfo.title_japanese}`)
			.setDescription(animeInfo.synopsis)
			.addField('Type', animeInfo.type, true)
			.addField('Status', animeInfo.status, true)
			.addField('Premiered', animeInfo.premiered, true)
			.addField('Episodes', String(animeInfo.episodes), true)
			.addField('Duration', animeInfo.duration, true)
			.addField('Popularity', `#${animeInfo.popularity}`, true)
			.addField('Genres', animeInfo.genres.map(e => e.name).join(', '), true)
			.setThumbnail(animeInfo.image_url)
			.setFooter(`Score - ${animeInfo.score}`)
			.setTimestamp();
		return message.reply({ embeds: [embed] }).then(() => msg.delete());
	},
};
=======
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

        if (!Text) return message.channel.send(`Please Give Something!`);

        if (Text.length > 200) return message.channel.send(`Text Limit - 200`);

        let Msg = await message.channel.send(`**Searching It For You ${emotes.load}**`);

        let Replaced = Text.replace(/ /g, " ");

        await Msg.delete();

        let Anime;

        let Embed;

        try {

            Anime = await Scraper.getInfoFromName(Replaced);

            if (!Anime.genres[0]) Anime.genres[0] = "None";

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
            return message.channel.send(`No Anime Found!`)

        };

        return message.channel.send(Embed);
    },
};
>>>>>>> Stashed changes:old/Commands/Anime/anime.js
