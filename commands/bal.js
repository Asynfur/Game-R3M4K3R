const db = require("megadb")
const dinero = new db.crearDB("dinero");

module.exports = {
  name: "bal",
  category: "Economy",
  cooldown: 10,
  description: "See your balance."
}
module.exports.run = async(client, message, args, Discord) => {
  if (!dinero.tiene(`${message.author.id}.bal`)) return message.channel.send(`${message.author.tag}, your balance: \`0\``)
  var bal = await dinero.obtener(`${message.author.id}.bal`)
  message.channel.send(`${message.author.tag}, your balance: \`${bal}\``)
}