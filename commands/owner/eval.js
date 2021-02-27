/* ====================================================================================
Some packages are declared but not used, were just importing them so if we use the eval we dont need to define it 
==================================================================================== */
const { MessageAttachment, MessageEmbed, MessageCollector } = require('discord.js');
const { inspect } = require('util');
const { Type } = require('@anishshobith/deeptype');
const sourcebin = require('sourcebin');
const Discord = require('discord.js');
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: 'eval',
        description: 'Eval',
        aliases: [],
        usage: '<user>',
        accessableby: "not you",
    },
    run: async (client, message, args) => {
     
       let array = config.dev
  
  if(!array.includes(message.author.id.toString())) {
    return message.channel.send("Only people who are worthy enough can use it")
  }
  
function clean(text) {
        if (typeof text === 'string') {
            text = text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`)
                .replace(new RegExp(client.token, 'gi'), '(node:800) UnhandledPromiseRejectionWarning: Error: Incorrect login details were provided.')
        }
        return text;
 }
         const msg = message;
        if (!args.length) return message.channel.send('You must provide something to evaluate.');
        let code = args.join(' ');
        code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        
        let evaled;
        try {
            const start = process.hrtime();
            if(code.includes('await')) {
            evaled = eval(`(async () => {${code}})()`)
            } else {
            evaled = eval(code);
            }
            if(eval instanceof Promise) {
                evaled = await evaled;
            }

            const stop = process.hrtime(start);
            const response = [
                `**Output**: \`\`\`js\n${clean(inspect(evaled, { depth: 0 }))}\n\`\`\``,
                `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
                `**Time:** \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
            ]
            const res = response.join('\n');
            if (res.length < 2000) {
                await message.channel.send(res)
            } else {
                let output = await sourcebin.create([{ 
                    name: 'output',
                    content: res,
                    languageId: 'js'
                }], {
                    title: 'Evaluation Output',
                    description: 'Outcome of eval command.'
                });
                output = await sourcebin.shorten(output.url);

                await message.channel.send(output);
            }
        } catch (err) {
            return message.channel.send(`Error: \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
   }
};
