const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const fetch = require('node-fetch');
const config  = require('../../Configs/config');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	help: {
        name: 'hentai',
        aliases: ['hentai'],
        description: 'Shows Hentai Pictures',
        category: 'Nsfw',
    },
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('Shows Hentai Pictures'),
	async execute(interaction, client) {
		if (!interaction.channel.nsfw) return interaction.reply({ content:'This command can only be used in NSFW channels', ephemeral:true });
		let embed;
		await fetch('https://purrbot.site/api/img/sfw/cuddle/gif')
			.then(res => res.json())
			.then(body => {
				embed = new EmbedBuilder()
					.setTitle(':smirk: Hentai')
					.setImage(body.link)
					.setColor(config.embedcolor)
					.setFooter({ text: 'Hentai' })
					.setURL(body.link);
			});
	    await interaction.reply({
			embeds: [embed],
		});    
	},
};

