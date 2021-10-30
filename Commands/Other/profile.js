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
