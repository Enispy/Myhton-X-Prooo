const Discord = require('discord.js');

const db = require('quick.db')

exports.run = (client,message,args) => {

 if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(

     new Discord.RichEmbed()

     .setColor('ORANGE')

     .setTitle('Hata :x:')

     .setDescription('Bu kodu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısın.')

 ).then(m => m.delete(15000))

const boş = args.slice(0).join(' ')

if(!boş) return message.channel.send(

       new Discord.RichEmbed()

     .setColor('ORANGE')

     .setTitle('Hata ')

     .setDescription('Yanlış kullanım! \nKullanabileceklerin: `aç`,`kapat`,`kanal`,`fake-role`')).then(m => m.delete(15000))

 if(args[0] == "aç") {

db.set(`fake_${message.guild.id}`, "açık")

message.channel.send(

    new Discord.RichEmbed()

    .setColor('ORANGE')

    .setTitle('Başarıyla')

    .setDescription('Başarıyla fake hesap sistemini açıldı.')

).then(m => m.delete(15000))

 }

 if(args[0] == "kapat") {

db.delete(`fake_${message.guild.id}`)

message.channel.send(

    new Discord.RichEmbed()

    .setColor('ORANGE')

    .setTitle('Başarıyla')

    .setDescription('Başarıyla fake hesap sistemini kapattım.')

).then(m => m.delete(15000))

 }

 if(args[0] == "kanal") {

const kanal = message.mentions.channels.first()

if(!kanal) return message.channel.send(

    new Discord.RichEmbed()

    .setColor('ORANGE')

    .setTitle('Hata:')

    .setDescription('Lütfen bir kanal etiketle!')

).then(m => m.delete(15000))

db.set(`fakekanal_${message.guild.id}`, kanal.id)

message.channel.send(

    new Discord.RichEmbed()

    .setColor('ORANGE')

    .setTitle('Başarıyla')

    .setDescription(`Fake hesap kanalını ${kanal} olarak ayarladım.`)).then(m => m.delete(15000))

 }

 if(args[0] == "fake-role") {

    const rol = message.mentions.roles.first()

    if(!rol) return message.channel.send(

        new Discord.RichEmbed()

        .setColor('ORANGE')

        .setTitle('Hata ')

        .setDescription('Lütfen bir rol etiketle!')

    ).then(m => m.delete(15000))

    

    db.set(`fakerol_${message.guild.id}`, rol.id)

    message.channel.send(

        new Discord.RichEmbed()

        .setColor('ORANGE')

        .setTitle('Başarıyla ')

        .setDescription(`Fake hesap rolünü ${rol} olarak ayarladım.`)).then(m => m.delete(15000))

     }

}

exports.conf = {

enabled: true,

guildOnly: false,

permLevel: 0,

aliases: []

}

exports.help = {

name: 'fakehesap-sistemi'

}