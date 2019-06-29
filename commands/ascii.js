const figlet = require('figlet');
module.exports = {
  name: 'ascii',
  description: 'Write down a text, get it beautiful using ASCII!',
  category: "Text",
  cooldown: 5,
  run(client, message, args, Discord) {
    if(args.length < 1 || args.length > 14) return message.channel.send(new Discord.RichEmbed().setColor(client.config.deny).setDescription("Please, provide a text of 1 to 14 characters"))
  
    figlet(args.join(" "), (err, data) => message.channel.send("```" + data + "```"))
  }
}