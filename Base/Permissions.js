const { Message, MessageEmbed } = require("discord.js");
const { Bot } = require("../Structures/Client");

/**
 *
 * @param { String } of
 * @param { Message } message
 * @param { Array } permissions
 */
async function checkPermission(of, message, permissions) {
  //checking
  if (!of || !message || !permissions)
    throw new Error("Unable to access of/message/permissions");

  /**
   * @type { Bot }
   */
  switch (of.toLowerCase()) {
    case "client":
      //embed
      let cEmbed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.avatarURL({ dynamic: true })
        )
        .setColor(config.embedcolor)
        .setFooter(
            "© Karma",
            "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
        )
        .setDescription(
          `${emotes.error} **Bot needs some permissions to executive the command**`
        );

      //array
      let array = [];

      //looping each permissions
      permissions.forEach((permission) => {
        //checking permission
        if (!message.guild.me.hasPermission(permission)) {
          //pushing to array
          array.push(permission);
        }
      });

      //if it includes administrator
      if (array.length && array.includes("ADMINISTRATOR")) {
        cEmbed.addField(
          `${emotes.error} Missing Permission(s)`,
          `\`ADMINISTRATOR\``
        );
        message.channel.send(cEmbed).catch(() => {});
        return true;
      }

      //if not includes administrator
      else if (array.length) {
        cEmbed.addField(
          `${emotes.error} Missing Permission(s)`,
          `\`${array.join(" , ")}\``
        );
        message.channel.send(cEmbed).catch(() => {});
        return true;
      }
      break;

    //case member
    case "member":
      let mEmbed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.avatarURL({ dynamic: true })
        )
        .setColor(config.embedcolor)
        .setFooter(
            "© Karma",
            "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
        )
        .setDescription(
          `${emotes.error} **You don't have enough permissions to use this command!**`
        );

      //array
      let mArray = [];

      //looping permissions
      permissions.forEach((permission) => {
        if (!message.member.hasPermission(permission)) {
          //pushing to array
          mArray.push(permission);
        }
      });

      //if includes administrator
      if (mArray.length && mArray.includes("ADMINISTRATOR")) {
        mEmbed.addField(
          `${emotes.error} Missing Permission(s)`,
          `\`ADMINISTRATOR\``
        );
        message.channel.send(mEmbed).catch(() => {});
        return true;
      }

      //if not includes administrator
      else if (mArray.length) {
        mEmbed.addField(
          `${emotes.error} Missing Permission(s)`,
          `\`${mArray.join(" , ")}\``
        );
        message.channel.send(mEmbed).catch(() => {});
        return true;
      }
      break;
  }
}

module.exports = {
  checkPermission,
};