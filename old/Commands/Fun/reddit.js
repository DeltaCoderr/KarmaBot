<<<<<<< Updated upstream:Commands/Fun/reddit.js
const Discord = require('discord.js');
const undici = require('undici');


module.exports = {
	help: {
		name: 'reddit',
		aliases: ['r'],
		description: 'Shows random memes from the given subreddit',
		category: __dirname.split('Commands\\')[1],
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
=======
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const redditimage = require('reddit.images');

module.exports = {
    help: {
        name: 'reddit',
        aliases: ['reddit'],
        description: 'Shows random memes from the given subreddit',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        try {
            if (!args[0]) return message.reply("**Please provide a subreddit.**")
            const subreds = args[0]

            redditimage.reddit.FetchSubreddit(subreds).then((data) => {
                const reddit = new MessageEmbed()
                    .setTitle(data.title)
                    .setURL(data.postLink)
                    .setImage(data.image)
                    .setDescription(`👍 **${data.upvotes}** | 👎 **${data.downvotes}**`)
                    .setAuthor(`r/${subreds}`, "https://cdn.discordapp.com/attachments/799226474640048149/799273472990642196/2018_social_media_popular_app_logo_reddit-512.png", data.postLink)
                    .setColor(config.embedcolor)
                    .setFooter(`If the image didn't load click the title.`, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp()


                if (data.NSFW === true) {
                    message.channel.send('Wait... this meme was flagged as `nsfw` meme, are you sure you want to continue? (`yes`) or (`no`)')
                    let nsfwFilter = m => m.author.id === message.author.id;
                    let nsfwCollector = new Discord.MessageCollector(message.channel, nsfwFilter, { max: 999 });
                    nsfwCollector.on('collect', async msg => {
                        if (msg.content.toLowerCase() === 'yes') {
                            if (msg.channel.nsfw) {
                                message.channel.send(reddit)
                                await nsfwCollector.stop()
                                return;
                            } else {
                                message.channel.send('This channel is NOT a nsfw channel.')
                                await nsfwCollector.stop()
                                return;
                            }
                        } else if (msg.content.toLowerCase() === 'no') {
                            message.channel.send('Alright.')
                            await nsfwCollector.stop()
                            return;
                        } else {
                            message.channel.send('Please provide a valid answer! (`yes`) or (`no`)')
                            return;
                        }
                    })
                } else if (data.spoiler === true) {
                    message.channel.send('This meme was flagged as `spoiler` meme, are you sure you want to continue? (`yes`) or (`no`)')
                    let spoilerFilter = m => m.author.id === message.author.id;
                    let spoilerCollector = new Discord.MessageCollector(message.channel, spoilerFilter, { max: 999 });
                    spoilerCollector.on('collect', async msg => {
                        if (msg.content.toLowerCase() === 'yes') {
                            message.channel.send(reddit)
                            await spoilerCollector.stop()
                            return;
                        } else if (msg.content.toLowerCase() === 'no') {
                            message.channel.send('Seems like you dont want spoilers, alright ig.')
                            await spoilerCollector.stop()
                            return;
                        } else {
                            message.channel.send('Please provide a valid answer! (`yes`) or (`no`)')
                            return;
                        }
                    })
                } else if (data.NSFW || data.spoiler) {
                    return message.channel.send(reddit)
                }
            })
        } catch (e) {
            if (e.status === 403) return message.channel.send('Meme Is Private!')
            if (e.status === 404) return message.channel.send('Meme Not Found!')
            return message.channel.send('Invalid subreddit.')
        }
    }
}
>>>>>>> Stashed changes:old/Commands/Fun/reddit.js
