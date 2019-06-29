const Nanite = require('nanite-wrapper')
const Api = new Nanite.NaniteWraper(process.env.NANITE)

module.exports = {
  name: "rip",
  description: "Your death, anticipated?",
  category:"Image"
}

module.exports.run = async (client, message, args) => {
  
  var user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) user = message.author;
  
const image = await Api.Rip(user.avatarURL)
  
message.channel.send({files: [image]})

}