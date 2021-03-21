const Discord = require("discord.js");
const fs = require("fs");
const clc = require("cli-color");
const ConsoleTitle = require("node-bash-title");

var config = require("./../config");

const debug = false;
const bot = new Discord.Client();
var channel;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

var responseQueue = [];
var fishDelay = config.premium ? 32000 : Math.floor(Math.random() * (62000 - 72000) + 62000);
var huntDelay = config.premium ? 42000 : Math.floor(Math.random() * (62000 - 72000) + 62000);
var searchDelay = config.premium ? 22000 : Math.floor(Math.random() * (37000 - 47000) + 37000);
var pmDelay = config.premium ? 47000 : Math.floor(Math.random() * (62000 - 72000) + 62000);
var hlDelay = config.premium ? 24000 : getRandomInt(24, 25) * 1000
var begDelay = config.premium ? 27000 : Math.floor(Math.random() * (47000 - 57000) + 47000);
var bankDelay = 80000;

function pushResponse(response) {
    responseQueue.push(response);

    if (debug) {
        console.log(clc.yellow("Response pushed: " + response));
    }
}

function unshiftResponse(response) {
    responseQueue.unshift(response);

    if (debug) {
        console.log(clc.yellow("Response unshifted: " + response));
    }
}

function handleResponse() {
    if (responseQueue.length > 0) {
        var response = responseQueue.shift();

        if (response) {
            channel.send(response);

            if (debug) {
                console.log(clc.yellow("Response called: " + response));
            }
        } else {
            console.log(clc.red("Error: Expected to call response, but no response was returned on queue shift."));
        }
        
    } else if (debug) {
        console.log(clc.yellow("No response called"));
    }

    var delay = Math.floor(config.responseDelay + config.randomMin + (config.randomMax - config.randomMin) * Math.random());

    if (debug) {
        console.log(clc.yellow("Calling next response in " + delay + "ms"))
    }

    setTimeout(handleResponse, delay);
}

function startBot() {
    if (config.beg) {
        setInterval(() => {
            pushResponse("pls beg");
        }, begDelay);
        pushResponse("pls beg");
    }

    if (config.fish) {
        setInterval(() => {
            pushResponse("pls fish");
        }, fishDelay);
        pushResponse("pls fish");
    }

    if (config.hunt) {
        setInterval(() => {
            pushResponse("pls hunt");
        }, huntDelay);
        pushResponse("pls hunt");
    } 

    if (config.pm) {
        setInterval(() => {
            pushResponse("pls pm");
        }, pmDelay);
        pushResponse("pls pm");
    }

    if (config.search) {
        setInterval(() => {
            pushResponse("pls search");
        }, searchDelay);
        pushResponse("pls search");
    }

    if (config.autoBank) {
        setInterval(() => {
            pushResponse("pls dep all");
        }, bankDelay);
        pushResponse("pls dep all");
    }
    if (config.hl) {
        setInterval(() => {
            pushResponse("pls hl");
        }, hlDelay);
        pushResponse("pls hl");
    }
}

bot.on("ready", async () => {
    console.log(clc.green(`Logged in as ${bot.user.username}`))
    console.log(clc.yellow("Listening for start command " + config.startCommand + " in initial channel."));
    console.log(clc.red("Warning: Do NOT use this bot in a public server, use it in a private server in a channel only you will be in."));
})

bot.on("message", async message => {
    if (debug) {
        console.log(clc.yellow("Message received: " + message.content));
    }
    try {
        if (message.embeds[0].description) {
            if (!message.embeds[0].description.includes("A number secret")) return
            if (message.embeds[0].author.name.includes(bot.user.username)) {
                if (msg.author.id === "270904126974590976") {
                    let testlol = message.embeds[0].description.split("**")
                    testlol = testlol[1]

                    if (testlol > 50) {
                        message.channel.startTyping()
                        setTimeout(() => {
                            send("low")
                            message.channel.stopTyping()
                            console.log(`Sended low (pls hl)`)
                        }, 300)

                    } else {
                        setTimeout(() => {
                            send("high")
                            message.channel.stopTyping()
                            console.log(`Sended high (pls hl)`)
                        }, 300)
                    }
                }
            }
        }
    } catch {
        //e
    }
    if (message.content.includes("is broken lmao")) { // Laptop broke autobuy
        if (content.includes(`<@${bot.user.id}>`) | content.includes(`<@!${bot.user.id}>`)) {
            message.channel.startTyping()
            console.log(`Buying new laptop`)
            setTimeout(() => {
                message.channel.stopTyping()
                message.channel.send('pls buy laptop')
            }, 1000)

        }
    }
    if (channel) {
        if (channel == message.channel) {
            var contentPieces = message.content.split(" ");
            var wrappedPieces = message.content.split("`");

            if (debug) {
                console.log(clc.yellow("Content #: " + contentPieces.length + ", Wrapped #: " + wrappedPieces.length));
            }

            if (contentPieces.length >= 18 && contentPieces[0] === "Where" && contentPieces[5] === "search?") {
                try {
                    var option1 = contentPieces[15].split("`")[1];
                    var option2 = contentPieces[16].split("`")[1];
                    var option3 = contentPieces[17].split("`")[1];
        
                    console.log("Provided search options: ", option1, option2, option3);
                    var optionChosen;
        
                    for (i = 0; i < config.approvedSearches.length; i++) {
                        var option = config.approvedSearches[i];
        
                        if (option1 == option) {
                            optionChosen = option1;
                            break;
        
                        } else if (option2 == option) {
                            optionChosen = option2;
                            break;
        
                        } else if (option3 == option) {
                            optionChosen = option3;
                            break;
                        } 
                    }
        
                    if (optionChosen) {
                        console.log(clc.green("Search option selected: " + optionChosen));
                        unshiftResponse(optionChosen);
        
                    } else {
                        console.log(clc.red("No good search options provided, responding with unapproved message."));
                        pushResponse(config.unapprovedMessage);
                    } 
        
                } catch (error) {
                    console.log(clc.red("Error when searching: " + error));
                }

            } else if (wrappedPieces.length > 1 && ((contentPieces.length > 1 && contentPieces[1] != "searched") || contentPieces.length <= 1)) {
                var wrappedPiece = wrappedPieces[1];

                if (wrappedPiece) {
                    unshiftResponse(wrappedPiece);
                }
            }
        }

    } else if (message.content === config.startCommand) {
        message.delete()
        channel = message.channel;

        try {
            console.log(clc.green("Connecting to channel [" + channel.name ? channel.name : "UNKNOWN" + "]..."));
        } catch(error) {
            console.log(clc.green("Connecting to channel..."));
        }

        setTimeout(() => {
            handleResponse();

            console.clear();
            console.log(clc.green("Bot connected successfully, starting bot."));

            startBot();
        }, 2000);
    } else if (message.content === "!credits") {
		message.delete()
		message.channel.send("Cristian\nWalter#0005")
	}
})

ConsoleTitle("Dank Memer Bot by Cristian and Walter");
bot.login(config.token);
