const Command = require("../../Client/Command");
const Database = require("../../Client/Database");

module.exports = new Command({
    name: "setchatbot",
    aliases: ["setchatbot"],
    description: "Sets the Chatbot feature.",
    category: "Chatbot",
    slashOptions: [
        {
            name: "channel",
            description: "Select the Channel for ChatBot.",
            type: Command.types.CHANNEL,
            required: true,
        },
    ],
    permissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        message.reply(`This is a Slash Command \`(/)\``)
    },
    exec: async (client, interaction) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const db = await Database.findOne({ ID: `chatbot_${interaction.guildId}` });

        if (channel.type !== 'GUILD_TEXT') { return interaction.reply({ content: `Channel Must be a \`Text Channel\`` }) };

        if (db) {
            db.data = channel.id;
            await db.save();
        } else {
            const newDB = new Database({
                ID: `chatbot_${interaction.guildId}`,
                data: channel.id,
            });
            await newDB.save();
        }

        return interaction.reply({
            content: `${Emotes.verified} Chatbot channel successfully set in ${channel}`
        })

    },
});
