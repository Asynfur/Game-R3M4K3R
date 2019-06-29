module.exports = {
  name: "dog",
  category: "Image",
  description: "Delight yourself by seeing beautiful dogs"
}

const perroNPM = require("random.dog")

const randomLetters = [
  "It is not beautiful?", "Dogs will dominate the world", "Dogs are so cute!", "Kawaii, or not?", "Our best friend"
]

module.exports.run = async function(client, message, args, Discord) {
  
  const dog = new perroNPM();
  dog.getDog().then(url => {
    const embed = new Discord.RichEmbed()
    .setImage(url)
    .setColor(client.config.agree)
    .setFooter(randomLetters[Math.floor(Math.random() * randomLetters.length)])
    message.channel.send(embed)
  })
}