const { MessageEmbed } = require("discord.js");
const Command = require("../../Client/Command");

module.exports = new Command({
	name: "profile",
	description: "User Profile Information",
	category: "Utility",
	slashOptions: [
		{
			name: "target",
			description: "Member/User",
			type: Command.types.USER,
			required: false,
		},
	],
	exec: async (client, interaction) => {
		const member = interaction.options.getMember("target");
		const user = interaction.options.getUser("target");

		const embed = new MessageEmbed()
			.setTitle(user.tag)
			.setURL(`https://discord.com/users/${user.id}`)
			.setFooter({
				text: `ID: ${user.id}`,
			});

		if (member) {
			const roles = member.roles.cache.map((r) => r.name).slice(0, -1);
			const links = `[Avatar](${
				user.avatarURL({ dynamic: true, format: "webp" }) ??
				user.defaultAvatarURL
			})`;
			(await member.fetch()).avatar;
			if (member.avatar) {
				links += ` | [Server Avatar](${member.avatarURL({
					dynamic: true,
					format: "webp",
				})})`;
			}
			(await user.fetch()).banner;
			if (user.banner) {
				links += ` | [Banner](${user.bannerURL({
					dynamic: true,
					format: "webp",
				})})`;
			}

			embed
				.setColor(member.displayHexColor)
				.setThumbnail(member.displayAvatarURL({ dynamic: true }))
				.addField(`> Nickname`, `${member.displayName}`, true)
				.addField(
					`> Roles`,
					`${roles.length !== 0 ? roles.join(", ") : "None"}`,
					true
				)
				.addField(`> Badges`, `mori-delta-upto-you-:)`, true)
				.addField(
					`> Created At`,
					`<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
					true
				)
				.addField(
					`> Joined At`,
					`<t:${parseInt(member.joinedTimestamp / 10000)}:R>`,
					true
				)
				.addField(`> Links`, links, true);

			return interaction.reply({
				embeds: [embed],
			});
		} else {
			const links = `[Avatar](${
				user.avatarURL({ dynamic: true, format: "webp" }) ??
				user.defaultAvatarURL
			})`;

			(await user.fetch()).banner;
			if (user.banner) {
				links += ` | [Banner](${user.bannerURL({
					dynamic: true,
					format: "webp",
				})})`;
			}

			embed
				.setColor("2f3136")
				.setThumbnail(
					user.avatarURL({ dynamic: true }) ?? user.defaultAvatarURL
				)
				.addField(
					`> Created At`,
					`<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
					true
				)
				.addField(`> Badges`, `same as above lol`, true)
				.addField(`> Links`, links, true);

			return interaction.reply({
				embeds: [embed],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: "Profile",
								emoji: "796734755735207936",
								style: "LINK",
								url: `https://discord.com/users/${user.id}`,
							},
						],
					},
				],
			});
		}
	},
});
