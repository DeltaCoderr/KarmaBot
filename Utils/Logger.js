const moment = require("moment");
const chalk = require('chalk');
const util = require('util');

global.logger = module.exports = class Logger {
    static log(content, { color = 'grey', tag = 'Log' } = {}) {
        this.write(content, { color, tag });
    }

    static success(content, { color = 'green', tag = 'Success' } = {}) {
        this.write(content, { color, tag });
    }

    static info(content, { color = 'blue', tag = 'Info' } ={}) {
        this.write(content, { color, tag });
    }

    static warn(content, { color = 'orange', tag = 'Warn' } = {}) {
        this.write(content, { color, tag });
    }

    static error(content, { color = 'red', tag = 'Error' } = {}) {
        this.write(content, { color, tag, error: true });
    }

    static debug(content, { color = 'yellow', tag = 'Debug' } = {}) {
        this.write(content, { color, tag, error: true });
    }

    static write(content, { color = 'grey', tag = 'Log', error = false } = {}) {
        const timestamp = chalk.cyan(`[${moment().format('DD-MM-YYYY kk:mm:ss')}]:`);
        const levelTag = chalk.bold(`[${tag}]`);
        const text = chalk[color](this.clean(content));
        const stream = error ? process.stderr : process.stdout;
        stream.write(`${timestamp} ${levelTag} ${text}\n`);
    }

    static clean(item) {
        if (typeof item === 'string') return item;
        const cleaned = util.inspect(item, { depth: Infinity });
        return cleaned;
    }
} 
