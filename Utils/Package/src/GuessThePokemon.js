const gameData = new Set();
const undici = require('undici');
const Discord = require('discord.js');
const functions = require('../../../Base/Functions');

module.exports = async (options) => {
	if (!options.message) {
		throw new Error('Weky Error: message argument was not specified.');
	}
	if (typeof options.message !== 'object') {
		throw new TypeError('Weky Error: Invalid Discord Message was provided.');
	}

	if (!options.embed) options.embed = {};
	if (typeof options.embed !== 'object') {
		throw new TypeError('Weky Error: embed must be an object.');
	}

	if (!options.embed.title) {
		options.embed.title = 'Guess The Pokémon | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
	}

	if (!options.embed.description) {
		options.embed.description =
			'**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.';
	}
	if (typeof options.embed.description !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
	}

	if (!options.embed.color) options.embed.color = functions.randomHexColor();
	if (typeof options.embed.color !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
	}

	if (!options.embed.footer) options.embed.footer = {};
	if (typeof options.embed.footer !== 'object') {
		throw new TypeError('Weky Error: embed footer must be an object.');
	}

	if (!options.embed.footer.text) {
		options.embed.footer.text = '©️ Weky Development';
	}
	if (typeof options.embed.footer.text !== 'string') {
		throw new TypeError('Weky Error: embed footer must be a string.');
	}

	if (!options.embed.footer.icon_url) {
		options.embed.footer.icon_url = 'https://i.imgur.com/U34MPtp.png';
	}
	if (typeof options.embed.footer.icon_url !== 'string') {
		throw new TypeError('Weky Error: embed footer icon_url must be a string.');
	}

	if (!options.embed.timestamp) options.embed.timestamp = true;
	if (typeof options.embed.timestamp !== 'boolean') {
		throw new TypeError('Weky Error: timestamp must be a boolean.');
	}

	if (!options.thinkMessage) options.thinkMessage = 'I am thinking';
	if (typeof options.thinkMessage !== 'string') {
		throw new TypeError('Weky Error: thinkMessage must be a boolean.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	if (!options.winMessage) {
		options.winMessage =
			'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.';
	}
	if (typeof options.winMessage !== 'string') {
		throw new TypeError('Weky Error: winMessage must be a boolean.');
	}

	if (!options.loseMessage) {
		options.loseMessage = 'Better luck next time! It was a **{{answer}}**.';
	}
	if (typeof options.loseMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a boolean.');
	}

	if (!options.time) options.time = 60000;
	if (parseInt(options.time) < 10000) {
		throw new Error(
			'Weky Error: time argument must be greater than 10 Seconds (in ms i.e. 10000).',
		);
	}
	if (typeof options.time !== 'number') {
		throw new TypeError('Weky Error: time must be a number.');
	}

	if (!options.incorrectMessage) {
		options.incorrectMessage = 'No {{author}}! The pokémon isn\'t `{{answer}}`';
	}
	if (typeof options.incorrectMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a string.');
	}

	if (!options.buttonText) options.buttonText = 'Cancel';
	if (typeof options.buttonText !== 'string') {
		throw new TypeError('Weky Error: buttonText must be a string.');
	}

	if (gameData.has(options.message.author.id)) {
		return options.message.reply('You already have a game running!');
	}
	gameData.add(options.message.author.id);

	const id =
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20);

	const think = await options.message.reply({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}.`)
				.setColor(options.embed.color),
		],
	});

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}..`)
				.setColor(options.embed.color),
		],
	});

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}...`)
				.setColor(options.embed.color),
		],
	});

	const { data } = await undici.fetch(
		'https://fun-api.sujalgoel.engineer/pokemon',
	).then((res) => res.json());

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}..`)
				.setColor(options.embed.color),
		],
	});

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}.`)
				.setColor(options.embed.color),
		],
	});

	let btn1 = new Discord.MessageButton()
		.setStyle('DANGER')
		.setLabel(options.buttonText)
		.setCustomId(id);

	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			options.embed.description
				.replace('{{type}}', data.types.join(', '))
				.replace('{{abilities}}', data.abilities.join(', '))
				.replace('{{time}}', functions.convertTime(options.time)),
		)
		.setColor(options.embed.color)
		.setImage(data.HiddenImage)
		.setFooter(options.embed.footer.text, options.embed.footer.icon_url);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}

	await think.edit({
		embeds: [embed],
		components: [{ type: 1, components: [btn1] }],
	});
	const gameCreatedAt = Date.now();
	const collector = await options.message.channel.createMessageCollector({
		filter: m => m.author.id === options.message.author.id,
		time: options.time,
	});

	collector.on('collect', async (msg) => {
		if (msg.content.toLowerCase() === data.name) {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.winMessage
						.replace(
							'{{answer}}',
							data.name.charAt(0).toUpperCase() + data.name.slice(1),
						)
						.replace(
							'{{time}}',
							functions.convertTime(Date.now() - gameCreatedAt),
						),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer.text, options.embed.footer.icon_url);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply({
				embeds: [_embed],
			});
			btn1 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(options.buttonText)
				.setDisabled()
				.setCustomId(id);
			await think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1] }],
			});
			collector.stop();
			gameData.delete(options.message.author.id);
		} else {
			const _embed = new Discord.MessageEmbed()
				.setDescription(
					options.incorrectMessage
						.replace('{{answer}}', msg.content.toLowerCase())
						.replace('{{author}}', msg.author.toString()),
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer.text, options.embed.footer.icon_url);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply({
				embeds: [_embed],
			});
		}
	});

	const gameCollector = think.createMessageComponentCollector({
		filter: (fn) => fn,
	});

	gameCollector.on('collect', async (button) => {
		if (button.user.id !== options.message.member.id) {
			return button.reply({
				content: options.othersMessage.replace(
					'{{author}}',
					options.message.member.id,
				),
				ephemeral: true,
			});
		}

		await button.deferUpdate();

		if (button.customId === id) {
			btn1 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(options.buttonText)
				.setDisabled()
				.setCustomId(id);
			gameCollector.stop();
			collector.stop();
			gameData.delete(options.message.author.id);
			think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1] }],
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.loseMessage.replace(
						'{{answer}}',
						data.name.charAt(0).toUpperCase() + data.name.slice(1),
					),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer.text, options.embed.footer.icon_url);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({
				embeds: [_embed],
			});
		}
	});

	collector.on('end', async (_msg, reason) => {
		if (reason === 'time') {
			btn1 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(options.buttonText)
				.setDisabled()
				.setCustomId(id);
			gameCollector.stop();
			collector.stop();
			gameData.delete(options.message.author.id);
			think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1] }],
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.loseMessage.replace(
						'{{answer}}',
						data.name.charAt(0).toUpperCase() + data.name.slice(1),
					),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer.text, options.embed.footer.icon_url);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({
				embeds: [_embed],
			});
		}
	});
};
