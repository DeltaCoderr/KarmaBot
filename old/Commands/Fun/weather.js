<<<<<<< Updated upstream:Commands/Fun/weather.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'weather',
		aliases: [],
		description: 'Shows the weather :o',
		category: __dirname.split('Commands\\')[1],
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
=======
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js')
module.exports = {
    help: {
        name: 'weather',
        aliases: ['weather'],
        description: 'Shows the weather :o ',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        if (args.length === 0) {
            let errorembed = new MessageEmbed()
                .setTitle("Error :cry:")
                .setDescription("Please enter a location!")
                .setColor(config.embedcolor)
                .setTimestamp()
                .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
            return message.channel.send(errorembed);
        }

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {

            if (result.length === 0) {
                let errorembed = new MessageEmbed()
                    .setTitle("Error :cry:")
                    .setDescription("Please enter a vaild location!")
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
                return message.channel.send(errorembed);
            }

            var current = result[0].current;
            var location = result[0].location;
            if (err) {
                let errorembed = new MessageEmbed()
                    .setTitle("Error :cry:")
                    .setDescription("Please enter a vaild location!")
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
                return message.channel.send(errorembed);
            }


            let embed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(config.embedcolor)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', location.degreetype, true)
                .addField('Temperature', `${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .setTimestamp()
                .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
            message.channel.send(embed)
        })

    }
}
>>>>>>> Stashed changes:old/Commands/Fun/weather.js
