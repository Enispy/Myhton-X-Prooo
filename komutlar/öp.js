const Discord = require("discord.js");
exports.run = (client, message, args, tools) => {
      let idler = ['510813083548254208', 'ID']
  if (message.author.bot || message.channel.type === "dm") return;
  var gifler = [
    "https://i.gifer.com/C1s0.gif",
    "https://44.media.tumblr.com/0281185e629ae612652b634f37019ab6/tumblr_pmfbn1sUXf1vd4jic_400.gif",
    "https://media1.tenor.com/images/076c2597f2c2416c0463f108c981d45a/tenor.gif?itemid=17179777",
    "https://media.tenor.com/images/f37c209f9aded24d4540839ecb27e06b/tenor.gif",
    "https://media1.tenor.com/images/359b9209f118b15751eb84e0d648177a/tenor.gif?itemid=17912839",
    "http://3.bp.blogspot.com/-DgbA52mDyDc/U1AoRnH_AtI/AAAAAAAAGU4/t9i8GR3p4vc/s1600/renkliduvar.blogspot.com-ay%C4%B1+(1).gif",
    "https://media1.tenor.com/images/58daa1c8341c4ac84b290c2cf79bb2ff/tenor.gif?itemid=17110185",
    "https://media1.tenor.com/images/d44761a969233c7902539041a15a03e4/tenor.gif?itemid=17444413",
    "https://media.tenor.com/images/f497f73532be3e6eaf5e5b86644ebf27/tenor.gif",
    "https://tenor.com/view/kissing-make-up-caressing-smooching-snuggling-gif-13953470",
  ];
  let resimler = gifler[Math.floor(Math.random() * gifler.length)];
  var kullanıcı = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kullanıcı) {
    const buyEmb = new Discord.RichEmbed()
      .setDescription(`\`${message.author.username}#${message.author.discriminator}\` birini etiketlemelisin.`);
    message.channel.send({ embed: buyEmb });
    return;
  }
  if (
    !message.mentions.members.first().user.username ===
    message.isMentioned(message.author)
  ) {
    const candyEmb = new Discord.RichEmbed()
      .setDescription(
        `\`${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator}\` senii, \`${message.author.username}#${message.author.discriminator}\` öptü.`
      )
      .setImage(resimler);
    message.channel.send({ embed: candyEmb });
    return;
  }
  if (message.author.id === kullanıcı.id) {
    const candyEmb = new Discord.RichEmbed()
      .setTitle(`Kendini öpecek kadar yalnız mısın? 😟`)
      .setImage(resimler);
    message.channel.send({ embed: candyEmb });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "öp",
  description: "istediğiniz kişiyi öper!.",
  usage: "öp [isim]"
};