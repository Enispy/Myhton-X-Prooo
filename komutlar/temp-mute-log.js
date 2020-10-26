const Discord = require('discord.js')
const db = require('quick.db');
 
exports.run = async (client, message, args) => {
 
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
  .setColor("ORANGE")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`mlog_${message.guild.id}`)
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`Mute Log Kanalı zaten ayarlı değil.`)
                     
      return
    }
    db.delete(`mlog_${message.guild.id}`)
    message.channel.send(`Mute Log Kanalını başarıyla sıfırladım.`)
               
    return
  }
  if (!mlog) {
    return message.channel.send(
    `Mute Log Olarak ayarlayacağın Kanalı etiketlemelisin.`)                      
  }
  db.set(`mlog_${message.guild.id}`, mlog.id)
  message.channel.send(`Mute Log Kanalı başarıyla ${mlog} kanalı olarak ayarlandı.`)
  };
   
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mute-log'],
    permLevel: 0
}
 
exports.help = {
    name: 'mute-log-ayarla',
    description: 'Mute Logu Ayarlar.',
    usage: '-mute-log #kanal'
}