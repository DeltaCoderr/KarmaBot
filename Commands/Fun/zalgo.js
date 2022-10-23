const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const Zalgo = require('to-zalgo');
const config = require("../../Configs/config")
module.exports = {
    help: {
        name: 'zalgo',
        aliases: ['zalgo'],
        description: 'Converts your text into Zalgo ',
        category: __dirname.split("Commands\\")[1]
    },
    data: new SlashCommandBuilder()
        .setName("zalgo")
        .setDescription("Converts your text into Zalgo")
        .addStringOption((option) =>
        option
            .setName("text")
            .setDescription("The text you wanr to convert into Zalgo")
    ),    
    async execute(interaction, client) {
        let text = await interaction.options.getString("text");
        const embed = new EmbedBuilder()
            .setColor(config.embedcolor)
            .setDescription(`${Zalgo(text)}`)
            .setTimestamp()
            .setFooter({text:'© Karma ', iconURL: 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png'})
        await interaction.reply({embeds:[embed]});
    }
}
