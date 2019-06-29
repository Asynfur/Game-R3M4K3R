
module.exports = {
  name: 'poke',
  description: "Poke a user with a lot of love",
  category: "Interaction"
}
module.exports.run = async (client, message, args, Discord) => {
  const phin = require('phin');
    const {body} = await phin({
      url:'https://nekos.life/api/v2/img/poke',
      parse: 'json'
    })
    
  const mention = message.mentions.users.first();
  if(!mention) return message.channel.send("Mention a user!")
  if(mention == message.author) return message.channel.send("You can't poke yourself")
  if(mention.bot == true) return message.channel.send("You can't poke a bot")
  message.channel.send(new Discord.RichEmbed() .setTitle(`${message.author.username} poked ${mention.username}`)  .setColor(`RANDOM`) .setImage(body.url))
}