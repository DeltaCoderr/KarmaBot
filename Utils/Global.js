global.toID = function (text) {
    if (typeof text === 'string') return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}


global.config = require('../Configs/config');
global.emotes = require('../Configs/emotes')
global.filters = require('../Configs/filters')