const undici = require('undici');
const { MessageEmbed } = require('discord.js');

module.exports = {
  help: {
    name: 'neko',
    aliases: [],
    description: 'Drops random Neko Pictures.',
    category: __filename.split('Commands/')[1],
  },
  run: async (client, message) => {
    try {
      const { url } = await fetchNekoImage();
      const embed = createNekoEmbed(url);
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error while fetching or sending neko image:', error);
      message.reply('An error occurred while fetching the neko image.');
    }
  },
};

async function fetchNekoImage() {
  const response = await undici.fetch('https://shiro.gg/api/images/neko');
  if (response.statusCode === 200) {
    const { url } = await response.json();
    return { url };
  } else {
    throw new Error(`Failed to fetch neko image. Status code: ${response.statusCode}`);
  }
}

function createNekoEmbed(url) {
  return new MessageEmbed()
    .setTitle("Here's your Neko")
    .setImage(url)
    .setColor('#yourEmbedColor') // Replace with your desired embed color
    .setTimestamp()
    .setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
    .setURL(url);
}
