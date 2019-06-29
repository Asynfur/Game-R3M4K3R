module.exports = {
  name: 'help',
  description: 'Shows all the commands with its own description.',
  cooldown: 30,
  run(client, message, args, Discord) {
  const embed = new Discord.RichEmbed()
  .setThumbnail(client.user.avatarURL)
  .setColor(client.config.agree)
  .addField("Settings", client.commands.filter(e => e.category === "Settings" && e.description).map(c => "**" + c.name + ":** " + c.description).join("\n"))
  .addField("Games", client.commands.filter(e => e.category === "Games" && e.description).map(c => "**"+c.name +":** "+c.description).join("\n"))
  .addField("Fair", client.commands.filter(e => e.category === "Fair" && e.description).map(c => `**${c.name}:** ${c.description}`).join("\n"))
  .addField("Economy", client.commands.filter(e => e.category === "Economy" && e.description).map(c => "**"+c.name +":** "+c.description).join("\n"))
  .addField("Text", client.commands.filter(e => e.category === "Text" && e.description).map(c => "**"+c.name +":** "+c.description).join("\n"))
  .addField("Image", client.commands.filter(e => e.category === "Image" && e.description).map(c => "**"+c.name +":** "+c.description).join("\n"))
  .addField("Interaction", client.commands.filter(e => e.category === "Interaction" && e.description).map(c => `**${c.name}:** ${c.description}`).join("\n")) 
  message.channel.send(embed);
  }
}
