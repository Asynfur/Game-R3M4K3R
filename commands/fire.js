var Jimp = require('jimp')
module.exports = {
  name: 'fire',
  description: '<',
  category: 'Image',
  run(client, message, args, Discord){
    const userm = message.mentions.users.first() || client.users.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.author
    const avatar = Jimp.read(userm.displayAvatarURL)
    const esponjebob = Jimp.read("https://cdn.discordapp.com/attachments/558034301929914388/594352867981262848/2.jpg")
    Promise.all([avatar, esponjebob]).then(function(images){
      const avatar1 = images[1];
      const bob = images[0];
      avatar1.resize(640, 740);
      bob.resize(170, 200);
      avatar1.composite(bob, 70, 50);
        avatar1.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          const img = new Discord.Attachment(buffer, 'esponjebob.png');
           message.channel.send(img)
        })
    })
    }
}