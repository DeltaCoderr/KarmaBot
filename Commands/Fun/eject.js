const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'eject',
        aliases: ['eject'],
        description: 'Yeet a user',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        try {

            const user = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
            const imp = [true, false];
            const imposter = imp[Math.floor(Math.random() * imp.length)];
            const crew = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"]
            const crewmate = crew[Math.floor(Math.random() * crew.length)];

            const data = await fetch(`https://vacefron.nl/api//ejected?name=${user.username}&impostor=${imposter}&crewmate=${crewmate}`)

            const embed = new   MessageEmbed()
                .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
                .setTitle(`${message.author.username} decided to eject ${user.username}`)
                .setColor(config.embedcolor)
                .setImage(`${data.url}`)

            message.channel.send(embed);
        } catch (err) {
            const embed2 = new MessageEmbed()
                .setTitle(`${emotes.error} Something went wrong.\n${emotes.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
                .setColor(config.embedcolor)
            message.channel.send(embed2)
        }
    }
}