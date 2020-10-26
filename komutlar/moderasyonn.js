const Discord = require('discord.js');
const loglar = require('../ayarlar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const eğlence = new Discord.RichEmbed()
  .setColor("ORANGE")
      .setAuthor(`Moderasyon Menüsü Botun rolünü üste almayı unutmayın!`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
.addField("<a:eki:751021964876841081>| `m!küfür-engel aç/kapat` ", "Üyelerin küfür etmesini engeller.")
.addField("<a:eki:751021964876841081>| `m!oto-rol` ", "Oto rol sistemini açarsınız.")
.addField("<a:eki:751021964876841081>| `m!anti-raid aç/kapat` ", "Sunucuya bot eklenmesini engeller.")
.addField("<a:eki:751021964876841081>| `m!bot-izini ver/kaldır` ", "Anti Raid sistemi bot izin sistemi.")
.addField("<a:eki:751021964876841081>| `m!fakehesap-sistemi` ", "Sunucunuza gelen fake hesapları önler.")
.addField("<a:eki:751021964876841081>| `m!ban-limit` ","Ban limit ayarlar sınırı aşanların yetkileri alınır.")
.addField("<a:eki:751021964876841081>| `m!ban-limit-sıfırla` ","Ban limit sıfırlar.")
.addField("<a:eki:751021964876841081>| `m!backup` ","Sunucunuzu yedeklersiniz.")
.addField("<a:eki:751021964876841081>| `m!slowmode` ","Kanalda yavaş mod açar.")
.addField("<a:eki:751021964876841081>| `m!kanal-kilitle` ", "Kanalınızı süreli kilitler.")
.addField("<a:eki:751021964876841081>| `m!reklam-taraması` ", "Üyelerin durumundaki reklamları tarar.")
.addField("<a:eki:751021964876841081>| `m!emoji-kur` ","Sunucunuza emoji kurar.")
.addField("<a:eki:751021964876841081>| `m!mute-log` ", "Berlittiğinz kanalı mute log kanalı ayarlar.")
.addField("<a:eki:751021964876841081>| `m!özel-komut ekle/sil` ", "Sunucuya özel komut ekler.")
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
  name: 'moderasyon',
  description: 'Komut kategorilerini gösterir.',
  usage: 'moderasyon'
};