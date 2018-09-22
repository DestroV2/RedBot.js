const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var versionnumber = '1.2'; //VERSION NUMBER HERE BOY LOL




client.on("ready", () => { client.user.setGame('type %help')
  console.log("I am online!");
});
 
client.on('error', console.error);

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member}" has joined "${member.guild.name}"` );
  member.guild.channels.get("489478719153504257").send(`"${ member}" has joined **PLANETS**`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`type %help`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`type %help`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if (command === "coinflip") {
    var coinflip = [
              "Heads",
              "Tails"
];
var coinflips = coinflip[Math.floor(Math.random() *coinflip.length)];
  message.channel.send(coinflips);
} else

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

    if (command === "version"){
    message.channel.send('Version ' + versionnumber);
    message.channel.send('Made By DestroV2.');
}
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["*", "*"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  web: node redbot.js
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["*"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  

  function checkBots(guild) {
    let botCount = 0; // This is value that we will return
    guild.members.forEach(member => { // We are executing this code for every user that is in guild
      if(member.user.bot) botCount++; // If user is a bot, add 1 to botCount value
    });
    return botCount; // Return amount of bots
  }


  if(command == "serverinfo") {

    const embed = new Discord.RichEmbed()

    .setTitle("Server Information")
    .addField( `Name` , `${message.guild.name} `, true)
    .addField('Server Owner', message.guild.owner.user.tag, true)
    .addField("Member Count", message.guild.memberCount, true)
    .addField('Bots', checkBots(message.guild), true)
    .setFooter('Guild created at:')
    .setTimestamp(message.guild.createdAt); // Will set timestamp to date when guild was created
     return message.channel.send(embed);
  }
  
  if (command == "help") {
    const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Command List:")
		.addField("%help", "Will give the current command list")
		.addField("%ping", "WIll show the ping time for the bot")
		.addField("%coinflip" , "will give you either Heads or Tails")
    .addField("%version", "Will give you the current version of the bot")
    .addField("%serverinfo", "Will give you the info on the server")
		message.channel.send({embed})
	}

    });

client.login(process.env.BOT_TOKEN);
