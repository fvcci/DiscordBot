const Discord = require("discord.js");
const prefix = '-';
const fs = require("fs");
// const serverLog = require("./ServerLog.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Read in the commands and only use the ones ending in js
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js") && file !== "Command.js");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Execute only once
client.once("ready", () => console.log(`${client.name} is online`));

// Command handler
client.on("message", message => {

    // Do not execute if the message does not start with the prefix
    // or is a message from the bot
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    // Remove the prefix and split at spaces or pluses
    const args = message.content.substring(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    client.commands.get(command).execute(message, args, Discord);

});

// client.on("messageDelete", message => {
//     if (!message.author.bot) {
//         serverLog.insertDeletedMessage(message);
//     }
// });

// Read file for token
fs.readFile("C:/Users/felix/OneDrive/Documents/confidential/discordBotToken.json", "utf8", (err, jsonString) => {

    if (err) {
        console.log("File read failed.", err);
        return;
    }
    client.login(JSON.parse(jsonString).token);

});

