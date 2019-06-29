module.exports = {
  name: "archievement",
  description: "Displays a custom xbox logo",
  category: "Image"
}

module.exports.run = async(client, message, args, Discord) => { 
  if (args.length < 1) return message.channel.send(new Discord.RichEmbed()
  .setDescription("Provide the name of the logo").setColor(client.config.deny));
  const phin = require('phin');
  const {body} = await phin({
  url: `https://weez.pw/api/logroeng?texto=${args.join(" ")}`,
  headers: {
  'clave': process.env.WEEZ,
  'Content-Type': "application/json"
}
});
  // console.log(body)
  message.channel.send({ files: [body] });
}