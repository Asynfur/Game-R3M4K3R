let db = require("megadb")
let dinero = new db.crearDB("dinero")
let cooldown = new db.crearDB("cooldown")
const lawea = new db.crearDB("lawea")
const moment = require("moment")

module.exports = {
  name: "daily",
  description: 'Claim your daily credits.',
  category: "Economy",
  description: "Get your daily credits"
}

let NaNR = Math.floor(Math.random() * 1000)
module.exports.run = async (client, message, args) => {
  
  if (!cooldown.tiene(`${message.author.id}.daily`)) {
    cooldown.establecer(`${message.author.id}.daily`, moment().format("L"))
  message.channel.send("Has won `300` credits.")
    if (dinero.tiene(`${message.author.id}.bal`)){
      dinero.sumar(`${message.author.id}.bal`, 300)} else {
        dinero.establecer(`${message.author.id}.bal`, 300)
      }
  } else if (await cooldown.obtener(`${message.author.id}.daily`) != moment().format("L")){
        message.channel.send("Has won `300` credits.");
        cooldown.establecer(`${message.author.id}.daily`, moment().format("L"))
         dinero.sumar(`${message.author.id}.bal`, 300)
  } else {
    message.channel.send("You have already received your daily reward, try again `"+moment().endOf("day").fromNow()+"`");
    
  }
  
}
