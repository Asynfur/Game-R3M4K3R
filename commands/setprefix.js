const db = require("megadb")
const x = new db.crearDB("prefixes")

module.exports = {
  name: "setprefix",
  description: "Change the prefix of the bot within the guild",
  category: "Settings",
  run(client, message, args, Discord) {
   
    const noADM = new Discord.RichEmbed()
    .setDescription("You do not have permission to change the prefix")
    .setColor(client.config.deny)
    
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noADM)
    const prefix = args[0]
    if (!prefix) return message.channel.send("Provides the bot prefix for the guild")
    
    x.establecer(`${message.guild.id}`, prefix)
    const embed = new Discord.RichEmbed()
    .setColor(client.config.agree)
    .setDescription("The prefix has been successfully changed to `"+args[0]+"`")
    message.channel.send(embed)  }
}
