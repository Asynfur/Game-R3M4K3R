var Weez = require("weez");
var weez = new Weez.WeezAPI(process.env.WEEZ);
module.exports = {
  name: 'forget',
  description: 'You miss someone? Show that you remember!',
  category: "Image"
}
module.exports.run = async (client, message, args, Discord) => {
  if(!message.mentions.users.first()) return message.channel.send("Mention the user that you remember!")
  if(!message.mentions.users.first() == message.author) return message.channel.send("Missing yourself? Something strange, is not it?")
  const forget = await weez.olvido(message.mentions.users.first().displayAvatarURL)
  await message.channel.startTyping()
  await message.channel.send({ files: [forget] }).then(() => {
    setTimeout (() => { message.channel.stopTyping()} , 10000)
  })
  }