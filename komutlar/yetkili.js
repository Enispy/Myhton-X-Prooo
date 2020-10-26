const Discord = require('discord.js');
const loglar = require('../ayarlar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const eğlence = new Discord.RichEmbed()
  .setColor("ORANGE")
      .setAuthor(`Yetkili Menüsü Bakım!`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
.addField("<a:parlak:751016623833350204>| `m!force-ban` ","Sunucuda olmayan kişiyi banlar.")
.addField("<a:parlak:751016623833350204>| `m!temp-ban` ", "Etiketlediğiniz kişiyi süreli banlar.")
.addField("<a:parlak:751016623833350204>| `m!ban` ","Etiketlediğiniz kişiyi engeller.")
.addField("<a:parlak:751016623833350204>| `m!kick` ", "Etiketlediğiniz kişiyi sunucudan atar.")
.addField("<a:parlak:751016623833350204>| `m!temp-mute` ", "Etiketlediğiniz kişiyi süreli susturur.")
.addField("<a:parlak:751016623833350204>| `m!mute` ", "Etiketlediğiniz kişiyi susturur.")
.addField("<a:parlak:751016623833350204>| `m!un-ban` ", "İD sini girdiğiniz kişinin banını kaldırır.")
.addField("<a:parlak:751016623833350204>| `m!un-mute` ", "Etiketlediğiniz kişinin mutesini kaldırır.")
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
  name: 'yetkili',
  description: 'Komut kategorilerini gösterir.',
  usage: 'yetkili'
};