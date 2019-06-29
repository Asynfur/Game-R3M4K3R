module.exports = {
  name: "reverse",
  description: "Invert the text that you indicate",
  cooldown: 3,
  category: "Text",
  run(client, message, args, Discord) {
  const toReverse = args.join(" ")
    if (args.length < 1) return message.channel.send(new Discord.RichEmbed() .setDescription("Indicate a text to reverse it") .setColor(client.config.deny))
    const reverseFunction = toReverse.split("").reverse().join("")
    message.channel.send(`\u180E${reverseFunction}`)
  }
}