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
            return message.channel.send({embeds: [errorembed]});
        }

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {

            if (result.length === 0) {
                let errorembed = new MessageEmbed()
                    .setTitle("Error :cry:")
                    .setDescription("Please enter a vaild location!")
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
                return message.channel.send({ embeds: [errorembed] });
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
                return message.channel.send({embeds: [errorembed]});
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
            message.channel.send({embeds: [embed]})
        })

    }
}