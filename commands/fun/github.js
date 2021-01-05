const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.json');
const fetch = require('node-fetch')

module.exports = {
    config: {
        name: 'github',
        description: 'Shows information about github user',
        aliases: ["github"],
        usage: '<query>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const name = args.join(' ');
		if (!name) {
			return message.channel.send(
			`${client.emotes.error}  Please provide a valid user`,
			);
		}

		const url = `https://api.github.com/users/${name}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				`${client.emotes.error} An error occured, please try again!`,
			);
		}

		try{
			const embed = new MessageEmbed()
				.setColor(config.embedcolor)
				.setTitle(`${response.login} (${response.id})`)
				.setDescription(response.bio ? response.bio : 'None')
				.addFields(
					{ name: '》 Followers', value: `\`\`\`${response.followers.toLocaleString()}\`\`\``, inline: true },
					{ name: '》 Following', value: `\`\`\`${response.following.toLocaleString()}\`\`\``, inline: true },
					{ name: '》 Repositories', value: `\`\`\`${response.public_repos.toLocaleString()}\`\`\``, inline: true },
					{ name: '》 Email', value: `\`\`\`${response.email ? response.email : 'None'}\`\`\`` },
					{ name: '》 Company', value: `\`\`\`${response.company ? response.company : 'None'}\`\`\`` },
					{ name: '》 Location', value: `\`\`\`${response.location ? response.location : 'None'}\`\`\`` },
				)
				.setURL(response.html_url)
				.setThumbnail(response.avatar_url)
				.setFooter('© Sakura', 'https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024')
        		.setTimestamp();

			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				`${client.emotes.error} Please provide a valid user`,
			);
		}
    }
}

