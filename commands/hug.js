const phin = require('phin');
module.exports = {
  name: 'hug',
  description: 'Hug a user with a lot of love',
  category: "Interaction",
  async run(client, message, args, Discord){
    const {body} = await phin({
  url: 'https://nekos.life/api/v2/img/hug',
  headers: {
  'Content-Type': "application/json"
},
    parse:'json'
});
    const mention = message.mentions.users.first()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} has embraced ${mention.username}`)
    .setImage(body.url)
    message.channel.send({ embed })
  }
}