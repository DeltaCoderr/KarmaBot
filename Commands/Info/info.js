const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
    help: {
        name: 'info',
        aliases: ['info'],
        description: 'Shows the stats of the Bot',
        category:"Info"
    },
    data : new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows the stats of the Bot'),
    async execute(interaction, client) {
        const mapping = {
            " ": "  ",
            "0": ":zero:",
            "1": ":one:",
            "2": ":two:",
            "3": ":three:",
            "4": ":four:",
            "5": ":five:",
            "6": ":six:",
            "7": ":seven:",
            "8": ":eight:",
            "9": ":nine:",
            "!": "!",
            "?": "?",
            "#": "#",
            "*": "*"
        };

        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
        });
        let guilds;
        let channels;
        let users;
        setTimeout(() => {
            guilds =
                `${client.guilds.cache.size}`
                    .split("")
                    .map(c => mapping[c] || c)
                    .join("")
            channels =
                `${client.channels.cache.size}`
                    .split("")
                    .map(c => mapping[c] || c)
                    .join("")
            let sayy = 0;
            client.guilds.cache.forEach(x => {
                sayy += x.memberCount
            });
            users =
                `${sayy}`
                    .split("")
                    .map(c => mapping[c] || c)
                    .join("")
        }, 200)

        setTimeout(async () => {
            const embed = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/770248422992248862/780032317909237760/unknown.png")
                .setThumbnail(client.user.avatarURL())
                .setDescription("**Karma Bot Project.**" + "\n\n <a:pyramid:757488922354909184> **Number of servers serviced :** " + guilds +
                    "\n <a:pyramid:757488922354909184> **Number of channels served : ** " + channels +
                    "\n <a:pyramid:757488922354909184> **Number of users served : ** " + users +
                    "\n\n <:discordbotdev:757489652214267904> **Developers:** \n <@552814506070507531>")
                .addFields({name:"Invite Link: ",value:`**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**`,inline:true})
                .addFields({name:"Support Link: ",value: `**[Click Here!](https://discord.gg/NtyaM9d)**`,inline:true})
                .addFields({name:"Vote Link: ",value: `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`,inline:true})
                .setTimestamp()
                .setFooter({text: "Karma",iconURL:"https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"})
                .setColor(config.embedcolor);
            await interaction.reply({
                embeds: [embed],
            });
        }, 500)
    }
}