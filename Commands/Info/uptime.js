const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    help: {
        name: 'uptime',
        aliases: ['uptime'],
        description: 'Shows the Bot\'s uptime',
        category: "Info"
    },
    data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription("Shows the Bot\'s uptime"),
	async execute(interaction, client) {
		let uptime = moment.duration(client.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

        let bicon = client.user.displayAvatarURL()
        const botembed = new EmbedBuilder()
            .setTitle("Karma Bot Project")
            .setColor(config.embedcolor)
            .setDescription(`<a:pyramid:757488922354909184> **Karma has been active for** \`${uptime}\`. \n <a:pyramid:757488922354909184> **The ping is currently** \`${client.ws.ping} ms\`. \n\n  ❗  **__Attention!__** **Karma is restarting himself after \`10 to 15 hours\` for a good quality and lagless sound!**`)
            .setTimestamp()
            .setFooter({text: "© Karma", iconURL: "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"})
            .setThumbnail(bicon);
        await interaction.reply({
            embeds: [botembed],
        });

	}
}