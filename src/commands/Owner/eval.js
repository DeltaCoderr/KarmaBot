const { Command } = require("@sapphire/framework");
const { Type } = require("@sapphire/type");
const { codeBlock, isThenable } = require("@sapphire/utilities");
const { inspect } = require("util");

class EvalCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			description: "Evals any JavaScipt code",
			preconditions: ["OwnerOnly"],
			flags: ["async", "hidden", "showHidden", "silent", "s"],
			options: ["depth"],
		});
	}

	async messageRun(message, args) {
		const code = await args.rest("string");

		const { result, success, type } = await this.eval(message, code, {
			async: args.getFlags("async"),
			depth: Number(args.getOption("depth")) ?? 0,
			showHidden: args.getFlags("hidden", "showHidden"),
		});

		const output = success
			? codeBlock("js", result)
			: `**ERROR**: ${codeBlock("bash", result)}`;
		if (args.getFlags("silent", "s")) return null;

		const typeFooter = `**Type**: ${codeBlock("typescript", type)}`;

		if (output.length > 2000) {
			return message
				.reply({
					content: `Output was too long... sent the result as a file.\n\n${typeFooter}`,
					files: [{ attachment: Buffer.from(output), name: "output.js" }],
				})
				.catch(() => {});
		}

		return message.reply(`${output}\n${typeFooter}`).catch(() => {});
	}

	async eval(message, code, flags) {
		if (flags.async) code = `(async () => {\n${code}\n})();`;

		const msg = message;

		let success = true;
		let result = null;

		try {
			// eslint-disable-next-line no-eval
			result = eval(code);
		} catch (error) {
			if (error && error instanceof Error && error.stack) {
				this.container.client.logger.error(error);
			}
			result = error;
			success = false;
		}

		const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== "string") {
			result = inspect(result, {
				depth: flags.depth,
				showHidden: flags.showHidden,
			});
		}

		return { result, success, type };
	}
}

module.exports = { EvalCommand };
