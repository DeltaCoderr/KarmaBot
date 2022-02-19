<<<<<<< Updated upstream:Commands/Fun/npm.js
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
=======
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'npm',
        aliases: ['npm'],
        description: 'Shows information about the npm package',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {


        const package = args[0];
        if (!package) {
            return message.channel.send(
                `${emotes.error} Please provide a valid package.`
            );
        }

        let response;
        try {
            response = await fetch('https://api.npms.io/v2/search?q=' + args[0]).then(res => res.json());
        }
        catch (e) {
            return message.channel.send(
                `${emotes.error} An error occured, please try again!`
            );
        }

        try {
            const pkg = response.results[0].package;
            const embed = new MessageEmbed()
                .setTitle(pkg.name)
                .setThumbnail('https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
                .setURL(pkg.links.npm)
                .setDescription(pkg.description)
                .addFields(
                    { name: '》 Author :', value: pkg.author ? pkg.author.name : 'None' },
                    { name: '》 Version :', value: pkg.version },
                    { name: '》 Repository :', value: pkg.links.repository ? pkg.links.repository : 'None' },
                    { name: '》 Maintainers :', value: pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : 'None' },
                    { name: '》 Keywords :', value: pkg.keywords ? pkg.keywords.join(', ') : 'None' },
                )
                .setColor(config.embedcolor)
                .setFooter('© Karma', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
                .setTimestamp();

            message.channel.send(embed);
        }
        catch (e) {
            return message.channel.send(
                `${emotes.error} Please provide a valid package.`,
            );
            };
        },
    };
>>>>>>> Stashed changes:old/Commands/Fun/npm.js
