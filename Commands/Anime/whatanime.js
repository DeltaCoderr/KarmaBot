const { fetchRateLimit, search, convertGIF } = require('../../Base/Functions');
const { stripIndents } = require('common-tags');

module.exports = {
    help: {
        name: 'whatanime',
        aliases: ['whatanime'],
        description: 'Provides the Anime name from the image.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message, args) => {

        let msg = message;
        try {
            let screenshot;
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(message.attachments.first()) {
                screenshot = message.attachments.first().url
            } else if(user) {
                screenshot = user.user.displayAvatarURL({ format: 'png' })
            } else {
                screenshot = message.author.displayAvatarURL({ format: 'png' })
            }
              const status = await fetchRateLimit();
              if (!status.status) {
                  return msg.reply(`Oh no, I'm out of requests! Please wait ${status.refresh} seconds and try again.`);
              }
              let { body } = await request.get(screenshot);
              if (screenshot.endsWith('.gif')) body = await convertGIF(body);
              const result = await search(body, msg.channel.nsfw);
              if (result === 'size') return msg.reply('Please do not send an image larger than 10MB.');
              if (result.nsfw && !msg.channel.nsfw) {
                  return msg.reply('This is from a hentai, and this isn\'t an NSFW channel.');
              }
              const title = `${result.title}${result.episode ? ` episode ${result.episode}` : ''}`;
              return msg.reply(stripIndents`
                  I'm ${result.prob}% sure this is from ${title}.
                  ${result.prob < 90 ? '_This probablity is rather low, try using a higher quality image._' : ''}
              `, result.preview ? { files: [{ attachment: result.preview, name: 'preview.mp4' }] } : {});
          } catch (err) {
            console.log(err.stack)
              return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
              
          }
 
    }
}