const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");

module.exports = {
 help: {
        name: 'iq',
        aliases: ['iq'],
        description: 'Guesses how smart you are',
        category: "Fun"
    },
  data: new SlashCommandBuilder()
    .setName("iq")
    .setDescription("Guesses how smart you are")
    .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user whose IQ you wanna measure")
      .setRequired(true)
  ),
  async execute(interaction, client) {

        let user = await interaction.options.getUser("user");
        try {
            const iq = Math.floor(Math.random() * 226);
            const embed = new EmbedBuilder()
                .setTitle(":brain: IQ Test:")
                .setDescription(`:bulb:   ${user}'s  **IQ is:**   \`${iq}\`  `)
                .setColor("FF0000")
                .setThumbnail("https://media.giphy.com/media/l44QzsOLXxcrigdgI/giphy.gif")
                .setTimestamp()
                .setFooter({text:'© Karma', iconURL:'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png'})
                .setColor(config.embedcolor);
            await interaction.reply({embeds:[embed]});

        } catch (err) {
            interaction.reply({
                embeds:[ {
                    color: `${config.embedcolor}`,
                    description: `Something went wrong...`
                }]
            })
        }
    }
}
