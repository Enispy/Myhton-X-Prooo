const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let panel = await db.fetch(`sunucupanel_${message.guild.id}`) 
  let rekoronline = await db.fetch(`panelrekor_${message.guild.id}`)
   {
    db.delete(`sunucupanel_${message.guild.id}`)
    db.delete(`panelrekor_${message.guild.id}`)
  try{
    message.guild.channels.find(x =>(x .name).includes("STATS")).delete()
    message.guild.channels.find(x =>(x .name).includes("Toplam Üye -")).delete()
    message.guild.channels.find(x =>(x .name).includes("Aktif Üye -")).delete()
    message.guild.channels.find(x =>(x .name).includes("Botlar -")).delete()
    message.guild.channels.find(x =>(x .name).includes("Rekor Aktiflik -")).delete()
  } catch(e) { }
    message.channel.send(`Ayarlanan sunucu paneli başarıyla devre dışı bırakıldı!`)
   return 
  }

  if(!panel) return message.channel.send(`Bu sunucuda panel zaten ayarlanmamış! Oluşturmak bırakmak için;  \`${prefix}kurulum\``)
  

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["stats-kapat"],
  permLevel: 3
};

exports.help = {
  name: 'statskapat',
  description: 'Sunucu İstatistiklerini Gösteren Paneli Siler.',
  usage: 'statskapat',
  kategori: 'yetkili'
};