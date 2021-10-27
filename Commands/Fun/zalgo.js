const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'zalgo',
		aliases: ['zalgo'],
		description: 'Converts your text into Zalgo ',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		message.reply(Functions.zalgoConvert(args.join(' ')));
	},
};
