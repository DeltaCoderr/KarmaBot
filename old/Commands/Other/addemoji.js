<<<<<<< Updated upstream:Commands/Other/addemoji.js
const Discord = require('discord.js');


const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'addemoji',
		aliases: [],
		description: 'Adds an emoji to your server',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (!message.member.permissions.has('1073741824n')) {
			return message.reply(
				`${emotes.error} You don't have the \`MANAGE_GUILD\` permission to use this command.`,
			);
		}

		const URL = args[0];
		if (!URL || !Functions.isUrl(URL)) {
			return message.reply('Please provide an emoji url.');
		}

		const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, '') : null;
		if (!name) {
			return message.reply('Please provide an emoji name.');
		}
		if (name.length < 2 || name > 32) {
			return message.reply(
				'Emoji name should be greater than 2 and less than 32.',
			);
		}

		try {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${emotes.verified} Emoji Added`)
				.setDescription(
					`${emotes.verified} Emoji has been Added! | Name : ${name} | Preview : [Click Here](${URL})`,
				);

			await message.guild.emojis.create(URL, name);
			message.reply({ embeds: [embed] });
		} catch (err) {
			console.log(err);
			return message.reply(`${emotes.error} An error has occured!`);
		}
	},
};
=======
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const { checkPermission } = require('../../Base/Permissions');
let isUrl = require("is-url");
module.exports = {
    help: {
        name: 'addemoji',
        aliases: ['addmemoji'],
        description: 'Adds an emoji to your server',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        /****   Checking Permissions    ****/
        let clientPermission = await checkPermission('client', message, [
            'MANAGE_EMOJIS',
        ]);
        if (clientPermission) return

        let memberPermission = await checkPermission('member', message, [
            'MANAGE_EMOJIS',
        ])
        if (memberPermission) return;

        /***       Regular Code      ***/
        let type = "";
        let name = "";
        let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);

        if (emote) {
            emote = args[0];
            type = "emoji";
            name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
        } else {
            emote = `${args.find(arg => isUrl(arg))}`
            name = args.find(arg => arg != emote);
            type = "url";
        }
        let emoji = { name: "" };
        let Link;
        if (type == "emoji") {
            emoji = Discord.Util.parseEmoji(emote);
            Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
        } else {
            if (!name) return message.channel.send("Please Provide an Name for the Emoji!\n`k!addemoji [Link] [Emoji Name]` ");
            Link = message.attachments.first() ? message.attachments.first().url : emote
        }

        try {
            const Added = new MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(`${emotes.verified} Emoji Added`)
                .setDescription(`${emotes.verified} Emoji has been Added! | Name : ${name || `${emoji.name}`} | Preview : [Click Here](${Link})`);

            await message.guild.emojis.create(`${Link}`, `${`${name || emoji.name}`}`)
            message.channel.send(Added)
        } catch (err) {
            console.log(err)
            return message.channel.send(`${emotes.error} An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n- The emoji size is too big.\`\`\``)
        }
    }
}
>>>>>>> Stashed changes:old/Commands/Other/addemoji.js
