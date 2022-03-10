/**
 * @param {String} string
 */
function format_string(string) {
	string = string.replaceAll(/_/g, " ");
	if (string.includes(" ")) {
		string = string
			.split(/ +/g)
			.map((str) => {
				return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
			})
			.join(" ");
	} else {
		string = `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
	}
	return string;
}

module.exports = {
	format_string,
};
