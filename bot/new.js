const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", (message) => {
    console.log("Hello!")
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.login(token);