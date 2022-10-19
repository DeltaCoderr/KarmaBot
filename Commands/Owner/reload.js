const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../Configs/config");

module.exports = {
    help: {
        name: 'reload',
        aliases: ['reload'],
        description: 'Reloads the Command.',
        category:  __dirname.split("Commands\\")[1]
    },
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads the Command.")
    .addStringOption((option) =>
    option
        .setName("folder")
        .setDescription("Folder name for the command.")
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
      .setName("command")
      .setDescription("Command which you want to reload.")
      .setRequired(true)
  ),
  async execute(interaction, client) {

    if(config.devs !== interaction.user.id)  return interaction.reply('Only the Developer can use this command.');

    let cmdfolder = interaction.options.getString("folder");
    let command = interaction.options.getString("command");

    try {
        require(`../${cmdfolder}/${command}`);
    } catch(e) {
        return interaction.reply(`❌ | No command with that name found.`);
    }

    delete require.cache[require.resolve(`../${cmdfolder}/${command}`)];
    let pull = require(`../${cmdfolder}/${command}`);
    client.commands.set(pull.help.name, pull);
    console.log(`Reload the Command!`);
    return interaction.reply('✅ Done');
    }
}
