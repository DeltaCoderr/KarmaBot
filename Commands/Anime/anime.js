const undici = require('undici');
const Discord = require('discord.js');
const emotes = require('../../Configs/emotes');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'anime',
		aliases: [],
		description: 'Shows Information about an animeInfo.',
		category: __dirname.split('Commands/')[1],
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
