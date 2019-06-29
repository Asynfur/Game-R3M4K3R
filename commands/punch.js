module.exports = {
  name: 'punch',
  description: 'Hit a user with all your hate',
  category: "Interaction",
  run(client, message, args, Discord){

    const mention = message.mentions.users.first()
    
      let punch = [
      'https://i.giphy.com/media/iWEIxgPiAq58c/giphy.gif',
      'https://i.giphy.com/media/DViGV8rfVjw6Q/giphy.gif',
      'https://i.giphy.com/media/GoN89WuFFqb2U/giphy.gif',
      'https://i.giphy.com/media/xT0BKiwgIPGShJNi0g/giphy.gif',
      'https://i.giphy.com/media/Lx8lyPHGfdNjq/giphy.gif'
    ];
    
    const randomd = punch[Math.floor(Math.random() * punch.length)];
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username} has hit ${mention.username}`)
    .setImage(randomd)
    message.channel.send({ embed })
  }
}