module.exports = {
  name: 'kiss',
  description: 'Kiss a user with all your love',
  category: "Interaction",
  async run(client, message, args, Discord){

    const mention = message.mentions.users.first()
    const phin = require('phin');
    const {body} = await phin({
      url:'https://nekos.life/api/v2/img/kiss',
      parse: 'json'
    })
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} has kissed ${mention.username}`)
    .setImage(body.url)
    message.channel.send({ embed })
  }
}