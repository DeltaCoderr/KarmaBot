const { Precondition } = require("@sapphire/framework");
const owners = ["552814506070507531", "838620835282812969"]; // Mori Delta & Lorenz

class UserPrecondition extends Precondition {
	async run(message) {
		return owners.includes(message.author.id) ? this.ok() : this.error();
	}
}

module.exports.UserPrecondition = UserPrecondition;
