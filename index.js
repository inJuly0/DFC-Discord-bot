const Discord = require('discord.js');
const {
    prefix,
    token,
    replies
} = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready !');
});

client.login(token);

const replyTable = {
    help: function () {
        return `Following is a list of commands you can issue :\n \`help\`: get list of commands.`
    },
    scold: function (msg) {
        const name = msg.mentions.members.first() || msg.member;
        if (name.id == '704559178517315625') return `maa ko mat sikhao beta ${msg.member}`;
        return random(replies.scold).replace('__name__', name);
    },
    speak: function () {
        return random(replies.speak);
    },
    doubt: function () {
        return random(replies.doubt);
    },
    noArg: function (msg) {
        const name = msg.mentions.members.first() || msg.member;
        if (name.id == '704559178517315625') return `maa ko mat sikhao beta ${msg.member}`;
        return random(replies.noArg).replace('__name__', name);
    }
}

client.on('message', message => {
    if (message.content.startsWith(prefix)) {
        let command = '';
        for (let i = prefix.length + 1; i < message.content.length; i++) {
            if (message.content[i] == ' ') break;
            command += message.content[i];
        }

        message.channel.send(execute(command, message));
    }
});

function execute(command, msg) {
    if (command == '') return replyTable.noArg(msg);
    if (replyTable[command])
        return replyTable[command](msg);
    else return `what do you mean "${command}..." ?`;
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}