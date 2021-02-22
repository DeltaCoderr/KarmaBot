const Discord = require('discord.js');
const config = require('../../configs/config.json');
const { base64 } = require('../../configs/functions.js')
const request = require('node-superfetch');
const { createCanvas, loadImage } = require('canvas');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: 'whatanime',
        description: 'Shows what anime the picture is from',
        aliases: ["wa"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        
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

async function fetchRateLimit() {
    try {
        const { body } = await request.get('https://trace.moe/api/me');
        return { status: body.user_limit > 0, refresh: body.user_limit_ttl };
    } catch {
        return { status: false, refresh: Infinity };
    }
}

async function search(file) {
    if (Buffer.byteLength(file) > 1e+7) return 'size';
    const { body } = await request
        .post('https://trace.moe/api/search')
        .attach('image', base64(file));
    const data = body.docs[0];
    return {
        prob: Math.round(data.similarity * 100),
        episode: data.episode,
        title: data.title_english,
        preview: await fetchPreview(data),
        nsfw: data.is_adult
    };
}

async function fetchPreview(data) {
    try {
        const { body } = await request
            .get(`https://media.trace.moe/video/${data.anilist_id}/${encodeURIComponent(data.filename)}`)
            .query({
                t: data.at,
                token: data.tokenthumb,
                mute: true,
                size: 'm'
            });
        return body;
    } catch {
        return null;
    }
}

async function convertGIF(image) {
    const data = await loadImage(image);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
}
