const db = require("megadb");
const lawea = new db.crearDB("lawea")
const dinero = new db.crearDB("dinero")
const moment = require("moment")
module.exports = {
  name: "get-ticket",
  description: "Get a ticket to enter the fair in #entry",
  category: "Fair"
}

module.exports.run = async (client, message, args) => {
  const tiempo = moment().format("L")
  
  if (message.channel.name !== "entry") return message.channel.send("Your ticket is claimed in #entry. If you do not have this channel, ask an administrator to execute the fair command");
  
  if (!lawea.tiene(`${message.author.id}.wea`)){
    message.channel.send("Apparently it's your first time here. Take it, I'll give you a ticket");
    lawea.establecer(`${message.author.id}.wea`, tiempo)
  } else if (await lawea.obtener(`${message.author.id}.wea` !== tiempo)){
    if (await dinero.obtener(`${message.author.id}.bal`) < 100) return message.channel.send("You do not have enough money to buy a ticket.");
    dinero.restar(`${message.author.id}.bal`, 100)
    lawea.establecer(`${message.author.id}.wea`, tiempo)
    message.channel.send("Congratulations! you have successfully purchased today's ticket");
  } else {
    message.channel.send("Oops! you already have today's ticket. Your ticket expires `"+moment().endOf("day").fromNow())
  }
  
}