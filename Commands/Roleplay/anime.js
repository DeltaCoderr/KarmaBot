const Command = require("../../Client/Command");
const undici = require('undici');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: "anime",
    aliases: ["anime"],
    slashOptions: [
        {
            name: "search",
            description: "The anime to search",
            type: Command.types.STRING,
            required: true,
        },
    ],
    description: "Search for the Anime.",
    category: "Roleplay",
    run: async (client, message, args) => {

    },
    exec: async (client, interaction) => {
        const anime = interaction.options.getString("search");
        if (!anime) {
            interaction
                .reply({
                    content: `Which anime do I search?`,
                    ephemeral: true,
                })
            return;
        };

        const msg = await interaction.deferReply();
        const id = await undici
            .fetch(`https://api.jikan.moe/v3/search/anime?q=${anime}`)
            .then((res) => res.json());
        if (id.error) {
            return interaction.reply('No anime found!');
        };
        const animeID = id.results[0].mal_id;
        const animeInfo = await undici.fetch(`https://api.jikan.moe/v3/anime/${animeID}`)
            .then((res) => res.json());
        if (animeInfo.genres && animeInfo.genres.length < 0) {
            animeInfo.genres = ['None'];
        };

        const embed = new MessageEmbed()
            .setColor(Config.embedColor)
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
            .setFooter({
                text: `Score - ${animeInfo.score}`,
            })
            .setTimestamp();
        return interaction.editReply({ embeds: [embed] }).catch((e) => {console.log(e)});

    },
});



