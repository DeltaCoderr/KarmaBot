const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');
const axios = require('axios')

module.exports = {
    help: {
        name: 'binary',
        aliases: ['binary'],
        description: 'Shows your text in Binary Format.',
        category: __dirname.split("Commands\\")[1]
    },
    data: new SlashCommandBuilder()
        .setName('binary')
        .setDescription('Shows your text in Binary Format.')
        .addStringOption((option) =>
        option
            .setName("text")
            .setDescription("Text which you wanna convert into Binart Format")    
            .setRequired(true)
        ),
    async execute(interaction, client) {
        let text = interaction.options.getString("text")
        const url = `http://some-random-api.ml/binary?text=${text}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return interaction.reply(`An error occured, please try again!`);
        }

        const embed = new EmbedBuilder()
            .setTitle("Text to Binary")
            .setThumbnail(
                "https://png.pngtree.com/png-clipart/20200225/original/pngtree-binary-code-and-magnifying-glass-isometric-icon-png-image_5252004.jpg"
            )

            .setDescription("**Binary Code** - `" + data.binary + "`")
            .setTimestamp()
            .setFooter({
                text: "© Karma",
                iconURL: "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
            })
            .setColor(config.embedcolor);
        await interaction.reply({embeds: [embed]})
    }
}
