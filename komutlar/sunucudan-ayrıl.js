const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
let sunucuid = args[0]
    if (!sunucuid) return message.channel.send(`⛔ Sunucunun ID'sini yazmalısın.`).then(msg => msg.delete(10000))
         message.delete()
  const gven1 = client.emojis.get('672070463999967249')
  const yanl = client.emojis.get('671778030670053415')
  if (message.author.id !== ayarlar.sahip) return message.reply(`Yapımcım Sen Değilsin ${yanl} `);
   message.channel.send(`  **Bot Sunucudan Ayrıldı** ${gven1}`);
   client.guilds.get(sunucuid).leave()
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ayrıl'],
  permLevel: 4,
  kategori: "yapımcı"
};

exports.help = {
  name: 'ayrıl',
  description: 'Bot Sunucudan Ayrılır.',
  usage: 'ayrıl'
}; 