const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

exports.run = async (bot, message, args) => {
  
  const db = require('quick.db');
  
  
  
  var m = await message.channel.send(`İstatistikler yükleniyor...`)
  
  var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
      
      setTimeout(() => {
        const s = new Discord.RichEmbed()
        .setColor("ORANGE")
        .setAuthor(`${bot.user.username} | İstatistik menüsü`, bot.user.avatarURL)
        .addField('<:ping:758634800122429470> Gecikme süreleri', "Mesaj Gecikmesi: {ping1} milisaniye \nBot Gecikmesi: {ping2} milisaniye".replace("{ping1}", new Date().getTime() - message.createdTimestamp).replace("{ping2}", bot.ping), true)
        .addField('<:mzl:758630005579448322> Çalışma süresi', `${duration}`, true)
        .addField('<:virs:758633444698882058> Genel veriler', stripIndents`
        **Müzik Çalınan Sunucu Sayısı:** ${bot.voiceConnections.size.toLocaleString()}
        **Kullanıcı Sayısı:**  ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
        **Sunucu Sayısı:** ${bot.guilds.size.toLocaleString()}
        **Kanal Sayısı:** ${bot.channels.size.toLocaleString()}
        **Botun Yapımcısı** 
        ! Muhammed#0001  510813083548254208
        `, true)
        .addField('<:gvnli:758622346805772288> Versiyonları', stripIndents`
        **Discord.JS sürümü** v${Discord.version}
        **NodeJS sürümü** ${process.version}
        `, true)
        .addField('<:ram:758628982173728798> Kullanılan bellek boyutu', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .addField('<:isletim:758632660728807424> İşletim sistemi', `${osType} ${osBit}`, true)
        
        .addField('<:cpu:758630999898062848> İşlemci', `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
        .addField('Myhton-X Pro :',`[Botu Davet Et(yetkili)](https://discord.com/oauth2/authorize?client_id=718937676388237394&scope=bot&permissions=8) **|** [Botu Davet Et(yetkisiz)](https://discord.com/oauth2/authorize?client_id=718937676388237394&scope=bot&permissions=0) **|** [Destek Sunucusu](https://discord.gg/mNd4kSt)`)
        .setImage(`https://cdn.discordapp.com/attachments/751897460749762624/762604661982625802/standard_15_1.gif`)

        return m.edit(s)
        
        }, 3000)
        
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['istatistik'],
    permLevel: 0,
    kategori: "bot",
 
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik',
  
  };