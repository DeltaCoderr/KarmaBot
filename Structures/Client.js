class Karma extends Discord.Client {
  constructor(config) {
    super({
      intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      ],
    });

    if (!config.token || !config.devs || !config.MongoURI || !config.prefix || !config.embedColor || !config.AME_API) {
      throw new Error('Incomplete configuration. Check your config file.');
    }

    this.config = config;
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
  }

  async start() {
    try {
      await Loader.LoadCommands(this);
      await Loader.LoadEvents(this);

      await this.login(this.config.token);
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }
}

module.exports = Karma;
