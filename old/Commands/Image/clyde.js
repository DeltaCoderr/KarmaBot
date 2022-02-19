const undici = require('undici');

module.exports = {
	help: {
		name: 'clyde',
		aliases: [],
		description: 'Shows your text as Clyde\'s message,',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const text = args.join(' ');
		if (!text) {
			return message.reply('Please provide some text.');
		}
		const url = `https://fun-api.sujalgoel.engineer/clyde?text=${text}`;
		const { data } = await undici.fetch(url).then((res) => res.json());
		return message.reply(data.image);
	},
};
