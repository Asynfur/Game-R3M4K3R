module.exports = {
  name: 'dance',
  description: 'Start dancing!',
  category: "Interaction",
  run(client, message, args, Discord){
    let dance = ["https://tenor.com/xpjX.gif", "https://tenor.com/tXzy.gif", "https://tenor.com/YGhS.gif", "https://tenor.com/8BpR.gif", "https://tenor.com/64Gw.gif",
                "https://tenor.com/xPf1.gif"];
    const randomd = dance[Math.floor(Math.random() * dance.length)];
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} is dancing`)
    .setImage(randomd)
    message.channel.send({ embed })
  }
}