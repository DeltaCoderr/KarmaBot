const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../Configs/config");

module.exports = {
    help: {
        name: 'eval',
        aliases: ['eval'],
        description: 'Evaluate any Javascript Code.',
        category: __dirname.split("Commands\\")[1]
    },
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluate any Javascript Code.")
        .addStringOption((option) =>
        option
            .setName("code")
            .setDescription("Javascript code you want to Evaluate.")
            .setRequired(true)
        ),
    async execute(interaction, client) {

        if (config.devs !== interaction.user.id) return interaction.reply('Only the Developer can use this command.');

        const content = interaction.options.getString("code")
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== 'string') {
                output = require('util').inspect(output, { depth: 0 });
            }
            interaction.reply(output, {
                code: 'js'
            });
        }).catch((err) => {
            err = err.toString();
            interaction.reply(err, {
                code: 'js'
            });
        });

    }
}
