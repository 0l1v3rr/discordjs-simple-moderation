# Discord.js V13 Moderation Bot
This is a simple Discord moderation bot in **Discord.js v13**. <br>
You have to use **Node.js v16.6+**<br>
You can find the **v12** version [here](https://github.com/0l1v3rr/discordjs-simple-moderation/tree/v12)

## Setup:
Download [Node.js](https://nodejs.org/)<br>
Open a terminal and type these commands:
```sh
git clone https://github.com/0l1v3rr/discordjs-simple-moderation.git
cd discordjs-simple-moderation
npm i
```
Now, open the **index.js** file and paste your token and your muted_role id to the correct positions. It's marked in the code with comments.<br>
Then you can run the index.js file:
```sh
node index.js
```
-------------
## Some important things:
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
  - If the moderator does not enter a time, it's automatically set to 1 hour. You can easily edit this in the code.
- !unmute \<member> [reason]
- !warn \<member> [reason]
  - If the number of warns reaches five, the bot will mute the mentioned member for 10 minutes. You can easily edit this in the code.
