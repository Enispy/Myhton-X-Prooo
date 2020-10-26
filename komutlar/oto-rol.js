const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Bu sistemi kullanmak için rolleri yönet yetkisine sahip olmalısın!')
    if(!args[0]) 
  return message.channel.send(new Discord.RichEmbed().setTitle("Oto rol sisteminin kullanımı").setDescription("`m!oto-rol kanal-ayarla/kanal-sıfırla/rol-ayarla/rol-sıfırla`"))
    if(args[0] === 'rol-ayarla') {
        var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
        if(!rol) return message.channel.send('Bir rol etiketlemelisin veya id sini girmelisin!')
        db.set(`${message.guild.id}_otorol`, rol.id)
          const artemus = new Discord.RichEmbed()
          .setDescription(`Oto rolü ${rol} olarak ayarladım!`)
          .setColor('ORANGE')
          message.channel.send(artemus)
    } else if(args[0] == 'rol-sıfırla') {
        if(!db.has(`${message.guild.id}_otorol`)) return message.channel.send(new Discord.RichEmbed().setDescription('Zaten otorol ayarlanmamış')); else {
            db.delete(`${message.guild.id}_otorol`)
          const artemuss = new Discord.RichEmbed()
          .setDescription(`Oto rolü sıfırladım!`)
          .setColor('ORANGE')
            message.channel.send(artemuss)
        }
    } else if(args[0] === 'kanal-ayarla') {
        var kanal = message.mentions.channels.first()
        if(!kanal) return message.channel.send('Bir kanal etiketlemelisin!'); else {
            db.set(`${message.guild.id}_otokanal`, kanal.id)
            const artemusss = new Discord.RichEmbed()
            .setDescription(`Otorol kanalını ${kanal} olarak ayarladım!`)
            .setColor('ORANGE')
            message.channel.send(artemusss)
        }
    } else if(args[0] === 'kanal-sıfırla') {
        if(!db.has(`${message.guild.id}_otokanal`)) return message.channel.send(new Discord.RichEmbed().setDescription('Zaten otorol kanal ayarlanmamış')); else {
            db.delete(`${message.guild.id}_otokanal`)
             const artemussss = new Discord.RichEmbed()
             .setDescription(`Oto rol kanalını sıfırladım!`)
             .setColor('ORANGE')
            message.channel.send(artemussss)
        }
    }
}
exports.conf = {
    aliases: ['oto-rol']
}
exports.help = {
    name: "otorol"
}