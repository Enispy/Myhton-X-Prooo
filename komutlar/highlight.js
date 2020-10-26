const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {// Can°B#1308
// Bu komut Can°B#1308 tarafından CodAre için yapılmıştır.
// Herhangi bir şekilde alınıp, paylaşılması yasaktır.
// İzinsiz paylaşılması halinde gerekli işlemlerin başlatılacağını bildirmek isterim.

if(!args[0]) {
const embed = new Discord.RichEmbed().setColor('#728bd6').setAuthor('Page 1/1 (6 commands)').setTitle('[highlight|hl] [word]').setDescription(`
Inspired by highlight bot, Carlbot now also does highlighting.
Highlighting means you will receive a message when your keyword is said in chat.
The matching is approximate and works really similarly to discord search
(basically, if you search your keyword in discord search, you will find messages that would trigger the highlight, roughly speaking).
It will only notify you if you haven't posted anything in chat for the past 5 minutes.`)
.addField('highlight add [word]', 'Adds a word that will notify you.')
.addField('highlight block [blocks...]', "Messages sent in this channel/from this user won't notify you can select many channels and or members with the same command")
.addField('highlight clear', 'Removes all highlights from you')
.addField('highlight remove <word>', 'Removes a specific highlighted word from you')
.addField('highlight show', "Displays the words you have highlighted and which members and channels you're ignoring")
.addField('highlight unblock [blocks...]', 'Unblocks one or more channels or members')
return message.channel.send(embed)
}

let argümanlar = ['block', 'clear', 'add', 'remove', 'show', 'unblock', ''];
if(!argümanlar.includes(args[0])) {
let word = args.slice(0).join(' ');
if(word.length > 50) return message.channel.send('50 characters or less please');
const kelimeler = await data.fetch(`.kelimeler.${message.guild.id}.${message.author.id}`);
if(kelimeler && kelimeler.find(a => a.target === word)) return message.channel.send(`'${word}' is already highlighted for you`)
message.channel.send(`Added "${word}" to your highlights`);
data.push(`.kelimeler.${message.guild.id}.${message.author.id}`, { target: word });
}

if(args[0] === 'add') {
if(!args[1]) return message.channel.send('You need to specify a word to highlight.');

let word = args.slice(1).join(' ');
if(word.length > 50) return message.channel.send('50 characters or less please');
const kelimeler = await data.fetch(`.kelimeler.${message.guild.id}.${message.author.id}`);
if(kelimeler && kelimeler.find(a => a.target === word)) return message.channel.send(`'${word}' is already highlighted for you`)
message.channel.send(`Added "${word}" to your highlights`);
data.push(`.kelimeler.${message.guild.id}.${message.author.id}`, { target: word });
}

if(args[0] === 'block') {
if(!args[1]) return message.channel.send('Mention a channel or a user to block highlights from them');
const blocked2 = data.fetch(`blocked.${message.guild.id}.${message.author.id}`);
if(message.mentions.members.first()) {
if(blocked2 && blocked2.filter(a => a.blockUser).find(s => s.blockUser === message.mentions.members.first().id)) {
} else {
data.push(`blocked.${message.guild.id}.${message.author.id}`, { blockUser: message.mentions.members.first().id });
}
} else if(message.mentions.channels.first()) {
if(blocked2 && blocked2.filter(a => a.blockChannel).find(s => s.blockChannel === message.mentions.channels.first().id)) {

} else {
data.push(`blocked.${message.guild.id}.${message.author.id}`, { blockChannel: message.mentions.channels.first().id });
}
}
const blocked = data.fetch(`blocked.${message.guild.id}.${message.author.id}`);
const embed = new Discord.RichEmbed().setTitle('Your Current Ignores').setColor('#ffcb5b');
let asd = [];
let asd2 = [];
blocked.filter(s => s.blockChannel).forEach(a => {
asd.push(message.guild.channels.get(a.blockChannel));
})
blocked.filter(s => s.blockUser).forEach(a => {
asd2.push(message.guild.members.get(a.blockUser));
})
if(asd.length > 0) {
embed.addField('Channels', asd.join('\n'), true);
}
if(asd2.length > 0) {
embed.addField('Members', asd2.join('\n'), true);
}
message.channel.send(`Updated your highlights`, embed)
}

if(args[0] === 'unblock') {
if(!args[1]) return message.channel.send('Mention a channel or a user to block highlights from them');
const blocked2 = data.fetch(`blocked.${message.guild.id}.${message.author.id}`);
if(blocked2) {
if(message.mentions.members.first()) {
if(blocked2 && !blocked2.filter(a => a.blockUser).find(s => s.blockUser === message.mentions.members.first().id)) {
} else {
if(blocked2.length == 1) {
data.delete(`blocked.${message.guild.id}.${message.author.id}`);
} else if(blocked2.length > 1) {
let ex = [];
blocked2.forEach(s => {
if(s.blockUser === message.mentions.members.first().id) return;
ex.push(s);
})
data.set(`blocked.${message.guild.id}.${message.author.id}`, ex);
}
}
} else if(message.mentions.channels.first()) {
if(blocked2 && !blocked2.filter(a => a.blockChannel).find(s => s.blockChannel === message.mentions.channels.first().id)) {
} else {
if(blocked2.length == 1) {
data.delete(`blocked.${message.guild.id}.${message.author.id}`);
} else if(blocked2.length > 1) {
let ex = [];
blocked2.forEach(s => {
if(s.blockChannel === message.mentions.channels.first().id) return;
ex.push(s);
})
data.set(`blocked.${message.guild.id}.${message.author.id}`, ex);
}
}
}
} else return message.channel.send("You're not ignoring anything (on this server at least)")
const blocked = data.fetch(`blocked.${message.guild.id}.${message.author.id}`);
if(blocked) {
const embed = new Discord.RichEmbed().setTitle('Your Current Ignores').setColor('#ffcb5b');
let asd = [];
let asd2 = [];
blocked.filter(s => s.blockChannel).forEach(a => {
asd.push(message.guild.channels.get(a.blockChannel));
})
blocked.filter(s => s.blockUser).forEach(a => {
asd2.push(message.guild.members.get(a.blockUser));
})
if(asd.length > 0) {
embed.addField('Channels', asd.join('\n'), true);
}
if(asd2.length > 0) {
embed.addField('Members', asd2.join('\n'), true);
}
message.channel.send(`Updated your highlights`, embed)
}
}

if(args[0] === 'clear') {
data.delete(`.kelimeler.${message.guild.id}.${message.author.id}`);
message.channel.send('Removed all your highlighted words 👌')
}

if(args[0] === 'remove') {
if(!args[1]) return;
let word = args.slice(1).join(' ');
const kelimeler = data.fetch(`.kelimeler.${message.guild.id}.${message.author.id}`);
if(kelimeler) {
if(kelimeler.find(a => !a.target === word)) return message.channel.send("Doesn't seem like you were tracking that word");

if(kelimeler.length == 1) {
data.delete(`.kelimeler.${message.guild.id}.${message.author.id}`);
} else if(kelimeler.length > 1) {
let ex = [];
kelimeler.forEach(s => {
if(s.target === word) return;
ex.push(s);
})
data.set(`.kelimeler.${message.guild.id}.${message.author.id}`, ex);
}
message.channel.send(`Removed ${word} from your highlighted words 👌`)
} else {
  return message.channel.send("Doesn't seem like you were tracking that word");
}
}

if(args[0] === 'show') {
const kelimeler = data.fetch(`.kelimeler.${message.guild.id}.${message.author.id}`);
if(!kelimeler) return message.channel.send("You're not tracking any words yet, use !highlight add <word> to start tracking");
const embed = new Discord.RichEmbed().setTitle("You're currently tracking the following words").setColor('#ffcb5b');
let d = [];
kelimeler.forEach(a => d.push(a.target));

const blocked = data.fetch(`blocked.${message.guild.id}.${message.author.id}`);
if(blocked) {
let asd = [];
let asd2 = [];
blocked.filter(s => s.blockChannel).forEach(a => {
asd.push(message.guild.channels.get(a.blockChannel));
})
blocked.filter(s => s.blockUser).forEach(a => {
asd2.push(message.guild.members.get(a.blockUser));
})
if(asd.length > 0) {
embed.addField('Channels', asd.join('\n'), true);
}
if(asd2.length > 0) {
embed.addField('Members', asd2.join('\n'), true);
}
}
message.channel.send(embed.setDescription(kelimeler.map(s => s.target)));
}

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['hl'],
  permLevel: 0
}

exports.help = {
  name: 'highlight'
};// codare