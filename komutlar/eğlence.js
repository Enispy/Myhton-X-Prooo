const Discord = require('discord.js');
const loglar = require('../ayarlar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const eğlence = new Discord.RichEmbed()
  .setColor("ORANGE")
      .setAuthor(`Eğlence Menüsü Bakım!`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
.addField("<a:rainbowtada:685034702700412929>| `m!adam-ol` ","Adam olursunuz.")
.addField("<a:rainbowtada:685034702700412929>| `m!kral-ol` ","Kral olursunuz.")
.addField("<a:rainbowtada:685034702700412929>| `m!aşk-ölç` ", "Aranızaki aşkı ölçer.")
.addField("<a:rainbowtada:685034702700412929>| `m!aduket` ", "Aduket çekersiniz")
.addField("<a:rainbowtada:685034702700412929>| `m!wasted` ","Logonuza Wasted yazısı koyar.")
.addField("<a:rainbowtada:685034702700412929>| `m!kalp-logo` ", "Kalpli Logo yaparsınız.")
.addField("<a:rainbowtada:685034702700412929>| `m!öp` ", "İstediğin kişiyi öpersin.")
.addField("<a:rainbowtada:685034702700412929>| `m!tokat-at` ", "İstediğin kişiyi tokatlarsın.")
.addField('Myhton-X Pro :',`[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=718937676388237394&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/bD9ubQY)`)



return message.channel.sendEmbed(eğlence);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'eğlence',
  description: 'Komut kategorilerini gösterir.',
  usage: 'eğlence'
};