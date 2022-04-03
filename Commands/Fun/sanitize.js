
module.exports = {
    name: "sanitize",
    description:'sanitize a channel',
    aliases: [], 
    run:async(client, message, args) => {
           
            message.channel
                .send("Starting sanitization process :mask:")
                .then((msg) => {
                setTimeout(() => {
                    msg.edit("Disinfecting the channel 🧼🧴");
                }, 3000);
                setTimeout(() => {
                    msg.edit("Cleaning pfps 🧼🧴");
                }, 6000);
                setTimeout(() => {
                    msg.edit("Sanitizing words 🧼📝");
                }, 9000);
                setTimeout(() => {
                    msg.edit("Killing all germs 🦠🔫");
                }, 12000);
                setTimeout(() => {
                    msg.edit("This channel is sanitized! \nHave a nice day!");
                }, 15000);
                })
               
            
        }
    }
    
