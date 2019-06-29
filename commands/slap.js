
module.exports = {
  name: 'slap',
  description: 'Slap a user with love',
  category: "Interaction",
}
module.exports.run = async (client, message, args, Discord) => {
  const phin = require('phin');
    const {body} = await phin({
      url:'https://nekos.life/api/v2/img/slap',
      parse: 'json'
    })
  const mention = message.mentions.users.first()
  if(!mention) return message.channel.send("Mention a user!")
  if(mention.bot == true) return message.channel.send("You can't slap a bot")
  if(mention == message.author) return message.channel.send("You can't slap yourself")
  const slapped = new Discord.RichEmbed()
     .setTitle(`${message.author.username} slapped ${mention.username}`)
     .setColor('RANDOM')
     .setImage(body.url)
  message.channel.send(slapped)
}