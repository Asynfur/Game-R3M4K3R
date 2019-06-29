var Weez = require("weez");
var weez = new Weez.WeezAPI(process.env.WEEZ);

module.exports = {
  name: "triggered",
  description: "Your avatar triggered!!!",
  category: "Image"
}
 module.exports.run = async(client, message, args, Discord) => {
    
  let trigg = message.mentions.users.first() || client.users.get(args[0]) || message.author;
  
 const imagen = await weez.triggered(trigg.avatarURL)
    message.channel.send(new Discord.Attachment(imagen, "triggered.gif"))
  }
