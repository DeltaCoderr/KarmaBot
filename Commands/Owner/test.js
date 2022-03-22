const Command = require("../../Structures/Command");

module.exports = new Command({
	name: "test",
	description: "Test Command",
	options: [
		{
			name: "test",
			description: "test",
			required: false,
			type: Command.types.STRING,
		},
	],
	exec: async (client, interaction) => {
		interaction.reply({
			content: `test`,
			ephemeral: true,
		});
	},
});
