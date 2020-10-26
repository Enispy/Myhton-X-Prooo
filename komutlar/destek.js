const Discord = require('discord.js')
exports.run = async(client, message, args) => {
  
  
const emoji1 = message.client.emojis.get('📞');
const emoji2 = message.client.emojis.get('📞');
const emoji3 = message.client.emojis.get('📞');
const emoji4 = message.client.emojis.get('📞');
const emoji5 = message.client.emojis.get('📞');
const emoji6 = message.client.emojis.get('📞');
const emoji7 = message.client.emojis.get('📞');
      let isEnabled;
      message.reply("Yetkili ekibimiz en kısa sürede sizinle ilgileneektir beklemede kalın!");
      let mesaj = args.slice(0).join(' ');
      let chan = message.channel;
      let destekKanal = "757734531255107665";
      const embed = new Discord.RichEmbed()
        .addField('Uyarı', ` Yeni canlı destek bağlantısı!`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
        .setColor("RANDOM")
        .addField(`Bilgiler`, `**Sunucu**: ${message.guild.name} (${message.guild.id}) \n**Kanal**: ${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id}) \n**Destek Mesajı**: ${mesaj}`)
        .setFooter("Canlı Destek")
        .setTimestamp()
      client.channels.get(destekKanal).send({
        embed: embed
      });
    const collector = client.channels.get(destekKanal).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    client.channels.get(destekKanal).send('Destek çagrısı bağlanmak için `katıl` yazınız @everyone . İptal Etmek İçin `kapat` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('Destek çağrısının bağlantısı koptu!.')
      if (reason === 'aborted') {
        message.reply('Çağrı reddedildi.')
        client.channels.get(destekKanal).send('Destek Çağrısı RED edildi')
      }
      if (reason === 'success') {
        client.channels.get(destekKanal).send('Destek çağrısına katıldın!')
        client.channels.get(destekKanal).send('Destek çağrısını kapatmak için `kapat` yazmalısın')
        chan.send(`${message.author}`)
        chan.send('Destek bağlantınız kuruldu!')
        chan.send('Yetkili ekibimiz size en kısa sürede yardımcı olacaktır!')
        chan.send('Destek bağlantısını kapatmak için `kapat` yazmalısın.')
        isEnabled = true
        client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send('Destek Bağlantısı kapatıldı!')
              if (message.channel.id === chan.id) client.channels.get(destekKanal).send('Kullanıcı destek bağlantısını kapattı!')
              if (message.channel.id === destekKanal) chan.send('Yetkili destek bağlantısını kapattı!')
              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(destekKanal).send(`Kullanıcı:**${message.author.tag}** Mesajı:**${message.content}**`)
            if (message.channel.id === destekKanal) chan.send(`Yetkili:**${message.author.tag}** Mesajı:**${message.content}**`)
          }
          contact(client)
        })
      }
    })
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'canlı-destek',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: 'canlı-destek'
};
