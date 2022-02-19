<<<<<<< Updated upstream:Commands/Other/profile.js
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'profile',
		aliases: [],
		description: 'Shows the Info about the user',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		let member = message.guild.members.cache.get(args[0])
			? message.guild.members.cache.get(args[0])
			: Functions.getUser(message, args, true);

		if (!member) {
			return message.reply('Could not find the user.');
		}

		const user = member.user ? member.user : member;

		if (user.id === message.author.id) {
			member = message.member;
		}

		let roles = member.roles.cache.size
			? member.roles.cache
				.map((role) => `**${role}**`)
				.slice(0, -1)
				.join(' ')
			: 'None';

		if (roles.length > 100) {
			roles = 'There are too many roles to show.';
		}

		let safe = user.createdTimestamp;

		const SafeDate = 50 * 24 * 60 * 60 * 1000;

		if (safe < new Date().getTime() - SafeDate) {
			safe = '<:discordinvisible:757485982227365939> `Reliable`';
		} else {
			safe = '<:discorddnd:757485967266545704> `Suspicious`';
		}

		let flags = user.flags.toArray().join('');

		const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

		if (!flags) {
			flags = 'User doesn\'t have any badge.';
		}

		flags = flags.replace(
			'HOUSE_BRAVERY',
			'• <:hsquadbravery:757488491792826410> `HypeSquad Bravery`\n',
		);
		flags = flags.replace(
			'EARLY_SUPPORTER',
			'• <a:nitro:740923343548579890> `Early Supporter`\n',
		);
		flags = flags.replace(
			'EARLY_VERIFIED_BOT_DEVELOPER',
			'• <:discordbotdev:757489652214267904> `Early Verified Bot Developer`\n',
		);
		flags = flags.replace(
			'HOUSE_BRILLIANCE',
			'• <:hsquadbrilliance:757487710775672863> `HypeSquad Brilliance`\n',
		);
		flags = flags.replace(
			'HOUSE_BALANCE',
			'• <:hsquadbalance:757487549605347348> `HypeSquad Balance`\n',
		);
		flags = flags.replace(
			'PARTNERED_SERVER_OWNER',
			'• <:partner:739714991732686848> `Partnered Server Owner`\n',
		);
		flags = flags.replace(
			'HYPESQUAD_EVENTS',
			'• <a:hypesquad:755471122430034060> `Hypesquad Events`\n',
		);

		if (avatar.startsWith('a_')) {
			flags = flags + '• <a:classic:740922817683652754> `Discord Nitro`\n';
		}

		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true }),
			)
			.addFields(
				{
					name: '__Account Info__',
					value: `
			                    **❯ Bot:** ${member.user.bot ? 'Yes' : 'No'}
			                    **❯ ID:** ${member.user.id}
			                    **❯ Created at:** <t:${Math.floor(
		member.user.createdTimestamp / 1000,
	)}:F>`,
					inline: false,
				},
				{
					name: '__Member Info__',
					value: `
			                    **❯ Nickname:** ${member.nickname || 'None'}
								**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist : 'None'}
			                    **❯ Joined Server at:** <t:${Math.floor(
		member.joinedTimestamp / 1000,
	)}:F>`,
					inline: false,
				},
				{
					name: `__Roles__ [${member.roles.cache.size - 1}]`,
					value: member.roles.cache.size
						? member.roles.cache
							.map((role) => `**${role}**`)
							.slice(0, -1)
							.join(' ')
						: 'None',
					inline: false,
				},
				{
					name: '__Messages Info__',
					value: `
					**❯ Last message:** k!profile
					**❯ Last message at:** <t:${Math.floor(Date.now() / 1000)}>
					`,
					inline: false,
				},
				{
					name: '__Safety Check__',
					value: safe,
					inline: false,
				},
				{
					name: '__Badge Information__',
					value: flags,
					inline: false,
				},
			)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    help: {
        name: 'profile',
        aliases: ['userinfo'],
        description: 'Shows the Info about the user',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let durumm;
        let durum = user.presence.status

        let roles = user.roles.cache.map(x => x).filter(z => z.name !== "@everyone");

        if (roles.length > 100) {
            roles = "There is so much roles to show."
        }

        let safe = message.author.createdTimestamp

        if (safe > 604800017) {
            safe = "`Reliable` <:discordinvisible:757485982227365939>"
        } else {
            safe = "`Suspicious` <:discorddnd:757485967266545704>"
        }


        if (durum === "online") durumm = `Online <:discordinvisible:757485982227365939> `
        if (durum === "offline") durumm = `Offline <:discordoffline:757485996999966801> `
        if (durum === "idle") durumm = `Idle <:discordidle:757483463501676614>`
        if (durum === "dnd") durumm = `Do not disturb <:discorddnd:757485967266545704>  `

        let lastMessage
        let lastMessageTime
        let nitroBadge = user.user.avatarURL({ dynamic: true })
        let flags = user.user.flags.toArray().join(``)

        if (!flags) {
            flags = "User doesn't have any badge"
        }

        flags = flags.replace("HOUSE_BRAVERY", "• <:hsquadbravery:757488491792826410>\`HypeSquad Bravery\`")
        flags = flags.replace("EARLY_SUPPORTER", "• <a:nitro:740923343548579890> \`Early Supporter\`")
        flags = flags.replace("EARLY_VERIFIED_DEVELOPER", "• <:discordbotdev:757489652214267904> \`Verified Bot Developer\`")
        flags = flags.replace("HOUSE_BRILLIANCE", "• <:hsquadbrilliance:757487710775672863> \`HypeSquad Brilliance\`")
        flags = flags.replace("HOUSE_BALANCE", "• <:hsquadbalance:757487549605347348>\`HypeSquad Balance\`")
        flags = flags.replace("DISCORD_PARTNER", "• <:partner:739714991732686848> \`Partner\`")
        flags = flags.replace("HYPESQUAD_EVENTS", "• <a:hypesquad:755471122430034060>\`Hypesquad Event\`")
        flags = flags.replace("DISCORD_CLASSIC", "• <a:classic:740922817683652754>\`Discord Classic\`")

        if (nitroBadge.includes("gif")) {
            flags = flags + `
    • <a:nitroboost:740923077973508156>  \`Nitro\``
        }

        let stat = user.presence.activities[0]
        let custom

        if (user.presence.activities.some(r => r.name === "Spotify")) {
            custom = "Listening to Spotify"
        } else if (stat && stat.name !== "Custom Status") {
            custom = stat.name
        } else {
            custom = "Nothing"
        }

        if (user.presence.activities.some(r => r.name !== "Spotify") && stat && stat.state !== null) {
            stat = stat.state
        } else {
            stat = "Nothing"
        }
        
        if (user.lastMessage) {
            lastMessage = user.lastMessage.content
            lastMessageTime = moment(user.lastMessage.createdTimestamp).format('MMMM Do YYYY, H:mm:ss a')
        } else {
            lastMessage = "None"
            lastMessageTime = "None"
        }

        const embeddd = new MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setDescription(`__**User Info**__
         **•** \`ID:\` **${user.id}**
         **•** \`Profile:\` **${user}**
         **•** \`Bot:\` **${user.user.bot ? 'Yes' : 'No'}**
         **•** \`Created At:\` **${moment(user.user.createdAt).format('MMMM Do YYYY, H:mm:ss a')}**
        __**Member Info**__
        **•** \`Nickname:\` **${user.displayName ? user.displayName : 'yok'} **
        **•** \`Joined At:\` **${moment(user.joinedAt).format('MMMM Do YYYY, H:mm:ss a')}**
        **•** \`Activity:\` **${custom}**
        __**Roles:**__
           ${roles}
        __**Messages Info**__
        **•** \`Last Message:\` **${lastMessage}**
        **•** \`Last Message At:\` **${lastMessageTime}**
        __**Badge Information**__
        ${flags} 
    
         __**Safety Check**__
        • ${safe}`)
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('© Karma', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')

        message.channel.send(embeddd)

    }
}
>>>>>>> Stashed changes:old/Commands/Other/profile.js
