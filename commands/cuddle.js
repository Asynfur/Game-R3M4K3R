const phin = require('phin');
module.exports = {
  name: 'cuddle',
  description: 'Cuddle a user who\'s alone',
  category: "Interaction",
}
module.exports.run = async (client, message, args, Discord) => {
    
  const {body} = await phin({
  url: 'https://nekos.life/api/v2/img/cuddle',
  headers: {
  'Content-Type': "application/json"
},
    parse:'json'
});
  const usuario = message.mentions.users.first()
  if(!usuario) return message.channel.send("Mention a user!")
  if(usuario.bot == true) return message.channel.send("You can't cuddle a bot")
  if(usuario == message.author) return message.channel.send("You can't cuddle yourself")
  const cuddle = new Discord.RichEmbed()
     .setTitle(`${message.author.username} snuggled up with ${usuario.username}`)
     .setColor('RANDOM')
     .setImage(body.url)
  message.channel.send(cuddle)
}