const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'weather',
		aliases: [],
		description: 'Shows the weather :o',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message, args) => {
		if (args.length === 0) {
			const embed = new Discord.MessageEmbed()
				.setTitle('Error :cry:')
				.setDescription('Please enter a location!')
				.setColor(config.embedColor)
				.setTimestamp()
				.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
			return message.reply({ embeds: [embed] });
		}

		const woeid = await undici.fetch(
			`https://www.metaweather.com/api/location/search/?query=${args.join(
				' ',
			)}`,
		).then((res) => res.json());
		if (woeid.length === 0) {
			const embed = new Discord.MessageEmbed()
				.setTitle('Error :cry:')
				.setDescription('Please enter a vaild location!')
				.setColor(config.embedColor)
				.setTimestamp()
				.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
			return message.reply({ embeds: [embed] });
		}

		const weather = await undici.fetch(
			`https://www.metaweather.com/api/location/${woeid[0].woeid}/`,
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setTitle(
				`Weather in ${weather.title} is "${weather.consolidated_weather[0].weather_state_name}"`,
			)
			.setThumbnail(
				`https://www.metaweather.com/static/img/weather/png/${weather.consolidated_weather[0].weather_state_abbr}.png`,
			)
			.setColor(config.embedColor)
			.addField(
				'Temperature',
				`${weather.consolidated_weather[0].the_temp.toFixed(2)}°C`,
				true,
			)
			.addField(
				'Winds',
				weather.consolidated_weather[0].wind_speed.toFixed(2) + 'mph',
				true,
			)
			.addField(
				'Humidity',
				`${weather.consolidated_weather[0].humidity}%`,
				true,
			)
			.addField('Timezone', `${weather.timezone}`, true)
			.addField('Degree Type', 'Centigrade(°C)', true)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
		message.reply({ embeds: [embed] });
	},
};
