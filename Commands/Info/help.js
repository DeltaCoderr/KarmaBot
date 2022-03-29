const Command = require("../../Client/Command");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = new Command({
	name: "help",
	aliases: ["help"],
	description: "Help Command.",
	category: "Info",
	run: async (client, message, args) => {
		const directories = [
			...new Set(client.commands.map((cmd) => cmd.category)),
		];

		const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
		const categories = directories.map((dir) => {
			const getCommands = client.commands.filter((cmd) => cmd.category === dir).map(cmd => {
				return {
					name: cmd.name || 'test',
					description: cmd.description || 'test',
					aliases: cmd.aliases || 'test',
				}
			});

			return {
				directory: formatString(dir),
				commands: getCommands,
			}

		});

		const embed = new MessageEmbed()
			.setDescription(`Choose a category in the Drop Down Menu!`);


		const components = (state) => [
			new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId("help-menu")
					.setPlaceholder("Select a Category")
					.setDisabled(state)
					.addOptions(
						categories.map((cmd) => {

							return {
								emoji: Emotes[toID(cmd.directory)],
								label: cmd.directory,
								value: cmd.directory.toLowerCase(),
								description: `Commands from ${cmd.directory} category`,
							};
						})
					)
			)
		];

		const initialMessage = await message.channel.send({
			embeds: [embed],
			components: components(false),
		});

		const filter = (interaction) => interaction.user.id === message.author.id;

		const collector = message.channel.createMessageComponentCollector({
			filter,
			componentType: "SELECT_MENU",
		});

		collector.on('collect', (interaction) => {
			const [directory] = interaction.values;
			const category = categories.find((x) => x.directory.toLowerCase() === directory)
			const categoryEmbed = new MessageEmbed()
				.setTitle(`${formatString(directory)} commands`)
				.setDescription("Here are the list of all the commands.")
				.addFields(
					category.commands.map((cmd) => {
						return {
							name: `\`${cmd.name}\``,
							value: cmd.description,
							inline: true,
						};
					}),
				);
			interaction.update({ embeds: [categoryEmbed] })
		});

		collector.on("end", () => {
			initialMessage.edit({ components: components(true) })
		});
	},
	exec: async (client, interaction) => {
		await interaction.reply({ content: "Use the prefix!" });
	},
});
