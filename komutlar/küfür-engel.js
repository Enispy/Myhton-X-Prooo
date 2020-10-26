const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client ,message, args) =>{
  if (!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send("Bu komutu kullanabilmek için `Üyeleri yasakla` yetkisine sahip olmanız gerek")

  
if(args[0] === 'aç') {
    db.set(`kufur_${message.guild.id}`, "acik")
    message.channel.send('Küfür engel başarılı Şekilde `Açıldı`.')
  return
}
if (args[0] === 'kapat') {
  db.delete(`kufur_${message.guild.id}`)
message.channel.send('Küfür engel başarılı Şekilde `Kapatıldı` ')
return
}
  message.channel.send('Lüten m!küfür-engel aç/kapat yazınız!')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['küfür'],
 permLevel: 0
};

exports.help = {
 name: 'küfür-engel',
 description: 'Davet Log Kanalını Belirler',
 usage: 'davet-kanal-ayarla #kanal'
};