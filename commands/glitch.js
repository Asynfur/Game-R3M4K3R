const Nanite = require('nanite-wrapper')
const Api = new Nanite.NaniteWraper(process.env.NANITE)

module.exports = {
  name: "glitch",
  description: "Try this glitch effect",
  category: "Image"
}

module.exports.run = async (client, message, args, Discord) => {
  
  var avatar = message.mentions.users.first() || client.users.get(args[0])
  if (!avatar) avatar = message.author
  
  const image = await Api.Glitch(avatar.avatarURL)
 const img = new Discord.Attachment(image, "glitch.gif")

  message.channel.send(img)
}