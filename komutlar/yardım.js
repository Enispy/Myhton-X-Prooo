const Discord = require('discord.js');
const loglar = require('../ayarlar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const eğlence = new Discord.RichEmbed()
  .setColor("ORANGE")
      .setAuthor(`Yardım Menüsü!`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
.addField("<a:rainbowtada:685034702700412929>| `m!eğlence` ","Eğlence Komut Görebilirsiniz")
.addField("<a:parlak:751016623833350204>| `m!yetkili` ","Yetkili Komutlarını Görebilirsiniz")
.addField("<a:eki:751021964876841081>| `m!moderasyon`"," Moderasyon komutlarını gösterir")
.addField("<a:emoji_31:757353112934809660>| `m!genel` ","Herkesin Kullanabileceği komutlar")
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
  name: 'yardım',
  description: 'Komut kategorilerini gösterir.',
  usage: 'eğlence'
};

