var Jimp = require('jimp');
module.exports = {
  name:'brilliance',
  description: 'Get a beautiful avatar to represent HypeSquad Brilliance',
  category: 'Image',
  run(client, message, args, Discord){
    const userm = message.mentions.users.first() || client.users.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.author
    const avatar = Jimp.read(userm.displayAvatarURL)
    const brilliance = Jimp.read("https://cdn.discordapp.com/attachments/558034301929914388/593926213899255820/2.png")
    Promise.all([avatar, brilliance]).then(function(images){
      const avatar1 = images[0];
      const brilliance1 = images[1];
      avatar1.resize(500, 500);
      brilliance1.resize(500, 500);
      avatar1.composite(brilliance1, 0, 0);
        avatar1.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          const img = new Discord.Attachment(buffer, 'brilliance.png');
           message.channel.send(new Discord.RichEmbed() 
                                .setColor("f47b67") 
                                .setTitle("Avatar of HypeSquad Brilliance") 
                                .attachFile(img) 
                                .setImage('attachment://brilliance.png'))
        })
    })
  }

}