const db = require("megadb")
const dinero = new db.crearDB("dinero");
const lawea = new db.crearDB("lawea")


module.exports = {
  name: "slots",
  category: "Fair",
  cooldown: 10,
  description: "Bet on the slot machine!"
}
module.exports.run = async(client, message, args, Discord) => {
  
  const moment = require("moment")
  const tiempo = moment().format("L")
  
  if (!lawea.tiene(`${message.author.id}.wea`)) return message.channel.send("It seems like it's your first time around here. Claim your ticket in #entry");
   if (await lawea.obtener(`${message.author.id}.wea`) !== tiempo) return message.channel.send("Your ticket is expired, buy a new one in #entry");
  
  
let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let aicon = message.author.displayAvatarURL;

    if (!args[0]) return message.channel.send("You must enter an amount to settle");
    if (isNaN(args[0])) return message.channel.send("The quantity must be numeric");
    if (!dinero.tiene(`${message.author.id}.bal`)) return message.channel.send("You must have money to bet.")
    if (await dinero.obtener(`${message.author.id}.bal`) <= 0) return message.channel.send("You must have money to bet.")
    
    const cantidad = parseInt(args[0])
    
    if (slots[result1] === slots[result2] && slots[result3]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter("You Won!", aicon)
            .setTitle(':slot_machine: Slots:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor("#f4e842");
        message.channel.send(wEmbed);
      dinero.sumar(`${message.author.id}.bal`, cantidad/2)
      message.channel.send("You've won "+cantidad/2+". Your current balance now is "+await dinero.obtener(`${message.author.id}.bal`))
    } else {
        let embed = new Discord.RichEmbed()
            .setFooter('You Lost!', aicon)
            .setTitle(':slot_machine: Slots')
            .addField('Result', slots[result1] + slots[result2] + slots[result3], true)
            .setColor("#f4e842");
      dinero.restar(`${message.author.id}.bal`, cantidad)
       message.channel.send("You've lost "+cantidad+". Your current balance now is "+await dinero.obtener(`${message.author.id}.bal`))
        message.channel.send(embed);
    }
  }
  
