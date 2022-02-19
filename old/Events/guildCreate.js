module.exports = async (client, guild) => {
	console.log(`Fetching ${guild.name} members`);
	await guild.members.fetch();
	console.log(`Fetched ${guild.name} members`);
};
