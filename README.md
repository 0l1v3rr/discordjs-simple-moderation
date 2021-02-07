# discordjs-simple-moderation
Discord.js Moderation bot. **Commands:** *!ban, !kick, !mute, !unmute, !warn*

## Setup:
1. [Download NodeJS](https://nodejs.org/)
2. Open a terminal that points to your folder *(cd C:\Users\name.....)* --> type these commands:
3. npm init
4. npm i discord.js
5. npm i ms
6. Open the **index.js** file and edit the marked parameters as described there.
7. node index.js (this command runs the bot)
-------------
## Some important things:
- Make sure you have fs.
  - ```js
    const fs = require('fs');
- Make sure you have ms.
  - ```js
    const ms = require('ms');
- Make sure you have `{}` in your warns.json file.
- Make sure you entered your *Muted* role id in the code.
  - ```js
    const mutedroleid = 'MUTEDROLE ID';
  - I also recommend you to **deny** the permission **"SEND MESSAGES"** for this *Muted* role.
- Make sure you entered your token.
  - ``` js
    bot.login('YOUR TOKEN');
- Make sure the bot has the necessary permissions.
-------------
## Commands:
*(**<>** is required, **[ ]** is optional)*
- !ban \<member> [reason]
- !kick \<member> [reason]
- !mute \<member> [time (s, m, h, d)] [reason]
  - For example: `!mute @John 10m Provocative communication.`
  - If the moderator does not enter a time, it's automatically set to 1 hour.
  - ```js
    if (!time) time = "1h"; // You can easily edit this in the code.
- !unmute \<member> [reason]
- !warn \<member> [reason]
  - If the number of warns reaches five, the bot will mute the mentioned member for 10 minutes.
