const express = require("express");
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const http = require("http");
require("./util/eventLoader")(client);
const app = express();
const db = require("quick.db");
app.get("/", (request, response) => {
  console.log(Date.now() + " Bot Artık Aktif!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 1000 * 60 * 3);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);









client.on("guildCreate", async function(guild) {
    const owner = client.users.get(guild.ownerID)
    const kanal = "751914186254319616" //Eklendim mesajının atılacağı kanal ID'sini giriniz.
    const GuapoBot = new Discord.RichEmbed()
    .setTitle(`Yeni bir sunucuya eklendim `)
    .setColor("ORANGE")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount)
    client.channels.get(kanal).send({embed: GuapoBot}).catch(err => console.log("Kanala mesaj atamıyorum!"))
    })
    //
     
    //Atıldım
    client.on("guildDelete", async function(guild) {
    const owner = client.users.get(guild.ownerID)
    const kanal = "751914186254319616" //Atıldım mesajının atılacağı kanal ID'sini giriniz.
    const GuapoBot = new Discord.RichEmbed()
    .setTitle(`Bir sunucudan atıldım `)
    .setColor("ORANGE")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount)
    client.channels.get(kanal).send({embed: GuapoBot}).catch(err => console.log("Kanala mesaj atamıyorum!"))
    })

//guardsistemiymiş





//banlimit

client.on("guildBanAdd", async (guild, user) => {

  if (!db.has(`banlimit_${guild.id}`)) return;

  let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});

  if (logs.entries.first().executor.bot) return;

  const kisi = logs.entries.first().executor

  const member = guild.members.get(kisi.id)

  if (member.hasPermission('ADMINISTRATOR')) return;

  let banlimit = db.fetch(`banlimit_${guild.id}`)

  if (isNaN(banlimit)) return;

  banlimit = banlimit + 1

  if (!db.has(`bansayi_${member.id}_${guild.id}`)) {

    if (banlimit == 1) {

      var array = member.roles.filter(role => role.name !== "@everyone").array()

      for (const role of array) member.removeRole(role.id)

    }else{

      db.set(`bansayi_${member.id}_${guild.id}`, 1)

    }

  }else{

    const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`)

    if (bansayisi >= banlimit) {

      db.delete(`bansayi_${member.id}_${guild.id}`)

      var array = member.roles.filter(role => role.name !== "@everyone").array()

      for (const role of array) member.removeRole(role.id)

    }

  }

})


//bankorumarolkorumarollimitbanlimit

client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    if (!rol) {
      guild.unban(user.id);
      guild.members.get(entry.executor.id).kick();
      const embed = new Discord.RichEmbed()
        .setTitle(`Biri Yasaklandı!`)
        .setColor("BLACK")
        .addField(`Yasaklayan`, entry.executor.tag)
        .addField(`Yasaklanan Kişi`, user.name)
        .addField(
          `Sonuç`,
          `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
        );
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limido_${entry.executor.id}`);
        let slimito = await db.fetch(`slimido_${guild.id}`);
        if (slimito == limito || slimito > limito) {
          db.delete(`limido_${entry.executor.id}`);
          guild.unban(user.id);
          guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`Biri Yasaklandı!`)
            .setColor("BLACK")
            .addField(`Yasaklayan`, entry.executor.tag)
            .addField(`Yasaklanan Kişi`, user.name)
            .addField(
              `Sonuç`,
              `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!\nNOT: LİMİTİ AŞTI!`
            );
          client.channels.get(kanal).send(embed);
        } else {
          db.add(`limido_${entry.executor.id}`, +1);
          const embed = new Discord.RichEmbed()
            .setTitle(`Biri Yasaklandı!`)
            .setColor("BLACK")
            .addField(`Yasaklayan`, entry.executor.tag)
            .addField(`Yasaklanan Kişi`, user.name)
            .addField(
              `Sonuç`,
              `Yasaklayan kişi ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        guild.unban(user.id);
        guild.members.get(entry.executor.id).kick();
        const embed = new Discord.RichEmbed()
          .setTitle(`Biri Yasaklandı!`)
          .setColor("BLACK")
          .addField(`Yasaklayan`, entry.executor.tag)
          .addField(`Yasaklanan Kişi`, user.name)
          .addField(
            `Sonuç`,
            `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
          );
        client.channels.get(kanal).send(embed);
      }
    }
  }

  ///////////////////////////////////////
  else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    if (!rol) {
      guild.unban(user.id);
      guild.members.get(entry.executor.id).kick();
      const embed = new Discord.RichEmbed()
        .setTitle(`One Banned!`)
        .setColor("BLACK")
        .addField(`Banner`, entry.executor.tag)
        .addField(`Banned Person`, user.name)
        .addField(
          `Sonuç`,
          `The ban has been opened from the server!\nand the ban has been lifted!`
        );
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limido_${entry.executor.id}`);
        let slimito = await db.fetch(`slimido_${guild.id}`);
        if (slimito == limito || slimito > limito) {
          guild.unban(user.id);
          guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`One Banned!`)
            .setColor("BLACK")
            .addField(`Banner`, entry.executor.tag)
            .addField(`Banned Person`, user.name)
            .addField(
              `Result`,
              `The ban has been opened from the server!\and the ban has been lifted!\nNOTE: EXCEEDED!`
            );
          client.channels.get(kanal).send(embed);
        } else {
          const embed = new Discord.RichEmbed()
            .setTitle(`One Banned!`)
            .setColor("BLACK")
            .addField(`Banner`, entry.executor.tag)
            .addField(`Banned Person`, user.name)
            .addField(
              `Result`,
              `The ban has reached the limit of ${limito}/${slimito}!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        guild.unban(user.id);
        guild.members.get(entry.executor.id).kick();
        const embed = new Discord.RichEmbed()
          .setTitle(`One Banned!`)
          .setColor("BLACK")
          .addField(`Banner`, entry.executor.tag)
          .addField(`Banned Person`, user.name)
          .addField(
            `Result`,
            `The ban has been opened from the server!\nand the ban has been lifted!`
          );
        client.channels.get(kanal).send(embed);
      }
    }
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild
        .createRole({
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
        })
        .then(r => r.setPosition(role.position));

      const embed = new Discord.RichEmbed()
        .setTitle(`Bir Rol Silindi!`)
        .setColor("BLACK")
        .addField(`Silen`, entry.executor.tag)
        .addField(`Silinen Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Açıldı!`);
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.guild
            .createRole({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(`Sonuç`, `Rol geri açıldı! Rolü silen sunucudan atıldı!`);
          client.channels.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.guild
            .createRole({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(
              `Sonuç`,
              `Rol geri açılamadı! Rolü silen ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        role.guild
          .createRole({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(r => r.setPosition(role.position));

        const embed = new Discord.RichEmbed()
          .setTitle(`Bir Rol Silindi!`)
          .setColor("BLACK")
          .addField(`Silen`, entry.executor.tag)
          .addField(`Silinen Rol`, role.name)
          .addField(`Sonuç`, `Rol Geri Açıldı!`);
        client.channels.get(kanal).send(embed);
      }
    }
  } else {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild
        .createRole({
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
        })
        .then(r => r.setPosition(role.position));

      const embed = new Discord.RichEmbed()
        .setTitle(`A Role Deleted!`)
        .setColor("BLACK")
        .addField(`Role Deleter`, entry.executor.tag)
        .addField(`Deleting Role`, role.name)
        .addField(`Result`, `Role Back A Open!`);
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.guild
            .createRole({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`A Role Deleted!`)
            .setColor("BLACK")
            .addField(`Role Deleter`, entry.executor.tag)
            .addField(`Deleting Role`, role.name)
            .addField(
              `Result`,
              `Role Back A Open! Role Deleter Kicking Has Guild!`
            );
          client.channels.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.guild
            .createRole({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`A Role Deleted!`)
            .setColor("BLACK")
            .addField(`Role Deleter`, entry.executor.tag)
            .addField(`Deleting Role`, role.name)
            .addField(
              `Result`,
              `The role could not be turned back! Reached ${limito}/${slimito} limit, which opens the role!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        role.guild
          .createRole({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(r => r.setPosition(role.position));

        const embed = new Discord.RichEmbed()
          .setTitle(`A Role Deleted!`)
          .setColor("BLACK")
          .addField(`Role Deleter`, entry.executor.tag)
          .addField(`Deleting Role`, role.name)
          .addField(`Result`, `Role Back A Open`);
        client.channels.get(kanal).send(embed);
      }
    }
  }
});

//küfürengelmiş

client.on("message", async msg => {
  
  
  const i = await db.fetch(`kufur_${msg.guild.id}`)
     if (i == "acik") {
         const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
         if (kufur.some(word => msg.content.includes(word))) {
           try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                           
                       return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
             }              
           } catch(err) {
             console.log(err);
           }
         }
     }
     if (!i) return;
 });
 
 client.on("messageUpdate", (oldMessage, newMessage) => {
   
   
  const i = db.fetch(`${oldMessage.guild.id}.kufur`)
     if (i) {
         const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq", "a m k", "A M K", "aM K", "aM k", "aM", "am K", "AM K", "Am K", "p i ç", "M K", "m k", "AM k", "AMQ", "Amq", "amQ", "am k", "a mk", "a MK", "A mK", "A MK", "A Mk", "a Mk", "a mK", "P İ Ç", "P i Ç", "aMk",];
         if (kufur.some(word => newMessage.content.includes(word))) {
           try {
             if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                   oldMessage.delete();
                           
                       return oldMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
             }              
           } catch(err) {
             console.log(err);
           }
         }
     }
     if (!i) return;
 });



  //özelkomutekle

  client.on("message", async message => {
    if (message.channel.type === "dm" || !message.content.startsWith(ayarlar.prefix)) return;
    let ozelkomutlar = db.get(`ozelkomut.${message.guild.id}`);
    if (!ozelkomutlar || ozelkomutlar.length == 0) return;
    let komut = message.content.slice(ayarlar.prefix.length);
    // !test test
    let ozelKomut = ozelkomutlar.find(a => a.isim === komut);
    if (!ozelKomut) return;
    else {
      message.channel.send(ozelKomut.cevap);
    };
  });

//banlimit

client.on("guildBanAdd", async (guild, user) => {

    if (!db.has(`banlimit_${guild.id}`)) return;
  
    let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
  
    if (logs.entries.first().executor.bot) return;
  
    const kisi = logs.entries.first().executor
  
    const member = guild.members.get(kisi.id)
  
    if (member.hasPermission('ADMINISTRATOR')) return;
  
    let banlimit = db.fetch(`banlimit_${guild.id}`)
  
    if (isNaN(banlimit)) return;
  
    banlimit = banlimit + 1
  
    if (!db.has(`bansayi_${member.id}_${guild.id}`)) {
  
      if (banlimit == 1) {
  
        var array = member.roles.filter(role => role.name !== "@everyone").array()
  
        for (const role of array) member.removeRole(role.id)
  
      }else{
  
        db.set(`bansayi_${member.id}_${guild.id}`, 1)
  
      }
  
    }else{
  
      const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`)
  
      if (bansayisi >= banlimit) {
  
        db.delete(`bansayi_${member.id}_${guild.id}`)
  
        var array = member.roles.filter(role => role.name !== "@everyone").array()
  
        for (const role of array) member.removeRole(role.id)
  
      }
  
    }
  
  })
  
  //anti-raid

  //BOT ENGEL,anti-baskın yada anti-raid
client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  var cod = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let are = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setThumbnail(member.user.avatarURL)
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **${prefix}bot-izini kaldır botun_id**.`);
    cod.send(are);
     } else {
       let izinverilmemişbot = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setThumbnail(member.user.avatarURL)
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" + prefix + "bot-izini ver botun_id**")
       member.ban();
       cod.send(izinverilmemişbot)
}
  }
});

//otorol

client.on('guildMemberAdd', async (member) => {
  if(db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`)
    var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
    var tarih = moment(member.user.createdAt).fromNow()
    member.addRole(rolID)
  } else {
    return;
  }
  if(db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.get(db.fetch(`${member.guild.id}_otokanal`))
    const artemuscode = new Discord.RichEmbed()
    .setColor('ORANGE')
    .setDescription(`${member} Sunucumuza Hoşgeldin <@&${rolID}> Oto rolünü başarıyla verdim!. \n\n Hesap oluşturulma tarihi! : ${tarih} `)
    .setThumbnail(member.user.avatarURL)
    kanal.send(artemuscode)
  } else {
    return;
  }
})


client.on('message', async message => {// Highlight
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  data.set(`songörülme.${message.author.id}.${message.guild.id}`, Date.now()+ms('1s'));
  message.guild.members.forEach(async nbr => {
  let member = nbr;
  const mb = await data.fetch(`var.${message.author.id}.${member.user.id}`);
  if(mb) return;
  const songörülme = await data.fetch(`songörülme.${member.user.id}.${message.guild.id}`);
  if(songörülme < Date.now()) {
  const kelimeler = await data.fetch(`.kelimeler.${message.guild.id}.${member.user.id}`);
  let d = [];
  console.log(kelimeler)
  if(kelimeler) {
  kelimeler.forEach(s => {
  d.push(s.target);
  })
  console.log(d.some(a => message.content.includes(a)));
  let split = message.content.split(' ');
  let dm;
  split.forEach(m => {
  if(d.some(s => message.content.includes(m))) {
  dm = m;
  }
  })
  if(d.some(a => message.content.includes(a)) == true) {
  const blocked = data.fetch(`blocked.${message.guild.id}.${member.user.id}`);
  if(blocked && blocked.some(a => a.blockChannel === message.channel.id)) return;
  if(blocked && blocked.some(a => a.blockUser === message.author.id)) return;
  
  message.channel.fetchMessages({ limit: 5 }).then(messages => {
  let word = dm;
  const embed = new Discord.RichEmbed().setTitle(word).setColor('#ffcb5b').setFooter('Triggered').setTimestamp();
  member.send(`In, **${message.guild.name}** ${message.channel}, you were mentioned with highlight word "${word}"`, embed.setDescription(messages.map(a => `**[${moment(a.createdAt).format('HH:mm:ss')}] ${a.author.username}:** ${a.content}`).reverse().join('\n')).addField('Source message', `[Jump to](${message.url})`))
  data.set(`var.${message.author.id}.${member.user.id}`, 'nbr');
  setTimeout(() => {
  data.delete(`var.${message.author.id}.${member.user.id}`);
  }, 1000)
  //
  })
  }}}})})// codare

  //randomgifpp 

client.on("userUpdate", async(oldCAD, newCAD) => {
  if(oldCAD.avatarURL === newCAD.avatarURL) return;
  let cadNORMAL = "762606246993854475"; // Normal PP'lerin Atılacağı Kanal ID'si
  let cadGIF = "762565841656348702"; // Gif PP'lerin Atılacağı Kanal ID'si
  let cadPP = (newCAD.avatarURL).split("?")[0];
  if((cadPP).endsWith(".gif")) {
    client.channels.get(cadGIF).send(new Discord.Attachment(cadPP));
  } else {
    client.channels.get(cadNORMAL).send(new Discord.Attachment(cadPP));
  };
});

//fakehesapsistem

client.on("guildMemberAdd", async (member, message, msg) => {
  const fakehesapp = db.get(`fake_${member.guild.id}`);

  if (fakehesapp == "açık") {
    var moment = require("moment");
    require("moment-duration-format");
    moment.locale("tr");
    var { Permissions } = require("discord.js");
    var x = moment(member.user.createdAt)
      .add(20, "days")
      .fromNow();
    var user = member.user;
    x = x.replace("birkaç saniye önce", " ");
    if (!x.includes("önce") || x.includes("sonra") || x == " ") {
      let rol = db.get(`fakerol_${member.guild.id}`);

      member.user.send(
        "Hesabınız 20 günden önce açıldığı için cezalıya atıldınız, yetkililere bildirerek açtırabilirsiniz."
      );

      ////////////////
      let kanalcık = await db.fetch(`fakekanal_${member.guild.id}`);
      let kanal = member.guild.channels.find(r => r.id === kanalcık);
      ////////////////
      const embedd = new Discord.RichEmbed()

        .setTitle("Fake hesap yakalandı!!")
        .setTimestamp()
        .setDescription(
          `Bir fake hesap sisteme yakalandı ve rolü verildi. **${member}**`
        )

        .setTimestamp()
        .setColor("AQUA");
      kanal.send(embedd);
      member.addRole(rol);
    } else {
    }
  }
});

//statkomut

client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye -"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye -"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar -"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik -"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye - ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye - ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar - ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik - ${rekoronline}`)
   } catch(e) { }
  }
})

client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye -"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye -"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar -"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik -"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye - ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye - ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar - ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik - ${rekoronline}`)
   } catch(e) { }
  }
})
//DarkCode
client.on("voiceStateUpdate", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye -"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye -"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar -"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik -"))
    let seste = member.guild.channels.find(x =>(x.name).startsWith("Sesli -"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    //DarkCode
    try{
      toplamuye.setName(`Toplam Üye - ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye - ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar - ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik - ${rekoronline}`)
      seste.setName(`Sesli - ${member.guild.members.filter(a => a.voiceChannel).size}`)
   } catch(e) { }
  }
})
//DarkCode
client.on("guildBanAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik -"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    //DarkCode
    try{
      toplamuye.setName(`Toplam Üye - ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye - ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar - ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik - ${rekoronline}`)
   } catch(e) { }
  }
})
//DarkCode


client.login(ayarlar.token);

