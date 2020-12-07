// PACKAGES

const Discord = require('discord.js');
const config = require('./configs/config.json');
const fs = require('fs');
const db = require('quick.db');
const http = require("http");
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const moment = require("moment"); 
var Jimp = require("jimp");
const request = require("request");
const axios = require("axios");
const snekfetch = require("snekfetch");
const fetch = require("node-fetch");

// Handlers And Client

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const { Player } = require('discord-player');
const player = new Player(client);
client.player = player;
client.emotes = require('./configs/emotes.json')
client.filters = require('./configs/filters.json');

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handlers/${events}`)(client));

client.categories = fs.readdirSync('./commands');

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});

// EVENTS

client.on('ready', () => {
    console.log('Karma Started!');
});

//CHATBOT FEATURE 

client.on("message", async message => {
        let channel = db.fetch(`chatbot_${message.guild.id}`);
     if(!channel) return;
        var sChannel = message.guild.channels.cache.get(channel);
     if (message.author.bot || sChannel.id !== message.channel.id) return;
     message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
     if (message.content.includes(`@`)) {
        return sChannel.send(`**:x: Please dont mention anyone**`);
     }
        sChannel.startTyping();
    if (!message.content) return sChannel.send("Please say something.");
    fetch(` `) //your chatbot api goes here
        .then(res => res.json())
        .then(data => {
            sChannel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
        });
          sChannel.stopTyping();
              
    });

    client.snipes = new Map();

    client.on('messageDelete', function(message, channel){
    client.snipes.set(message.channel.id,{
        content:message.content,
        author:message.author.tag,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
})
});

client.login(config.token)
