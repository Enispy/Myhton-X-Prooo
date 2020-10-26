const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!"
    );
  let panel = await db.fetch(`sunucupanel_${message.guild.id}`);
  let rekoronline = await db.fetch(`panelrekor_${message.guild.id}`);

  if (panel)
    return message.channel.send(
      `Bu sunucuda panel zaten ayarlanmış! Devredışı bırakmak için;  \`${prefix}statskapat\``
    );

  message.channel
    .send(
      new Discord.RichEmbed()
        .setColor("ORANGE")
        .setTitle("STATS")
        .setDescription("Gerekli dosaylar kurulsun mu?.")
        .setFooter('Onaylıyorsan 15 saniye içerisinde evet yazmalısın.')
    )
    .then(() => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 15000,
          errors: ["time"]
        })
        .then(collected => {
          db.set(`sunucupanel_${message.guild.id}`, message.guild.id);
          try {
            let role = message.guild.roles.find("name", "@everyone");
            message.guild.createChannel(`STATS`, "category", [
              { id: message.guild.id, deny: ["CONNECT"] }
            ]);
            message.guild
              .createChannel(
                `Toplam Üye - ${message.guild.members.size}`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `STATS`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            message.guild
              .createChannel(
                `Aktif Üye - ${
                  message.guild.members.filter(
                    off => off.presence.status !== "offline"
                  ).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `STATS`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            message.guild
              .createChannel(
                `Botlar - ${
                  message.guild.members.filter(m => m.user.bot).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `STATS`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            message.guild
              .createChannel(
                `Rekor Aktiflik - ${
                  message.guild.members.filter(
                    off => off.presence.status !== "offline"
                  ).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `STATS`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });
            message.guild
              .createChannel(
                `Sesli - ${
                  message.guild.members.filter(a => a.voiceChannel).size
                }`,
                "voice"
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === `STATS`
                  )
                )
              )
              .then(c => {
                c.overwritePermissions(role, {
                  CONNECT: false
                });
              });

            db.set(
              `panelrekor_${message.guild.id}`,
              message.guild.members.filter(
                off => off.presence.status !== "offline"
              ).size
            );

            message.channel.send(
              `Kurulum Tamamdır! Destek Sunucuma Gelmeyi Unutmayın! Oda İsimleri Ve Kategori İsimleri Değişirse Sıkıntı Çıkabilir`
            );
          } catch (e) {
            console.log(e.stack);
          }
        });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["stats-kurulum"],
  permLevel: 3
};

exports.help = {
  name: "kurulum",
  description:
    "Sunucu İstatistiklerini Gösteren Panel Kurar Ve Sürekli Olarak Günceller.",
  usage: "kurulum",
  kategori: "yetkili"
};
