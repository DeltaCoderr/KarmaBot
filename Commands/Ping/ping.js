const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! What else would it do anyways'),
	async execute(interaction,client) {
		await interaction.reply({
			content:'Pong!',
			ephemeral: true,
		});

	},
};

