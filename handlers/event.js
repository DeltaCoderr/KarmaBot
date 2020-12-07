const fs = require('fs');

module.exports = (client) => {
    const load = dirs => {
        const events = fs.readdirSync(`./events/${dirs}`).filter(events => events.endsWith('.js'));
        for (let file of events) {
            const events = require(`../events/${dirs}/${file}`);
            let eventName = file.split('.')[0];
            client.on(eventName, events.bind(null,client));
        };
    };
    ['client', 'guild'].forEach(events => load(events));
};