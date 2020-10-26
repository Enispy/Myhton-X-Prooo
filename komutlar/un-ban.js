const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

  const permError = new Discord.RichEmbed()
        .setDescription('Bu Komutu Kullanmak İçin "Üyeleri Yasakla" Yetkisine Sahip Olmalısın')
    
  const userError = new Discord.RichEmbed()
        .setDescription('Yasağı kaldırmam için bir kullanıcı id si girmelisiniz! Kullanım: m!un-ban id')
  
  const userError2 = new Discord.RichEmbed()
        .setDescription("ID'de Harf Kullanılanamaz")
  
  const userError3 = new Discord.RichEmbed()
        .setDescription('Bu Kullanıcı Yasaklanmamış')
    
  const levelError = new Discord.RichEmbed()
        .setDescription('Sizinle aynı veya daha yüksek bir role sahip bir üyenin yasağını kaldırmazsınız')


  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send
        (permError).then
          (message.delete()).then
            (msg => msg.delete(5000));
  
  let user = args[0];
    if  (!user) return message.channel.send
          (userError).catch(console.error).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
  if  (isNaN(args[0])) return message.channel.send
        (userError2).catch(console.error).then
          (message.delete()).then
            (msg => msg.delete(5000));

  if  (user.highestRole >= message.author.highestRole) return message.channel.send
          (levelError).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
  
  const banList = await message.guild.fetchBans();
  
 // console.log(banList.map(s => s.users.id))
  
  if (!user.id === banList) return message.channel.send
      (userError3).then
        (message.delete()).then
          (msg => msg.delete(5000));
  
  message.guild.unban(user);
message.channel.send(`<@!${user}> Adlı Kullanıcının Yasağı Başarıyla Kaldırıldı.`)
  
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
        kategori: "Yetkili"

  };

  exports.help = {
    name: 'un-ban',
    description: 'İstediğiniz kişinin banını kaldırır.',
    usage: 'un-ban [kullanıcı] [sebep]'
  };