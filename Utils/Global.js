global.toID = function (text) {
    if (typeof text === 'string') return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

global.Command = require("../Client/Command");
global.Listener = require("../Client/Listener");
global.Config = require("../Configs/config");
global.Emotes = require("../Configs/emotes")