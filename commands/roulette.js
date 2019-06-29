var balance;
const db = require("megadb")
const dinero = new db.crearDB("dinero")
const lawea = new db.crearDB("lawea")
module.exports = {
  name: 'roulette',
  description: 'Spend a few time spinning the roulette!',
  category: "Fair"
}
  module.exports.run = async (client, message, args, Discord) => {
    
      const moment = require("moment")
  const tiempo = moment().format("L")
  
  if (!lawea.tiene(`${message.author.id}.wea`)) return message.channel.send("It seems like it's your first time around here. Claim your ticket in #entry");
   if (await lawea.obtener(`${message.author.id}.wea`) !== tiempo) return message.channel.send("Your ticket is expired, buy a new one in #entry");
  
    
   const randomNumber = Math.floor(Math.random() * (6 - 1) + 1);
  const rando = Math.floor(Math.random() * 300)
  
  if (!dinero.tiene(`${message.author.id}.bal`) || await dinero.obtener(`${message.author.id}.bal`) <= 0) return message.channel.send("You do not have money to bet");
  
  const balance = await dinero.obtener(`${message.author.id}.bal`);
  
    const embed = new Discord.RichEmbed()
    
  if (randomNumber === 1){
    embed.setColor("RED")
    embed.setAuthor("1","https://image.flaticon.com/icons/png/128/188/188234.png")
embed.setDescription("The number of death, has lost all the money. -"+balance)
    dinero.restar(`${message.author.id}.bal`, balance)
  } else if (randomNumber === 2){
    embed.setColor("BLUE")
    embed.setAuthor("2","https://image.flaticon.com/icons/png/128/188/188235.png")
embed.setDescription("The number of luck, you have doubled your money. +"+balance)
    dinero.sumar(`${message.author.id}.bal`, balance)
  } else if (randomNumber === 3){
    embed.setColor("RANDOM")
    embed.setAuthor("3","https://image.flaticon.com/icons/png/128/188/188236.png")
    embed.setDescription("The number of equality, nothing has happened.")
  } else if (randomNumber === 4){
    embed.setAuthor("4","https://image.flaticon.com/icons/png/128/188/188237.png")
    embed.setDescription("Congratulations you have won `"+rando+"`!")
    embed.setColor("BLUE")
    dinero.sumar(`${message.author.id}.bal`, rando)
  } else if (randomNumber === 5){
    embed.setColor("RED")
    embed.setAuthor("5","https://image.flaticon.com/icons/png/128/188/188238.png")
        embed.setDescription("You have lost `"+rando+"` :(")
    dinero.restar(`${message.author.id}.bal`, rando)
  } else {
    message.channel.send("Easteregg")
  }
   
    message.channel.send(embed)
}

