const { Karma } = require('./Structures/Client');
const client = new Karma();

client.snipes = new Map();

client.start();
