const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment')
const Jimp = require('jimp')

exports.run = (client, message, args) => { 

  if(message.author.id != "510813083548254208") return
  
let reklam = db.fetch(`reklam_${message.guild.id}`) || "0";//DarkCode Yapımı
  let küfür = db.fetch(`küfür_${message.guild.id}`) || "0";//DarkCode Yapımı
 var user = message.mentions.users.first() || message.author; 
  const duration = client.uptime
const DarkCode = new Discord.RichEmbed()
.setAuthor("KU-Pİ V2", client.user.avatarURL)
.setTitle("KU-Pİ V2 BOT")
.setURL("")
.setDescription("BİLAL tarafından hazırlanmıştır.")
.setColor("BLUE")
.setTimestamp()
.setFooter("© KU-Pİ V2", client.user.avatarURL)
.addField("Kullanılan RAM miktarı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
.addField("Toplam RAM miktarı", `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`)
.addField("Toplam sunucu sayısı", `${client.guilds.size.toLocaleString()}`)
.addField("Bilgi", `
${client.guilds.size.toLocaleString()}, Sunucu!. / ${client.users.size}, Üye! / Shard ID: **Yok!**

${duration / 60 / 60} dakika içinde,
**32,626** kullanılan kelime içerisinden :s
**${küfür}** küfür engellendi :angry: 
**${reklam}** reklam engellendi :hammer:
[Bot Durumu]()
`)
message.channel.send(DarkCode)
};

exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['botbilgi'], 
  permLevel: 0
};

exports.help = {
  name: 'bot-bilgilskdaldjalkdjadlsjdajdldjaldjdjadjldjadjlajdljadldjdjadjldjladlkdajdlajddljadjaldjdladjl',
  description: 'DarkCode :)', 
  usage: 'DarkcoDe'
};