var Jimp = require('jimp')
module.exports = {
  name: 'balance',
  description: 'Get a beautiful avatar to represent HypeSquad Balance',
  category: 'Image',
  run(client, message, args, Discord){
    const userm = message.mentions.users.first() || client.users.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.author
    const avatar = Jimp.read(userm.displayAvatarURL)
    const balance = Jimp.read("https://cdn.discordapp.com/attachments/558034301929914388/593814580501938213/3.png")
    Promise.all([avatar, balance]).then(function(images){
      const avatar1 = images[0];
      const balance1 = images[1];
      avatar1.resize(500, 500);
      balance1.resize(500, 500);
      avatar1.composite(balance1, 0, 0);
        avatar1.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          const img = new Discord.Attachment(buffer, 'balance.png');
           message.channel.send(new Discord.RichEmbed() 
                                .setColor("51efc0") 
                                .setTitle("Avatar of HypeSquad Balance") 
                                .attachFile(img) 
                                .setImage('attachment://balance.png'))
        })
    })
    }
}