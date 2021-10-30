const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'osu',
		aliases: [],
		description: 'Shows information about the OSU player',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const username = args[0];
		if (!args[0]) {
			return message.reply('Please provide a username');
		}

		let user = await undici
			.fetch(
				`https://osu.ppy.sh/api/get_user?k=${config.OSU_API_KEY}&u=${username}`,
			)
			.then((res) => res.json());

		user = user[0];

		if (!user) {
			return message.reply('User not found');
		}

		const osu = new Discord.MessageEmbed()
			.setTitle('<:osu:760439827086311446> Osu user search')
			.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
			.setColor(config.embedColor)
			.addField('❯ `Nickname:`', user.username)
			.addField('❯ `PP:`', String(Math.round(user.pp_raw)))
			.addField('❯ `Rank:`', String(user.pp_rank))
			.addField('❯ `Level:`', String(Math.round(user.level)))
			.addField('❯ `Score:`', String(user.ranked_score))
			.addField('❯ `Country:`', String(user.country))
			.addField('❯ `Country Rank:`', String(user.pp_country_rank))
			.addField('❯ `Playcount:`', String(user.playcount))
			.addField('❯ `Accuracy:`', `${parseFloat(user.accuracy).toFixed(2)}%`)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
		message.reply({ embeds: [osu] });
	},
};
