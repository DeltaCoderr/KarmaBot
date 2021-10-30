const undici = require('undici');
const Discord = require('discord.js');



module.exports = {
	help: {
		name: 'npm',
		aliases: [],
		description: 'Shows information about the npm package',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const package = args[0];
		if (!package) {
			return message.reply(`${emotes.error} Please provide a valid package.`);
		}

		const pkg = await undici.fetch(
			`https://registry.npmjs.org/${package}`,
		).then((res) => res.json());

		if (pkg.error) {
			return message.reply(`${emotes.error} Please provide a valid package.`);
		}

		const embed = new Discord.MessageEmbed()
			.setTitle(pkg.name)
			.setThumbnail('https://i.imgur.com/mHLMGmn.png')
			.setURL(`https://npmjs.org/${package}`)
			.setDescription(pkg.description)
			.addFields(
				{ name: '❯ Author :', value: pkg.author ? pkg.author.name : 'None' },
				{ name: '❯ Version :', value: pkg['dist-tags'].latest },
				{
					name: '❯ Repository :',
					value: pkg.repository
						? pkg.repository.url
							.slice(4, pkg.repository.url.length)
							.slice(0, pkg.repository.url.length - 4)
						: 'None',
				},
				{
					name: '❯ Maintainers :',
					value: pkg.maintainers
						? pkg.maintainers.map((e) => e.name).join(', ')
						: 'None',
				},
				{
					name: '❯ Keywords :',
					value: pkg.keywords ? pkg.keywords.join(', ') : 'None',
				},
			)
			.setColor(config.embedColor)
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
			.setTimestamp();

		message.reply({ embeds: [embed] });
	},
};
