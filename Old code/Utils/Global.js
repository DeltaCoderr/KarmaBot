global.toID = function (text) {
    if (typeof text === 'string') return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}


global.config = require('../Old code/Configs/config');
global.emotes = require('../Old code/Configs/emotes')
global.filters = require('../Old code/Configs/filters')