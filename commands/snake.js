  module.exports = {
  name: 'snake',
  description: 'Have fun with the classic game Snake!',
  category: 'Games',
  run(client, message, args) {
    message.channel.send("Creating snake map...").then(msg => msg.delete(2000))
    message.channel.send("⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳⬜\n⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜").then(msg1 => {
      message.channel.send("Control your snake here!").then(async m => {
        await m.react("⏪")
        await m.react("⏸") 
        await m.react("⏩")
        await m.react("⏹")
        const collector = m.createReactionCollector((r, u) => u.id == message.author.id)
        message.channel.send(`${message.author.tag}, your snake's direction: \`left\``).then(messagedirection => {
          collector.on('collect', r => {    
            if(r.emoji.name == "⏹") {
              msg1.delete()
              m.delete()
              messagedirection.delete()
            } else if(r.emoji.name == "⏸") {
              message.channel.send("Paused.")
            } else if(r.emoji.name == "⏪") {
              messagedirection.edit(`${message.author.tag}, your snake's direction: \`left\`.`)
            } else if(r.emoji.name == "⏩") {
              messagedirection.edit(`${message.author.tag}, your snake's direction: \`right\`.`)
            }
          })
        })
      })
    })
  }  
}