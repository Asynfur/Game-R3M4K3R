module.exports = {
  name: "joke",
  category: "Text",
  description: "Enjoy some jokes with your friends",
  
}

module.exports.run = async (client, message, args, Discord) => {
  	 let phin = require ("phin");

    let {body} = await phin({
      url:'https://icanhazdadjoke.com/slack',
      headers: {
        'Content-Type': 'application/json'
      },
      parse: 'json'
    })

    let o = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("**" + body.attachments.map(a => a.text) + "**")
    message.channel.send(o)
	
  }
