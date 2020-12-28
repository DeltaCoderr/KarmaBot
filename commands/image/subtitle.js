const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { wrapText } = require('../../utils/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });

module.exports = {
config: {
name: "subtitle",
description: "Edit a image and put a subtitle on it.",
usage: "<upload IMAGE> <subtitle>"
},
run: async (client, msg, args) => {
const image = msg.attachments.first()
    if(!image) return msg.reply("upload the image you wanted to edit!")
   const subtitleArgs = msg.content.split(" ").slice(1).join(" ").split(", ");
    const text = subtitleArgs[0];
    if(!text) return msg.reply("What should the subtitle be?")
		try {
			const { body } = await request.get(image.url);
			const base = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			const fontSize = Math.round(base.height / 15);
			ctx.font = `${fontSize}px Noto`;
			ctx.fillStyle = 'yellow';
			ctx.textAlign = 'center';
			const lines = await wrapText(ctx, text, base.width - 10);
			if (!lines) return msg.reply('There\'s not enough width to subtitle this image.');
			ctx.textBaseline = 'bottom';
			const initial = base.height - ((lines.length - 1) * fontSize) - (fontSize / 2) - ((lines.length - 1) * 10);
			for (let i = 0; i < lines.length; i++) {
				const textHeight = initial + (i * fontSize) + (i * 10);
				ctx.strokeStyle = 'black';
				const rounded = Math.round(base.height / 100);
				ctx.lineWidth = rounded < 1 ? 1 : rounded;
				ctx.strokeText(lines[i], base.width / 2, textHeight);
				ctx.fillStyle = 'yellow';
				ctx.fillText(lines[i], base.width / 2, textHeight);
			}
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return msg.reply('Resulting image was above 8 MB.');
			return msg.say({ files: [{ attachment, name: 'subtitle.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
}
