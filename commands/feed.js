const phin = require('phin');
module.exports = {
  name: 'feed',
  description: "Feed a hungry user",
  category: "Interaction"
}
module.exports.run = async (client, message, args, Discord) => {
    const {body} = await phin({
  url: 'https://nekos.life/api/v2/img/feed',
  headers: {
  'Content-Type': "application/json"
},
    parse:'json'
});
  const mention = message.mentions.users.first();
  if(!mention) return message.channel.send("Mention a user!")
  if(mention == message.author) return message.channel.send("You can't feed yourself")
  if(mention.bot == true) return message.channel.send("You can't feed a bot")
  message.channel.send(new Discord.RichEmbed() .setTitle(`${message.author.username} gives food to ${mention.username}`)  .setColor(`RANDOM`) .setImage(body.url))
}