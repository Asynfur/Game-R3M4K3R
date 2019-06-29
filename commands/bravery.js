var Jimp = require('jimp');
var format = ""
module.exports = {
  name:'bravery',
  description: 'Get a beautiful avatar to represent HypeSquad Bravery',
  category: 'Image',
  run(client, message, args, Discord){
    const userm = message.mentions.users.first() || client.users.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.author

    const avatar = Jimp.read(userm.displayAvatarURL)
    const bravery = Jimp.read("https://cdn.discordapp.com/attachments/558034301929914388/593931194509557762/3.png")
    Promise.all([avatar, bravery]).then(function(images){
      const avatar1 = images[0];
      const bravery1 = images[1];
      avatar1.resize(500, 500);
      bravery1.resize(500, 500);
      avatar1.composite(bravery1, 0, 0);
        avatar1.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          const img = new Discord.Attachment(buffer, `bravery.png`);
           message.channel.send(new Discord.RichEmbed() 
                                .setColor("9c84ef") 
                                .setTitle("Avatar of HypeSquad Bravery") 
                                .attachFile(img) 
                                .setImage('attachment://bravery.png'))
        })
    })
  }

}