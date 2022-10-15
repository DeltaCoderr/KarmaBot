const { EmbedBuilder } = require('discord.js');
const config = require('../Configs/config');
module.exports = {
    data:{
        name: 'sub-menu',
    },
    async execute(interaction, client) {
        let command = client.commands.get(interaction.values[0]);
        if(!command) return interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        let embed = new EmbedBuilder();
            embed.setDescription(`**Karma Prefix Is \`${config.prefix}\`**\n
            ** Command -** ${command.data.name.slice(0, 1).toUpperCase() + command.data.name.slice(1)}\n
            ** Description -** ${command.data.description || "No Description provided."}\n
            ** Needed Permissions -** ${command.data.accessableby || "everyone can use this command!"}\n
            ** Aliases -** ${command.help.aliases ? command.help.aliases.join(", ") : "None."}`)
            embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        interaction.reply({embeds: [embed]});
    }
}