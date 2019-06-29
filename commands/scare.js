const Weez = require("weez")
var weez = new Weez.WeezAPI(process.env.WEEZ)
module.exports = {
  name: "scare",
  description: "Is someone scary?",
  category: "Image"
}
module.exports.run = async (client, message, args, Discord) => {
  const usuario = message.mentions.users.first() || message.author
  const scareimg = await weez.susto(usuario.displayAvatarURL)
  await message.channel.startTyping()
    await message.channel.send({files: [scareimg]}).then(() => {
      setTimeout(() => { message.channel.stopTyping()}, 10000)
    })
  }