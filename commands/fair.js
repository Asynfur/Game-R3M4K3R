const db = require("megadb")


module.exports = {
  name: "fair",
  description: "Create your own fair! All inside your server",
  category: "Settings"
}

var a, b, c, e, d, f, g;

module.exports.run = async (client, message, args,Discord) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(`${message.author.tag}, no perms.`)
  if (!message.guild.me.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(`${message.author.tag}, I don't have enough perms. Needed: Manage Messages.`)
  
  if (!message.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.channel.send(`${message.author.tag}, I don't have enough perms. Needed: Manage Channels.`)
  
  message.channel.send("Initiating fair creation system...")
  
  var a = await message.guild.createChannel("FAIR", {
    type: "category"
  })
  
  //1
  setTimeout(async function () {
  var c = await message.guild.createChannel("entry", {
    type: "text"
  }).then(channel => channel.setParent(a.id))

    message.channel.send("🎫 - Entry created successfully "+c)
  }, 500)
  
  //2
    setTimeout(async function (){
 var d = await message.guild.createChannel("circus", {
    type:"text"
  }).then(channel => {channel.setParent(a.id)
      const embedD = new Discord.RichEmbed()
    .setDescription(client.commands.filter(e => e.category === "Text").map(c => "**"+c.name +":** "+c.description).join("\n"))
  channel.send(embedD).then(m => m.pin())
                     
 message.channel.send("🎪 - Circus created successfully "+channel)
                     })
 }, 1000)
 
  //3
 setTimeout(async function () {
   
 var e = await message.guild.createChannel("casino", {
    type: "text"
  }).then(channel => {
   channel.setParent(a.id)
     const embedE = new Discord.RichEmbed()
  .setDescription(client.commands.filter(e => e.category === "Fair").map(c => "**"+c.name +":** "+c.description).join("\n"))
  channel.send(embedE).then(m => m.pin())

  message.channel.send("🎰 - Casino created successfully "+channel)
 })
 }, 1500)

}
           