var express  = require('express')
  , session  = require('express-session')
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy
  , app      = express()
, bodyParser = require('body-parser');
const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
})
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});;
const db = require("megadb");
const x = new db.crearDB("prefixes");
function verify(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
;}
app.set('view engine', 'ejs');
var scopes = ['identify', 'guilds'];
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
passport.use(new Strategy({
    clientID: '592761473797980191',
    clientSecret: process.env.clientsecret,
    callbackURL: 'https://hack-week-bot.glitch.me/callback',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'mybotteam',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res) {
    res.render('index');
});;
app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/panel') } 
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/panel/guilds', verify, function(req, res) {
  var guilds = client.guilds.filter(g => g.members.find(m => m.user.id == req.user.id) && g.members.get(req.user.id).hasPermission("MANAGE_GUILD") && g.members.get(client.user.id).hasPermission("MANAGE_GUILD")).array();
    res.render('guilds', { guilds: guilds, client: client, avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`, username: req.user.username, userid : req.user.id});
});
app.get('/panel', verify, function(req, res) {
    res.render('panel', {username:req.user.username, avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`});
});;
app.get('/developers', function(req, res) {
    res.render('developers');
});;
app.get('/panel/guilds/:guildID', verify, function(req, res) {
  var guilds = client.guilds.filter(g => g.members.find(m => m.user.id == req.user.id) && g.members.get(req.user.id).hasPermission("MANAGE_GUILD") && g.members.get(client.user.id).hasPermission("MANAGE_GUILD")).array();
  var guildname = client.guilds.get(req.params.guildID).name;
  res.render('manage', { cguildname: guildname, cguildid: req.params.guildID, guilds: guilds, client: client, avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`, username: req.user.username, userid : req.user.id});
});
app.get('/panel/guilds/:guildID/bot', verify, function(req, res) {
 var guilds = client.guilds.filter(g => g.members.find(m => m.user.id == req.user.id) && g.members.get(req.user.id).hasPermission("MANAGE_GUILD") && g.members.get(client.user.id).hasPermission("MANAGE_GUILD")).array();
  var guildname = client.guilds.get(req.params.guildID).name;
  x.obtener(req.params.guildID).then(m => {
  res.render('bot', {prefix: m || "!",botname:client.guilds.get(req.params.guildID).members.get(client.user.id).nickname || client.user.username,cguildname: guildname, cguildid: req.params.guildID, guilds: guilds, client: client, avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`, username: req.user.username, userid : req.user.id});
  });
  });
app.get('/panel/suggestion', verify, function(req, res) {
  res.render('suggestion', {avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`, username: req.user.username, userid : req.user.id});
    });
app.get('/panel/report', verify, function(req, res) {
  res.render('report', {avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`, username: req.user.username, userid : req.user.id});
  });
app.post('/panel/guilds/:guildID/bot', bodyParser.json(), function(req, res) {
  if (req.body.botname) {
    client.guilds.get(req.params.guildID).me.setNickname(req.body.botname);
  };
  if (req.body.prefix) {
      x.establecer(`${req.params.guildID}`, req.body.prefix)
  };
res.redirect('/panel/guilds/' +req.params.guildID);
});
app.post('/panel/suggestion', bodyParser.json(), function(req, res) {
  if (req.body.suggestion){
    const embed = new Discord.RichEmbed()
    .setAuthor(req.user.username, `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`)
    .addField("Suggestion:", req.body.suggestion)
   .addField("Suggested by:", req.user.username + "#" + req.user.discriminator) 
    client.channels.get("593965039216492584").send(embed)
  };
 res.redirect('/panel');
    });
app.post('/panel/report', bodyParser.json(), function(req, res) {
  if (req.body.report){
    const embed = new Discord.RichEmbed()
    .setAuthor(req.user.username, `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`)
    .addField("Bug:", req.body.report)
   .addField("Reported by:", req.user.username + "#" + req.user.discriminator) 
    client.channels.get("593965020770205697").send(embed)
  };
 res.redirect('/panel');
    });
app.use(function(req,res){
if (req.isAuthenticated()) req.logout();
res.redirect('/');
});
const listener = app.listen(process.env.PORT, function() {console.log('Your app is listening on port ' + listener.address().port);});

// <------------------------------------------------------------------------------------------->

/*
***************
*  BOT BASIC  *
***************
*/
client.config = require("./config.js");
var prefix = client.config.prefix
client.commands = new Discord.Collection();
client.emoji = require("./emojis.json");
client.megadb = require("megadb")
const cooldowns = new Discord.Collection()


/*
*********************
*  COMMAND HANDLER  *
*********************
*/
const fs = require('fs')
const commands = fs.readdirSync("./commands/").filter(f => f.endsWith(".js"))

for(const file of commands) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
  if(!command.name && !command.description) console.log(`${file} loaded, but it's empty.`)
  else console.log(`${file} loaded`)
}
  
/*
*********************
*  EVENTS           *
*********************
*/

client.on("error", (error) => console.error("ERROR", error));

client.once("ready", () => {
  
  client.user.setActivity("Discord Hack Week", { type: "WATCHING"})
  console.log("Logged in.")
});

client.on("message", async (message) => {
  if (x.tiene(message.guild.id)) prefix = await x.obtener(message.guild.id)
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const CommandName = args.shift().toLowerCase();
  
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
  
  if (!client.commands.has(CommandName)) return message.channel.send(`Command not found \`${CommandName}\`.`);  
  const command = client.commands.get(CommandName)

    const time = (command.cooldown || 0) * 1000;
    if(!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const commandcooldowns = cooldowns.get(command.name)
    if(commandcooldowns.has(message.author.id)) {
      const expirationTime = commandcooldowns.get(message.author.id) + time;
      if (Date.now() < expirationTime) {
        const timeLeft = (expirationTime - Date.now());
        return message.channel.send(`${message.author.tag}, you have a cooldown. Please wait ${Math.round(timeLeft / 1000)}s.`)
      }
    }
      command.run(client, message, args, Discord)
      console.log(`Command ${CommandName} runs for ${message.author.tag} in ${message.guild.name}`);
      const wh = new Discord.WebhookClient('592772515340877840', process.env.WHSECRET);
      wh.send(`Command **${CommandName}** runs for **${message.author.tag}** in **${message.guild.name}**`);
      commandcooldowns.set(message.author.id, Date.now())
      setTimeout(function deleteCooldown() { commandcooldowns.delete(message.author.id)}, time)
});

/*
*********************
*  LOGIN            *
*********************
*/

client.login(process.env.TOKEN).catch(error => console.error(error));