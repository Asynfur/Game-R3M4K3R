module.exports = {
  name: 'pat',
  description: 'Pat a user with a lot of love',
  category: "Interaction",
  async run(client, message, args, Discord){

    const mention = message.mentions.users.first()
    const phin = require('phin');
    const {body} = await phin({
      url:'https://nekos.life/api/v2/img/pat',
      parse: 'json'
    })
    
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} he has given him a pat ${mention.username}`)
    .setImage(body.url)
    message.channel.send({ embed })
  }
}