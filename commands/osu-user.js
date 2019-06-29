const osu = require('node-osu')
var osuAPI = new osu.Api(process.env.OSUAPI, {
    notFoundAsError: true,
    completeScores: false
})
module.exports = {
  name: 'osu-user',
  description: 'Get stats of an osu player.',
  cooldown: 10,
  category: 'Text',
  run(client, message, args, Discord) {
    if (args.length < 1) return message.channel.send(new Discord.RichEmbed() .setDescription("Indicate an osu player to use this command!") .setColor(client.config.deny))
    osuAPI.getUser({u: args.join(' ')}).then(user => {
      const embed = new Discord.RichEmbed()
      .setColor('#ff68e0')
      .setAuthor(`${user.name} STATS`)
      .setThumbnail(process.env.osulogo)
      .addField('ID', user.id)
      .addField('Country', `${user.country} :flag_${user.country.toLowerCase()}:`)
      .addField('Level', user.level)
      .addField('Accuracy', user.accuracy)
      .addField('Counts', `50 \`${user.counts["50"]}\`\n100 \`${user.counts["100"]}\`\n300 \`${user.counts["300"]}\`\nSSH \`${user.counts['SSH']}\`\nSS \`${user.counts["SS"]}\`\nSH \`${user.counts["SH"]}\`\nS \`${user.counts["S"]}\`\nA \`${user.counts["A"]}\`\nPlays \`${user.counts["plays"]}\``)
      .addField('Scores', `Ranked \`${user.scores["ranked"]}\`\nTotal \`${user.scores["total"]}\``)
      .addField('PP', `Raw \`${user.pp["raw"]}\` \nGlobal Rank \`${user.pp["rank"]}\` \nCountry Rank \`${user.pp["countryRank"]}\``)
      message.channel.send(embed)
    }).catch(err => {
        if(err) return message.channel.send(new Discord.RichEmbed() .setDescription(`${message.author.tag}, user with \`${args.join(' ')}\` not found in OSU!`) .setColor(client.config.deny)) 
      })
    }
  }