const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../Configs/config');
const emotes = require('../../Configs/emotes');

toID = function (text) {
    if (typeof text === 'string') return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

module.exports = {
    help: {
        name: 'help',
        aliases: ['help'],
        description: 'Shows all the commands.',
        category: 'Info'
    },
    data: new SlashCommandBuilder()
    .setName('help')
	.setDescription('Shows all the commands.')
	.addStringOption(option =>
		option.setName('category')
			.setDescription('Category to show info about')
			.setRequired(false)),
            async execute(interaction, client) {
                const args = interaction.options.getString('category');
                const embed = new EmbedBuilder()
                        .setColor(config.embedcolor)
                        .setAuthor({name: `${client.user.username}`, iconURL: interaction.guild.iconURL()})
                        .setThumbnail(client.user.displayAvatarURL());
                        
                if (!args) {
                    let commandCategories = [];

                    let markedNSFW = false;
                    client.commands.forEach(c => {
                        if (!commandCategories.includes(c.help.category)) {
                            if (config.devs !== interaction.user.id && c.help.category === ('Owner')) return;
                            if (!interaction.channel.nsfw && c.help.category === 'Nsfw') {
                                if (!markedNSFW) {
                                    markedNSFW = true;
                                    embed.addFields({name:`${emotes.nsfw} NSFW [3] -`,value:'This section can only be used in an NSFW channel.'});
                                }
                            }
                            else commandCategories.push(c.help.category);
                        };
                    })

                    commandCategories.forEach(emote => {
                        let cmds = client.commands.filter(c => c.help.category === (emote));
                        embed.setDescription(`**Karma's Prefix Is \`${config.prefix}\`\n\nFor Help Related To A Particular Command Type -\n\`${config.prefix}help [command name] Or ${config.prefix}help [alias]\`**`);
                        embed.addFields({name:`${emotes[toID(emote)]} ${emote}  [${cmds.size}] -`,value:`${cmds.map(c => `\`${c.help.name}\``).join(" ")}`});
                    });
                    embed.setImage('https://cdn.discordapp.com/attachments/770248422992248862/780032317909237760/unknown.png');
                    embed.setTimestamp();

                    return await interaction.reply({
                        embeds: [embed],
                    });
                } else {
                    let command = client.commands.get(args.toLowerCase());
                    if (!command) {
                        embed.setTitle("**Invalid Command!**").setDescription(`**Do \`/help\` For the List Of the Commands!**`);
                        return await interaction.reply({
                            embeds: [embed],
                        });
                    }
                    command = command.help

                    embed.setDescription(`**Karma Prefix Is \`${config.prefix}\`**\n
                    ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
                    ** Description -** ${command.description || "No Description provided."}\n
                    ** Needed Permissions -** ${command.accessableby || "everyone can use this command!"}\n
                    ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
                    embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

                    return await interaction.reply({
                        embeds: [embed],
                    });
                }
            },        
}
