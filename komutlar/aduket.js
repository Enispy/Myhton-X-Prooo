const Discord = require("discord.js")

exports.run = function(client,message,args) {
  
const etiket = message.mentions.users.first();
  
if(!etiket) return message.reply("**Aduket Çekeceğin Kişiyi Etiketlemelisin**");

  const DarkCode = new Discord.RichEmbed() 
    
  .setDescription(`${etiket} ` + `**${message.author.username}** Size Aduket Çekti`)
  .setImage("https://cdn.discordapp.com/attachments/747769679984066582/748464442249052251/street-fighter-60854-18102018130021.gif")  //istediğiniz gifi koyun
  .setFooter(client.user.username+" :D",client.user.avatarURL)
  .setTimestamp()
  
  .setColor("Orange")
  message.delete()
  message.channel.send(DarkCode);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["aduket-çek"],
  permLevel: 0
};

exports.help = {
  name:"aduket",
  description:"aduket çekersiniz", 
  usage:"[prefix]aduket <etiket>"
};
