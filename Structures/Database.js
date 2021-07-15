const { Database } = require('quickmongo');
const db = new Database(config.database);

db.on('ready', () => {
    logger.success("[DATABASE]: Connected!");
});

module.exports = { db };
