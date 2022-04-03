const discord = require("discord.js");
const ms = module.require("ms");

module.exports = {
   name:"hack",
   run:async(client, message, args) => {
   const error = new discord.MessageEmbed()
   error.setDescription(`**<a:Cross:916884830451548180> Please mention the user you want to hack**`)
   error.setColor("#f50213")

  if (!args[0]) {
      return message.channel.send({embeds:[error]});
    }

    const tohack = message.mentions.members.first();
    let msg = await message.channel.send(`Hacking ${tohack.displayName}....`);

    let time = "1s";
    setTimeout(function () {
      msg.edit(`**⚠️Finding ${tohack.displayName}'s Email and Password.....**`);
    }, ms(time));

    let time1 = "6s";
    setTimeout(function () {
      msg.edit(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: ********`);
    }, ms(time1));

    let time2 = "9s";
    setTimeout(function () {
      msg.edit("**⚠️Finding Other Accounts.....**");
    }, ms(time2));

    let time3 = "15s";
    setTimeout(function () {
      msg.edit("**⚠️Setting up Epic Games Account.....**");
    }, ms(time3));

    let time4 = "21s";
    setTimeout(function () {
      msg.edit("**⚠️Hacking Epic Games Account......**");
    }, ms(time4));

    let time5 = "28s";
    setTimeout(function () {
      msg.edit("**⚠️Hacked Epic Games Account!!**");
    }, ms(time5));

    let time6 = "31s";
    setTimeout(function () {
      msg.edit("**📨Collecting Info.....**");
    }, ms(time6));

    let time7 = "38s";
    setTimeout(function () {
      msg.edit("**📩Selling data to FBI....**");
    }, ms(time7));

    let time8 = "41s";
    setTimeout(function () {
      msg.edit(`**<a:tick:916884945555828806> Finished Hacking ${tohack.displayName}**`);
    }, ms(time8));
  },
};
