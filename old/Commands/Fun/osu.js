<<<<<<< Updated upstream:Commands/Fun/osu.js
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
=======
const osu = require('node-osu');
const { MessageEmbed } = require('discord.js');
const api = new osu.Api("", {
    // END OF OSU API KEY
    notFoundAsError: true,
    completeScores: false
})

module.exports = {
    help: {
        name: 'osu',
        aliases: ['osu'],
        description: 'Shows information about the OSU player',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let username = args[0]
        if (!args[0]) return message.channel.send('Please, provide a valid user\'s nickname! (osu!)')

        api.getUser({ u: username }).then(user => {
            const osu = new MessageEmbed()
                .setTitle(`<:osu:760439827086311446> User Osu Search System`)
                .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
                .setColor(config.embedcolor)
                .addField('》`Nickname:`', user.name)
                .addField('》`PP:`', Math.round(user.pp.raw))
                .addField('》`Rank:`', user.pp.rank)
                .addField('》`Level:`', Math.round(user.level))
                .addField('》`Score:`', user.scores.ranked)
                .addField('》`Country:`', user.country)
                .addField('》`Country Rank:`', user.pp.countryRank)
                .addField('》`Playcount:`', user.counts.plays)
                .addField('》`Accuracy:`', `${user.accuracyFormatted}`)
                .setTimestamp()
                .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
            message.channel.send(osu)
        });
    },
};
>>>>>>> Stashed changes:old/Commands/Fun/osu.js
