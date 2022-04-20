const { success, warn, error, log, debug } = require("../Utils/Logger");

global.toID = function (text) {
    if (typeof text === 'string') return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

global.Command = require("../Client/Command");
global.Listener = require("../Client/Listener");
global.Config = require("../Configs/config");
global.logger_success = success;
global.logger_warn = warn;
global.logger_error = error;
global.logger_log = log;
global.logger_debug = debug;
global.Emotes = require("../Configs/emotes")