var Jimp = require('jimp')
module.exports = {
  name: 'hackweek',
  description: 'Get a beautiful avatar to represent Discord Hack Week',
  category: 'Image',
  run(client, message, args, Discord){
    const userm = message.mentions.users.first() || client.users.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.author
    const avatar = Jimp.read(userm.displayAvatarURL)
    const hack = Jimp.read("https://cdn.discordapp.com/attachments/558034301929914388/593939585734672394/5.png")
    Promise.all([avatar, hack]).then(function(images){
      const avatar1 = images[0];
      const week = images[1];
      avatar1.resize(500, 500);
      week.resize(500, 500);
      avatar1.composite(week, 0, 0);
        avatar1.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          const img = new Discord.Attachment(buffer, 'hackweek.png');
           message.channel.send(new Discord.RichEmbed() 
                                .setColor("000000") 
                                .setTitle("Avatar of Discord Hack Week") 
                                .attachFile(img) 
                                .setImage('attachment://hackweek.png'))
        })
    })
    }
}