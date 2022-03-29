const Command = require("../../Client/Command");
const Database = require("../../Client/Database");

module.exports = new Command({
    name: "disablechatbot",
    aliases: ["disablechatbot"],
    description: "Disables the Chatbot feature.",
    category: "Chatbot",
    permissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        message.reply(`This is a Slash Command \`(/)\``)
    },
    exec: async (client, interaction) => {
        const db = await Database.findOne({ ID: `chatbot_${interaction.guildId}` });
        const channel = db ? db.data : null;

        if (!channel) { return interaction.reply({ content: `${Emotes.error} There is no Chatbot channel to disable!` }) }
        else {
            await Database.findOneAndDelete(
                { ID: `chatbot_${interaction.guildId}` },
                { useFindAndModify: false, }
            );
            return interaction.reply({ content: `${Emotes.verified} Chatbot has been successfully disabled!` })
        }
    },
});
