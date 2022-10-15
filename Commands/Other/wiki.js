const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fetch = require('node-fetch');
const config = require("../../Configs/config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wiki")
        .setDescription("Fetch information from wikipedia")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("The query you wanna search")
                .setRequired(true)
        ),
    async execute(interaction, client) {

        let query = interaction.options.getString("query");
        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,).then(res => res.json().catch(() => { }));


        if (!body || (body.title && body.title == "Not found.")) {
            await interaction.reply({
                embeds: [{
                    color: config.embedcolor ? config.embedcolor : null,
                    title: "❌ Error Page Not Found."
                }],
                ephemeral: false,
            });
            return;

        }

        const embed = new EmbedBuilder()
            .setTitle(`🌐 ${body.title} `)
            .addFields({ name: "More Info: ", value: `**[Click Here!](${body.content_urls.desktop.page})**`, inline: true })
            .setDescription(`** ${body.extract}**`)
            .setColor(config.embedcolor.length ? config.embedcolor : null)
            .setTimestamp()

        if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);

        await interaction.reply({
            embeds: [embed],
            ephemeral: false,
        });

    },
};
