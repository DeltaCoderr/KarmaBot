const chalk = require('chalk');
const util = require('util');

const append = (m) => {
    const message = `[${new Date().toLocaleDateString()}] | ${m}`;
    return typeof message === "string" ? message : util.inspect(message);
}

global.logger = {
    log: message => {
        console.log(chalk.whiteBright(append((message))));
    },

    error: message => {
        console.log(chalk.redBright(append((message))));
    },

    warn: message => {
        console.log(chalk.magentaBright(append((message))));
    },

    info: message => {
        console.log(chalk.blueBright(append((message))));
    },

    success: message => {
        console.log(chalk.greenBright(append((message))));
    },

    debug: message => {
        console.log(chalk.yellowBright(append((message))));
    },
};

module.exports.logger = logger;