module.exports = {
  name: '8ball',
  description: 'Make questions, get answered',
  category: "Text",
  async run(client, message, args, Discord) {
    
  const question = args.join(" ")
    if(question.length < 1) return message.channel.send(new Discord.RichEmbed().setColor(client.config.deny).setDescription("Please provide a question to use 8ball."))
    const phin  = require('phin');
    let {body} = await phin({
      url:'https://3e6phuwkdkm4q0d.glitch.me/api/msg/f-en',
      headers: {
        'Content-Type':'application/json',
        'Authorization':process.env.KAPI
      },
      parse: 'json'
    });    
    message.channel.send(new Discord.RichEmbed()  .setColor(client.config.agree)  .setDescription(":8ball: | **"+body.msg+"**"))
    
}
}