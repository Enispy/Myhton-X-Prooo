const Discord = require('discord.js');
  const db = require('quick.db')
 
exports.run = async (client, message, args) => {
 
    let user;
   
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
   
  const artemuscode = new Discord.RichEmbed()
  .setColor("ORANGE")
  .setAuthor(`Buyur Avatarın :D`)
  .setImage(user.avatarURL)
  message.channel.send(artemuscode)
}
 //Artemus
 
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["pp"],
  permLevel: `Yetki yetmemekte.`
};
exports.help = {
  name: "avatar",
  description:"Avatarını Gösterir",
  usage:"avatar"
}