module.exports = (client, message) => {
    let prompt = process.openStdin()
    prompt.addListener('data', res => {
        let console = res.toString().trim().split(/ +/g)
        client.channels.cache.get(message.channel.id).send(x.join(" "))
    });
};