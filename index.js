const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"]});
const warns = require("./warns.json");
const fs = require('fs');
const ms = require('ms');

bot.on("ready", async () => {
    console.log('The bot is active.');
    bot.user.setActivity('!mute', {type: 'LISTENING'});
});

bot.on('message', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let prefix = '!';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    //Your muted role id goes here.
    //You should deny the "SEND_MESSAGES" permission for this role.
    const mutedroleid = 'MUTEDROLE ID';
    const mutedrole = message.guild.roles.cache.get(mutedroleid);

    //BAN COMMAND
    //!ban @Member reason
    if (cmd === `${prefix}ban`) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to ban. **!ban <user> [reason]**");
        if(user.id === message.author.id) return message.reply("You cannot ban yourself.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});
 
        const banmessage = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been banned. Reason: **${reason != "" ? reason : "-"}**`);
        message.channel.send(banmessage);
    }

    //KICK COMMAND
    //!kick @Member reason
    if (cmd === `${prefix}kick`) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to kick. **!kick <user> [reason]**");
        if(user.id === message.author.id) return message.reply("You cannot kick yourself.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
 
        const kickmessage = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been kicked. Reason: **${reason != "" ? reason : "-"}**`);
        message.channel.send(kickmessage);
    }

    //MUTE COMMAND
    //!mute @Member time(s, m, d, h) reason
    if (cmd === `${prefix}mute`) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to mute. **!mute <user> [time] [reason]**");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("You cannot mute yourself.");
        if(target.roles.cache.has(mutedroleid)) return message.reply("This user has already been muted.");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "1h";

        target.roles.add(mutedrole.id);
        const mute = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been muted by ${message.author} for ${ms(ms(time))}.\nReason: **${reason != "" ? reason : "-"}**`);
        message.channel.send(mute);

        setTimeout(() => {
            target.roles.remove(mutedrole.id);
            const unmute = new Discord.MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} has been unmuted.`);
            message.channel.send(unmute);
        }, ms(time));
    }

    //UNMUTE COMMAND
    //!unmute @Member reason
    if (cmd === `${prefix}unmute`) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to unmute. **!unmute <user> [reason]**");
        const target = message.guild.members.cache.get(user.id);
        if(!target.roles.cache.has(mutedroleid)) return message.reply("This user is not muted.");
        if(user.id === message.author.id) return message.reply("You cannot unmute yourself. ):");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(1).join(" ");
        target.roles.remove(mutedrole.id);
        const unmute = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} has been unmuted by ${message.author}.\nReason: **${reason != "" ? reason : "-"}**`);
        message.channel.send(unmute);
    }

    //WARN COMMAND
    //!warn @Member reason
    if (cmd === `${prefix}warn`) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to warn. **!warn <user> [reason]**");
        const target = message.guild.members.cache.get(user.id);
        if(target.roles.cache.has(mutedroleid)) return message.reply("You cannot warn muted members.");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(1).join(" ");

        if (!warns[user.id]) {
            warns[user.id] = {
                warnCount: 1
            }
        } else {
            warns[user.id].warnCount += 1;
        }

        if(warns[user.id].warnCount >= 5) {
            const mute = new Discord.MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} has been muted. (**5**/**5**)\nReason: **${reason != "" ? reason : "-"}**`);
            message.channel.send(mute);
            
            target.roles.add(mutedrole.id);
            warns[user.id].warnCount = 0;
    
            setTimeout(() => {
                target.roles.remove(mutedrole.id);
                const unmute = new Discord.MessageEmbed()
                .setColor("#00aaaa")
                .setDescription(`${user} has been unmuted.`);
                message.channel.send(unmute);
            }, 1000 * 900);

        } else {
            const warn = new Discord.MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} has been warned by ${message.author}. (**${warns[user.id].warnCount}**/**5**) \nReason: **${reason != "" ? reason : "-"}**`);
            message.channel.send(warn);
        }

        fs.writeFile("./warns.json", JSON.stringify(warns), err => {
            if (err) console.log(err);
        });

    }

});

bot.login('YOUR TOKEN'); //YOUR TOKEN GOES HERE.