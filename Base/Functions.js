module.exports = {
	getUser: function(message, args, author) {
		if (args && args.length > 0) {
			if (author) {
				return message.guild.members.cache
					.filter((e) =>
						e.user.username
							.toLowerCase()
							.includes(args.join(' ').toLowerCase()),
					)
					.first()
					? message.guild.members.cache
						.filter((e) =>
							e.user.username
								.toLowerCase()
								.includes(args.join(' ').toLowerCase()),
						)
						.first()
					: message.mentions.users.first();
			} else {
				return message.guild.members.cache
					.filter((e) =>
						e.user.username
							.toLowerCase()
							.includes(args.join(' ').toLowerCase()),
					)
					.first()
					? message.guild.members.cache
						.filter((e) =>
							e.user.username
								.toLowerCase()
								.includes(args.join(' ').toLowerCase()),
						)
						.first()
					: author
						? message.mentions.users.first() || message.author
						: message.mentions.users.first();
			}
		} else {
			return author
				? message.mentions.users.first() || message.author
				: message.mentions.users.first();
		}
	},
	cleanEval: function(text, token) {
		if (typeof text === 'string') {
			return text
				.replace(token, 'T0K3N')
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		} else {
			return text;
		}
	},
	binaryConvert: function(text, encode) {
		if (encode) {
			const output = [];
			const length = text.length;
			for (let i = 0; i < length; i++) {
				const binary = text[i].charCodeAt().toString(2);
				output.push(Array(8 - binary.length + 1).join('0') + binary);
			}
			return output.join(' ');
		} else {
			const output = [];
			text = text.replace(/\s/g, '');
			const length = text.length;
			if (length % 8 !== 0) {
				return 'Invalid Binary';
			}
			for (let i = 0; i < length; i += 8) {
				const binary = text.substr(i, 8);
				output.push(String.fromCharCode(parseInt(binary, 2)));
			}
			return output.join('');
		}
	},
	// Adopted from https://github.com/WekyDev/weky-npm/blob/main/functions/function.js#L81-L89
	shuffleArray: function(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	},
	// Adopted from https://github.com/WekyDev/weky-npm/blob/main/functions/function.js#L49-L80
	convertTime: function(time) {
		const absoluteSeconds = Math.floor((time / 1000) % 60);
		const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
		const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));
		const d = absoluteDays
			? absoluteDays === 1
				? '1 day'
				: `${absoluteDays} days`
			: null;
		const h = absoluteHours
			? absoluteHours === 1
				? '1 hour'
				: `${absoluteHours} hours`
			: null;
		const m = absoluteMinutes
			? absoluteMinutes === 1
				? '1 minute'
				: `${absoluteMinutes} minutes`
			: null;
		const s = absoluteSeconds
			? absoluteSeconds === 1
				? '1 second'
				: `${absoluteSeconds} seconds`
			: null;
		const absoluteTime = [];
		if (d) absoluteTime.push(d);
		if (h) absoluteTime.push(h);
		if (m) absoluteTime.push(m);
		if (s) absoluteTime.push(s);
		return absoluteTime.join(', ');
	},
	// Adopted from https://github.com/combatwombat/Lunicode.js/blob/master/lunicode.js#L348-L484
	zalgoConvert: function(text) {
		const diacriticsTop = [];
		const diacriticsMiddle = [];
		const diacriticsBottom = [];
		const options = {
			top: true,
			middle: true,
			bottom: true,
			maxHeight: 15,
			randomization: 100,
		};

		for (let i = 768; i <= 789; i++) {
			diacriticsTop.push(String.fromCharCode(i));
		}

		for (let i = 790; i <= 819; i++) {
			if (i != 794 && i != 795) {
				diacriticsBottom.push(String.fromCharCode(i));
			}
		}
		diacriticsTop.push(String.fromCharCode(794));
		diacriticsTop.push(String.fromCharCode(795));

		for (let i = 820; i <= 824; i++) {
			diacriticsMiddle.push(String.fromCharCode(i));
		}

		for (let i = 825; i <= 828; i++) {
			diacriticsBottom.push(String.fromCharCode(i));
		}

		for (let i = 829; i <= 836; i++) {
			diacriticsTop.push(String.fromCharCode(i));
		}
		diacriticsTop.push(String.fromCharCode(836));
		diacriticsBottom.push(String.fromCharCode(837));
		diacriticsTop.push(String.fromCharCode(838));
		diacriticsBottom.push(String.fromCharCode(839));
		diacriticsBottom.push(String.fromCharCode(840));
		diacriticsBottom.push(String.fromCharCode(841));
		diacriticsTop.push(String.fromCharCode(842));
		diacriticsTop.push(String.fromCharCode(843));
		diacriticsTop.push(String.fromCharCode(844));
		diacriticsBottom.push(String.fromCharCode(845));
		diacriticsBottom.push(String.fromCharCode(846));
		// 847 (U+034F) is invisible http://en.wikipedia.org/wiki/Combining_grapheme_joiner
		diacriticsTop.push(String.fromCharCode(848));
		diacriticsTop.push(String.fromCharCode(849));
		diacriticsTop.push(String.fromCharCode(850));
		diacriticsBottom.push(String.fromCharCode(851));
		diacriticsBottom.push(String.fromCharCode(852));
		diacriticsBottom.push(String.fromCharCode(853));
		diacriticsBottom.push(String.fromCharCode(854));
		diacriticsTop.push(String.fromCharCode(855));
		diacriticsTop.push(String.fromCharCode(856));
		diacriticsBottom.push(String.fromCharCode(857));
		diacriticsBottom.push(String.fromCharCode(858));
		diacriticsTop.push(String.fromCharCode(859));
		diacriticsBottom.push(String.fromCharCode(860));
		diacriticsTop.push(String.fromCharCode(861));
		diacriticsTop.push(String.fromCharCode(861));
		diacriticsBottom.push(String.fromCharCode(863));
		diacriticsTop.push(String.fromCharCode(864));
		diacriticsTop.push(String.fromCharCode(865));

		let newText = '',
			newChar;
		for (const i in text) {
			newChar = text[i];

			// Middle
			// Put just one of the middle characters there, or it gets crowded
			if (options.middle) {
				newChar +=
					diacriticsMiddle[Math.floor(Math.random() * diacriticsMiddle.length)];
			}

			// Top
			if (options.top) {
				const diacriticsTopLength = diacriticsTop.length - 1;
				for (
					let count = 0,
						len =
							options.maxHeight -
							Math.random() *
								((options.randomization / 100) * options.maxHeight);
					count < len;
					count++
				) {
					newChar +=
						diacriticsTop[Math.floor(Math.random() * diacriticsTopLength)];
				}
			}

			// Bottom
			if (options.bottom) {
				const diacriticsBottomLength = diacriticsBottom.length - 1;
				for (
					let count = 0,
						len =
							options.maxHeight -
							Math.random() *
								((options.randomization / 100) * options.maxHeight);
					count < len;
					count++
				) {
					newChar +=
						diacriticsBottom[
							Math.floor(Math.random() * diacriticsBottomLength)
						];
				}
			}

			newText += newChar;
		}
		return newText;
	},
	isUrl: function(url) {
		const DomainRE = /^[^\s\\.]+\.\S{2,}$/;
		const protocolAndDomain = /^(?:\w+:)?\/\/(\S+)$/;

		const match = url.match(protocolAndDomain);
		if (!match) return false;

		const everythingAfterProtocol = match[1];
		if (!everythingAfterProtocol) return false;

		if (DomainRE.test(everythingAfterProtocol)) return true;

		return false;
	},
	getRandomString: function(length) {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += randomChars.charAt(
				Math.floor(Math.random() * randomChars.length),
			);
		}
		return result;
	},
	randomHexColor: function() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	},
};
