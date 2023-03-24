const { MessageEmbed } = require("discord.js");
const cowsay = require("cowsay");

module.exports = {
    help: {
        name: "cowsay",
        aliases: ["saycow"],
        description: "Cow will repeat after you",
        category: __dirname.split("Commands\\")[1],
    },
    run: async (client, message, args) => {
        let result = cowsay.say({
            text: `${args}`,
        });

        const embed = new MessageEmbed()
            .setTitle("Cow speaking up...")
            .setThumbnail(
                "https://png.pngtree.com/png-clipart/20200225/original/pngtree-binary-code-and-magnifying-glass-isometric-icon-png-image_5252004.jpg"
            )

            .setDescription("```\n" + result + "\n```")
            .setTimestamp()
            .setFooter(
                "© Karma",
                "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
            )
            .setColor(config.embedcolor);

        await message.channel.send(embed);
    },
};
