const request = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
const { GuildMember, User } = require('discord.js')
const { Bot } = require('../Structures/Client')

async function fetchRateLimit() {
        try {
            const { body } = await request.get('https://trace.moe/api/me');
            return { status: body.user_limit > 0, refresh: body.user_limit_ttl };
        } catch {
            return { status: false, refresh: Infinity };
        }
};

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
};

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
};

async function convertGIF(image) {
    const data = await loadImage(image);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
}

  
async function base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
		throw new TypeError(`${mode} is not a supported base64 mode.`);
};


async function resolveMember(query, guild) {
    if(query instanceof GuildMember) return query;
    if(query instanceof User) return guild.members.fetch(query);
  
    if(typeof query !== 'string') return null;
      
    if(/^(?:<@!?)?(\d{17,19})>?$/.test(query)) return guild.members.fetch(/^(?:<@!?)?(\d{17,19})>?$/.exec(query)[1]).catch(() => {});
    if(/\w{1,32}#\d{4}/.test(query)){
      const res = guild.members.find(member => member.user.tag.toLowerCase() === query.toLowerCase());
      return res || null;
    }
};

module.exports = { fetchRateLimit, search, fetchPreview, convertGIF, base64, resolveMember }