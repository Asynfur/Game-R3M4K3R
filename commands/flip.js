const { letterTrans} = require("custom-translate");

module.exports = {
  name: "flip",
  description: "Flip the text you indicate",
  category: "Text",
  run(client, message, args, Discord){
    const toFlip = args.join(" ")
  const withoutFlip = new Discord.RichEmbed()
  .setDescription("Tell me what text you want to flip")
  .setColor(client.config.deny)
  if (!toFlip) message.channel.send(withoutFlip)
    
  const dictionary = {
    "a": "ɐ",
    "b": "q",
    "c": "ɔ",
    "d": "p",
    "e": "ǝ",
    "f": "ɟ",
    "g": "ƃ",
    "h": "ɥ",
    "i": "ᴉ",
    "j": "ɾ",
    "k": "ʞ",
    "m": "ɯ",
    "n": "u",
    "p": "d",
    "q": "b",
    "r": "ɹ",
    "t": "ʇ",
    "u": "n",
    "v": "ʌ",
    "w": "ʍ",
    "y": "ʎ",
    "A": "∀",
    "C": "Ɔ",
    "E": "Ǝ",
    "F": "Ⅎ",
    "G": "פ",
    "J": "ſ",
    "L": "˥",
    "M": "W",
    "P": "Ԁ",
    "T": "┴",
    "U": "∩",
    "V": "Λ",
    "W": "M",
    "Y": "⅄",
    "1": "Ɩ",
    "2": "ᄅ",
    "3": "Ɛ",
    "4": "ㄣ",
    "5": "ϛ",
    "6": "9",
    "7": "ㄥ",
    "9": "6",
    ",": "'",
    ".": "˙",
    "'": ",",
    "\"": ",,",
    "_": "‾",
    "&": "⅋",
    "!": "¡",
    "?": "¿",
    "`": ","
}
    
  const flipFunction = letterTrans(toFlip, dictionary)
  message.channel.send(flipFunction)
  }
}