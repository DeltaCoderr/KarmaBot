const Discord = require('discord.js');
const undici = require('undici');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'reddit',
		aliases: ['r'],
		description: 'Shows random memes from the given subreddit',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message, args) => {
		const subreddit = args.join(' ');
		if (!subreddit) return message.reply('Please provide a subreddit.');
		const data = await undici.fetch(`https://fun-api.sujalgoel.engineer/r/${subreddit}`).then(res => res.json());
		if(data.error && data.error === 'Please try again!') {
			return message.reply('Please try again!');
		} else if(data.error && data.error === 'Private Subreddit!') {
			return message.reply('Private Subreddit!');
		} else if(data.error && data.error === 'Invalid Subreddit!') {
			return message.reply('Invalid Subreddit!');
		}

		const reddit = new Discord.MessageEmbed()
			.setTitle(data.title)
			.setURL(data.postLink)
			.setImage(data.image)
			.setDescription(`👍 **${data.upvotes}** | 👎 **${data.downvotes}**`)
			.setAuthor(
				`r/${subreddit}`,
				'https://i.imgur.com/4xwMbl6.png',
				data.postLink,
			)
			.setColor(config.embedColor)
			.setFooter(
				'If the image didn\'t load click the title.',
				message.guild.iconURL({ dynamic: true }),
			)
			.setTimestamp();

		if (data.NSFW) {
			let acceptbutton = new Discord.MessageButton()
				.setStyle('SUCCESS')
				.setLabel('Yes')
				.setCustomId('accept');
			let denybutton = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel('No')
				.setCustomId('deny');

			const question = await message.reply({
				content: 'This image is NSFW. Do you want to view it?',
				components: [
					{
						type: 1,
						components: [acceptbutton, denybutton],
					},
				],
			});

			const Collector = await question.createMessageComponentCollector({
				filter: (fn) => fn,
				time: 60000,
			});

			Collector.on('collect', async (btn) => {
				if (btn.member.id !== message.author.id) {
					return btn.reply({
						content: `Only ${message.author.id} can use the buttons.`,
						ephemeral: true,
					});
				}

				await btn.deferUpdate();

				if (btn.customId === 'deny') {
					Collector.stop();
					acceptbutton = new Discord.MessageButton()
						.setDisabled()
						.setStyle('SUCCESS')
						.setLabel('Yes')
						.setCustomId('accept');
					denybutton = new Discord.MessageButton()
						.setDisabled()
						.setStyle('DANGER')
						.setLabel('No')
						.setCustomId('deny');
					return question.edit({
						content: 'Alright!',
						components: [
							{
								type: 1,
								components: [acceptbutton, denybutton],
							},
						],
					});
				} else if (btn.customId === 'accept') {
					Collector.stop();
					if (!message.channel.nsfw) {
						acceptbutton = new Discord.MessageButton()
							.setDisabled()
							.setStyle('SUCCESS')
							.setLabel('Yes')
							.setCustomId('accept');
						denybutton = new Discord.MessageButton()
							.setDisabled()
							.setStyle('DANGER')
							.setLabel('No')
							.setCustomId('deny');
						return question.edit({
							content: 'This is not an NSFW channel!',
							components: [
								{
									type: 1,
									components: [acceptbutton, denybutton],
								},
							],
						});
					}
					return message
						.reply({ embeds: [reddit] })
						.then(() => question.delete());
				}
			});
		} else {
			return message.reply({ embeds: [reddit] });
		}
	},
};
