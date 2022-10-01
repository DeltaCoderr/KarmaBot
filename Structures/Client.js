const { Client, GatewayIntentBits: gib, Collection } = require("discord.js");
const { LoadCommands, LoadEvents } = require("../Loader");

class Bot extends Client {
  /**
   * @param { import ('discord.js').ClientOptions } props;
   */

  constructor(props) {
    if (!props) props = {};

    props.intents = [
      gib.Guilds,
      gib.GuildEmojisAndStickers,
      gib.DirectMessages,
      gib.GuildBans,
      gib.MessageContent,
      gib.GuildInvites,
      gib.GuildWebhooks,
      gib.GuildMessages,
      gib.GuildMembers,
      gib.GuildIntegrations,
      gib.GuildVoiceStates,
      gib.GuildMessageReactions,
    ];
    super(props)
  };

  _init() {
        this.config  = require('../Configs/config');

        if (!this.config.token) return console.error(`[ERROR] : No Token provided in Config file.`);

        this.commands = new Collection();
        
        this.slashCommands = new Collection();
        
        LoadCommands(this);
        LoadEvents(this);

        this.login(this.config.token).catch(() => {
          console.error(`[ERROR] : Invalid Token provided.`)
        });

  };
}

module.exports.Bot = Bot; 
