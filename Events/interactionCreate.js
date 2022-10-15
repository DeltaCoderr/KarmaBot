module.exports = {
    name: 'interactionCreate',
    async execute (interaction, client) {
      if(interaction.isSelectMenu()) {
        const { selectMenus } = client;
        const { customId, values } = interaction;
        const menu = selectMenus.get(customId);
        if (!menu) return;

        try {
          await menu.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
      if (!interaction.isCommand()) return;
      
      const { commandName } = interaction;
      const { commands } = client;
      const command = commands.get(commandName);
      
      if (!command) return;
    
      try {
        await command.execute(interaction, client);
      }
      catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
  }
}