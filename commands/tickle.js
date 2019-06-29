module.exports = {
  name: 'tickle',
  description: "Tickle a user with a lot of love",
  category: "Interaction"
}
module.exports.run = async (client, message, args, Discord) => {
  const phin = require('phin');
    const {body} = await phin({
      url:'https://nekos.life/api/v2/img/tickle',
      parse: 'json'
    })
  const mention = message.mentions.users.first();
  if(!mention) return message.channel.send("Mention a user!")
  if(mention == message.author) return message.channel.send("You can't tickle yourself")
  if(mention.bot == true) return message.channel.send("You can't tickle a bot")
  message.channel.send(new Discord.RichEmbed() .setTitle(`${message.author.username} tickled ${mention.username}`)  .setColor(`RANDOM`) .setImage(body.url))
}