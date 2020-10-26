const Discord = require('discord.js');
const loglar = require('../ayarlar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {
  
  const eğlence = new Discord.RichEmbed()
  .setColor("ORANGE")
      .setAuthor(`Genel Menüsü Bakım!`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
.addField("<a:emoji_31:757353112934809660>| `m!avatar` ","Eğlence Komut Görebilirsiniz.")
.addField("<a:emoji_31:757353112934809660>| `m!istatistik` ","Botun istatistiklerini gösterir.")
.addField("<a:emoji_31:757353112934809660>| `m!canlı-destek`","Bot canlı destek.")
.addField("<a:emoji_31:757353112934809660>| `m!öneri`","Bot için önerii yaparsınız.")
.addField("<a:emoji_31:757353112934809660>| `m!kullanıcı-bilgisi`","Etiketlediğiniz kişinin bilgilerini gösterir.")
.addField("<a:emoji_31:757353112934809660>| `m!komutlar`","Botda olan komutları gösterir.")
.addField("<a:emoji_31:757353112934809660>| `m!link-kısalt`","İstediğiniz linki kısaltır.")
.addField('Myhton-X Pro :',`[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=718937676388237394&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/mNd4kSt)`)


return message.channel.sendEmbed(eğlence);

};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'genel',
  description: 'Komut kategorilerini gösterir.',
  usage: 'genel'
};