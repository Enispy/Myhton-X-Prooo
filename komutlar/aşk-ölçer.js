const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.get(args[0]))
    let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.get(args[1]))
    var s = message.author
    if(member2) {
        var s = member2.user
    }
    if(!member) {
        const embed = new Discord.RichEmbed()
            .setDescription(`Bir kişi etiketle melisin! seni kimse sevmiyor mu yoksa?😥 .`)
    .setAuthor('Aga Bee')
            .setColor("Orange")
            .setTimestamp()
        message.channel.send({embed})
        return
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += '😊'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `😊`
        }
    } else {
        var kalp = '😊'
        var akalp = '😊😊😊😊😊😊😊😊😊😊'
    }
    var yorum = `Hadi evlenmeye gidiyoz.`
    if(anasonuc < 80) {
        var yorum = 'Birşeyler gösterirsen olur bu iş😂.'
    }
    if(anasonuc < 60) {
        var yorum = 'Tripçi gibisiniz?'
    }
    if(anasonuc < 40) {
        var yorum = 'Küs müsünüz?'
    }
    if(anasonuc < 20) {
        var yorum = 'Birbiriniz öldürmeseniz bare?'
    } 
    const embed = new Discord.RichEmbed()
        .setAuthor(`${member.user.tag} Ve ${s.tag} Arasındaki Sevgi sonucu .`)
        .setDescription(`Sevginiz bukadar⇰⇰⇰: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
        .setColor("RANDOM")
        .setTimestamp()
    message.channel.send({embed})
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['aşk-ölç'],
    permLevel: 0
}
exports.help = {
    name: 'aşk-ölç',
    description: 'İki Kullanıcı Arasındaki Sevgiyi Ölçer.',
    usage: 'aşk-ölç [@Kullanıcı]'
}