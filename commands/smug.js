module.exports = {
  name: 'smug',
  description: 'Smug front of other users',
  category: "Interaction",
}
module.exports.run = async (client, message, args, Discord) => {
  const phin = require('phin');
    const {body} = await phin({
      url:'https://nekos.life/api/v2/img/smug',
      parse: 'json'
    })
  const smug = new Discord.RichEmbed()
     .setTitle(`${message.author.username} is smugged`)
     .setColor('RANDOM')
     .setImage(body.url)
  message.channel.send(smug)
}