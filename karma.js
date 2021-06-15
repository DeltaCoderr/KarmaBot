// PACKAGES

const Discord = require('discord.js');
const config = require('./configs/config.json');
const fs = require('fs');
const { Database } = require("quickmongo");
const db = new Database(config.database);
const http = require("http");
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const moment = require("moment"); 
const Jimp = require("jimp");
const request = require("request");
const axios = require("axios");
const snekfetch = require("snekfetch");
const fetch = require("node-fetch");

// Handlers And Client

const client = new Discord.Client();
const disbut = require("discord-buttons")(client)
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const { Player } = require('discord-player');
const player = new Player(client, {
	enableLive: true,
	autoSelfDeaf: true,
	leaveOnEnd: true,
	leaveOnEndCooldown: 5000,
	leaveOnEmpty: true,
	leaveOnStop: true
});
client.player = player;
client.emotes = require('./configs/emotes.json');
client.filters = require('./configs/filters.json');

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handlers/${events}`)(client));

client.categories = fs.readdirSync('./commands');

fs.readdir('./player-events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./player-events/${file}`), eventName = file.split(".")[0];
		console.log(`Loading player event ${eventName}`);
		client.player.on(eventName, event.bind(null, client));
	});
});

// EVENTS

client.on('ready', () => {
	console.log('Karma Started!');
});

db.on("ready", () => {
	console.log("Database Connected!")
});

//CHATBOT FEATURE 

client.on("message", async (message) => {
	const channel = await db.get(`chatbot_${message.guild.id}`);
	if(!channel) return;
	const sChannel = message.guild.channels.cache.get(channel);
	if (!sChannel) return;
	if (message.author.bot || sChannel.id !== message.channel.id) return;
	message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
	if (message.content.includes(`@`)) {
		return sChannel.send(`**:x: Please dont mention anyone**`);
	}
	sChannel.startTyping();
	if (!message.content) return sChannel.send("Please say something.");
	fetch(`https://api.deltaa.me/chatbot?message=${encodeURIComponent(message.content)}&name=${client.user.username}&user=${message.author.username}&gender=Male`)
	.then(res => res.json())
	.then(data => {
		sChannel.send(`> ${message.content} \n ${data.message}`);
	});
	sChannel.stopTyping();				
});

client.snipes = new Map();

client.on('messageDelete', (message, channel) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		authorimg: message.author.avatarURL({ dynamic: true }),
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
		channelname: message.channel.name,
		messageid: message.id,
		channelid: message.channel.id
	});
});

client.login(config.token)
