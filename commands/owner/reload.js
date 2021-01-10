const {readdirSync} = require('fs')
const config = require('../../configs/config.json')

module.exports = {
    config: {
    name: 'reload',
    description: "Reloads the command",
    accessably: "not you",
    usage: "no",
    category: "owner",
    },
    run: async (client, message, args) => {
        
       let array = config.dev
  
       if(!array.includes(message.author.id.toString())) {
         return message.channel.send("Only people who are worthy enough can use it <:xcite:757638739995525211> <:xcite:757638739995525211>")
       }
        let cmdfolder = args[0];
        if(!cmdfolder) return message.channel.send('❌ | Provide a command Folder!')
        let command = args[1];
        if (!command) return message.channel.send('❌ | Provide a command!')
        try{
               require(`../${cmdfolder}/${command}`) 
        } catch(e) {
            return message.channel.send('❌ | No command with that name found.') 
        }
        delete require.cache[require.resolve(`../${cmdfolder}/${command}`)];
        let pull = require(`../${cmdfolder}/${command}`);
        client.commands.set(pull.config.name, pull);
        console.log(`Reloaded the command!`)
        return message.channel.send('✅ Done ')
    }
}
