const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
 
  let pages = [
              '**Bot Hakkında Kısa Bilgı**\n\n\n  **`g!`yardım = yazarak komutları göre bilirsiniz** \n  **`g!`davet = yazarak sunucunuza davet edebılırsınız** \n  **`g!`ailemiz = Yazarak Botun Hangı Sunucuda Bulundugunu Ogrene bılırsınız**',
              '**Kullanıcı Ve Eğlence**\n\n\n  **`g!`8ball = Sorularınızı Yanıtlar** \n **`g!`aşkölçer = Aşkınızı Ölçer.** \n **`g!`çekiç = Çekiç Atarsınız.** \n  **`g!`çayiç = Çay İçersiniz **\n **`g!`döviz = Dövizlere Bakarsınız** \n **`g!`wwegif = Rast Gele Gif Gonderır** \n **`g!`çekiliş = Sunucunuzda Çekiliş Yaparsınız** \n **`g!`mcödül = Ödül Kazanarsınız ** \n **`g!`dcnitro = Avatarınıza Nıtro Ekler** \n **`g!`stresçarkı = Stres Atarsınız ** \n **`g!`invert = Avatarınızın Rengini Ters Renk Yapar** \n **`g!`wasted = Avatarınıza Wasted Effekti Yapar** \n **`g!`top10 = Botun 10 Sunucuda Ne Yaptıgını Gosterır** \n **`g!`yaz = Bota Bir Sey Yazarsınız** \n ',
              '**Müzik**\n\n\n' + '``-``  .oynat = Youtubeda İstediğiniz Bir Şarkıyı Aratır Ve Oynatır. \n``-``  .duraklat = Oynatılan Şarkıyı Devam Etmek Üzere Durdurur. \n``-``  .devamet = Duraklatılan Şarkıyı Devam Ettir. \n``-``  .geç = Oynatılan Şarkıyı Geçer. \n``-``  .kuyruk = Kuyruk’ta Olan Müzikleri Gösterir. \n``-``  .çalan = Oynatılan Müziği Gösterir. \n``-``  .ses = Ses Seviyesini Ayarlarsınız.',
              '**Çerçeve/Profil**\n\n\n ' + '``-``  .hacked = Profilinize ``hacked`` Efekti Verir. \n``-``  .triggered = Profilinize ``triggered`` Efekti Verir. \n``-``  .wasted = Profilinize ``wasted`` Efekti Verir. \n``-``  .winner = Profilinize ``winner`` Efekti Verir. \n``-``  .sniper = Profilinize ``sniper`` Efekti Verir. \n``-``  .hpbalance = Profilinize ``hypesquad balance`` Efekti Verir. \n``-``  .hpbravery = Profilinize ``hypesquad bravery`` Efekti Verir. \n``-``  .hpbrilliance = Profilinize ``hypesquad brilliance`` Efekti Verilir. \n``-``  .dcbughunter = Profilinize ``bug hunter`` Efekti Verir. \n``-``  .hpevent = Profilinize ``hypesquad`` Efekti Verir. \n``-``  .dcpartner = Profilinize ``partner`` Efekti Verir. \n``-``  .dcstaff = Profilinize ``staff`` Efekti Verir. \n``-``  .atatürk = Profilinize ``atatürk`` Efekti Verir.',
              '**Bot Bilgi**\n\n\n' + '``-``  .davet = Bot İle İlgili Bağlantıları Görürsünüz. \n``-``  .ping = Botun Pingini Gösterir. \n``-``  .istatistik = Bo n İstatistiklerini Gösterir.',
              ];
  let page = 1;
 
  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail('https://cdn.discordapom/attachments/487719679868272689/488329963926192158/image0.png')
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {
 
  msg.react('⬅')
  .then(r => {
    msg.react('➡')
 
      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
 
      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setColor('RANDOM')
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setColor('RANDOM')
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
 
    })
  })
};
 
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["sjadklsjdskljdasljdlkjdksalkdjslajd", "skdlşkdşaskdlşkdşalskdsa", "dklsdklsaşkdaskdaşdkas"],
permLevel: 0
};
 
exports.help = {
name: 'sdsadsadasdasdsadsadsaasdasdasdas',
description: 'Yardım Listesini Gösterir',
usage: 'sdsadsdasdsadadsadas'
};
