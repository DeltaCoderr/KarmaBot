const { MessageEmbed } = require('discord.js');
const Scraper = require('mal-scraper');
const config = require('config'); // Make sure you have your 'config' module imported.

module.exports = {
  help: {
    name: 'anime',
    aliases: ['anime'],
    description: 'Shows information about an anime.',
    category: __dirname.split("Commands\\")[1]
  },
  run: async (client, message, args) => {
    // Get the anime name from the user's input.
    const animeName = args.join(" ");

    // Check if the user provided an anime name.
    if (!animeName) {
      return message.channel.send(`Please provide the name of an anime.`);
    }

    // Limit the length of the anime name to prevent potential issues.
    if (animeName.length > 200) {
      return message.channel.send(`Anime name is too long (max 200 characters).`);
    }

    try {
      // Use a loading message while fetching anime information.
      let msg = await message.channel.send(`Searching for information...`);

      // Fetch anime information.
      const animeInfo = await Scraper.getInfoFromName(animeName);

      // Handle cases where anime information is not available.
      if (!animeInfo.title) {
        return message.channel.send(`No anime found with the provided name.`);
      }

      // Create an embed to display anime information.
      const embed = new MessageEmbed()
        .setColor(config.embedcolor)
        .setURL(animeInfo.url)
        .setTitle(animeInfo.title)
        .setDescription(animeInfo.synopsis)
        .addField(`Type`, animeInfo.type, true)
        .addField(`Status`, animeInfo.status, true)
        .addField(`Premiered`, animeInfo.premiered, true)
        .addField(`Episodes`, animeInfo.episodes, true)
        .addField(`Duration`, animeInfo.duration, true)
        .addField(`Popularity`, animeInfo.popularity, true)
        .addField(`Genres`, animeInfo.genres.join(", "))
        .setThumbnail(animeInfo.picture)
        .setFooter(`Score - ${animeInfo.score}`)
        .setTimestamp();

      // Send the anime information as an embed.
      message.channel.send(embed);

      // Delete the loading message.
      msg.delete();
    } catch (error) {
      console.error(error);
      message.channel.send(`An error occurred while fetching anime information.`);
    }
  },
};
