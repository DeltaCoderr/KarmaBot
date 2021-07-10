const { Client, Collection } = require('discord.js')
const { LoadCommands, LoadEvents, LoadPlayerEvents, LoadButtons } = require('../Loader');

require('../Utils/Logger');
require('../Utils/Global');
require('../Structures/Database');

class Bot extends Client {

    /**
     * @param { import ('discord.js').ClientOptions } props;
     */

    constructor(props) {
        if (!props) props = {}

        props.partials = ['MESSAGE', 'CHANNEL', 'REACTION'];
        super(props)
    };


    _init() {
        this.config = require('../Configs/config');

        if (!this.config.token)
            return logger.error(`[ERROR]: No Token Provided in Config File!`);

        if (!this.config.devs.length) {
            return logger.error(`[ERROR]: No Dev ID Provided`);
        }

        if (!this.config.database) {
            return logger.error(`[ERROR]: No Database URL Provided.!`);
        }

        this.commands = new Collection();

        this.aliases = new Collection();

        LoadCommands(this);

        LoadEvents(this);

        LoadPlayerEvents(this);

        LoadButtons(this);
        
        this.login(this.config.token).catch(() => {
            logger.error(`[ERROR]: Invalid Token Provided.`);
        });
    };
}

module.exports.Bot = Bot;