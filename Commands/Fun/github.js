const undici = require('undici');
const Discord = require('discord.js');



module.exports = {
	help: {
		name: 'github',
		aliases: ['gh'],
		description: 'Shows Information about the Github User',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const name = args.join(' ');
		if (!name) {
			return message.reply(`${emotes.error} Please provide a valid user`);
		}

		const url = `https://api.github.com/users/${name}`;

		let response;
		try {
			response = await undici.fetch(url).then((res) => res.json());
		} catch (e) {
			return message.reply(
				`${emotes.error} An error occured, please try again!`,
			);
		}

		try {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${response.login} (${response.id})`)
				.setDescription(response.bio ? response.bio : 'None')
				.addFields(
					{
						name: '❯ Followers',
						value: `\`\`\`${response.followers.toLocaleString()}\`\`\``,
						inline: true,
					},
					{
						name: '❯ Following',
						value: `\`\`\`${response.following.toLocaleString()}\`\`\``,
						inline: true,
					},
					{
						name: '❯ Repositories',
						value: `\`\`\`${response.public_repos.toLocaleString()}\`\`\``,
						inline: true,
					},
					{
						name: '❯ Email',
						value: `\`\`\`${response.email ? response.email : 'None'}\`\`\``,
					},
					{
						name: '❯ Company',
						value: `\`\`\`${
							response.company ? response.company : 'None'
						}\`\`\``,
					},
					{
						name: '❯ Location',
						value: `\`\`\`${
							response.location ? response.location : 'None'
						}\`\`\``,
					},
				)
				.setURL(response.html_url)
				.setThumbnail(response.avatar_url)
				.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
				.setTimestamp();

			message.reply({ embeds: [embed] });
		} catch (err) {
			return message.reply(`${emotes.error} Please provide a valid user`);
		}
	},
};
