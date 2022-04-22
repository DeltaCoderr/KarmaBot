const { inspect } = require("util");
const { MessageEmbed, WebhookClient } = require("discord.js"),
    chalk = require("chalk"),
    moment = require("moment"),
    nodeLogger = require("simple-node-logger")

const simpleLogger = nodeLogger.createRollingFileLogger({
    logDirectory: "./logs",
    fileNamePattern: "roll-<DATE>.log",
    dateFormat: "yyyy.MM.DD",
});

simpleLogger.setLevel("debug");

const errorWebhook = process.env.ERROR_LOGS ? new WebhookClient({ url: process.env.ERROR_LOGS }) : undefined;

const sendWebhook = (content, err) => {
    if (!content && !err) return;
    const errString = err?.stack || err;

    const embed = new MessageEmbed().setColor(Config.embedColor).setAuthor({ name: err?.name || "Error" });

    if (errString)
        embed.setDescription(
            "```js\n" + (errString.length > 4096 ? `${errString.substr(0, 4000)}...` : errString) + "\n```"
        );
    if (err?.description) embed.addField("Description", content);
    if (err?.message) embed.addField("Message", err?.message);

    errorWebhook.send({
        username: "Logs",
        embeds: [embed],
    });
};

const sendLogs = (level, content, data) => {
    const timestamp = `${moment().format("yyyy-MM-DD HH:mm:ss:SSS")}`;

    switch (level) {
        case "log":
            console.log(`[${chalk.cyan(timestamp)}] [${chalk.blueBright(level.toUpperCase())}] ${content} `);
            simpleLogger.info(content);
            break;

        case "success":
            console.log(`[${chalk.cyan(timestamp)}] [${chalk.green(level.toUpperCase())}] ${content} `);
            simpleLogger.info(content);
            break;

        case "warn":
            console.log(`[${chalk.cyan(timestamp)}] [${chalk.yellow(level.toUpperCase())}] ${content} `);
            simpleLogger.warn(content);
            break;

        case "error":
            console.log(
                `[${chalk.cyan(timestamp)}] [${chalk.redBright(level.toUpperCase())}] ${content} ${data ? ": " + inspect(data.message ?? data) : ""
                }`
            );
            simpleLogger.error(data ?? content);
            if (errorWebhook) sendWebhook(content, data);
            break;

        case "debug":
            simpleLogger.debug(content);
            break;

        default:
            break;
    }
};

exports.success = (content) => sendLogs("success", content);
exports.warn = (content) => sendLogs("warn", content);
exports.error = (content, ex) => sendLogs("error", content, ex);
exports.debug = (content) => sendLogs("debug", content);
exports.log = (content) => sendLogs("log", content);