const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

module.exports = client => {
  client.user.setStatus("online");               
  // dnd = Rahatsız Etmeyin
  // online = Çevrimiçi
  // idle = Boşta   
  var oyun = [
    client.users.size + " Kullanıcıya hizmet  veriyorum !",

    "Abone Olmayı Unutmayın ",
    "Takipte Kalın",                                                                                                                                                                           
    "İyi Kodlamalar"       
                                       ///Oynuyor Yapmak İçin: 'PLAYING'
                                      //İzliyor Yapmak İçin: 'WATCHING'
                                     //Dinliyor: 'LISTENING'
  ];
  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(
      "m!yardım Beta Version!",
      { type: "PLAYING" }
    );
  }, 2 * 10000);
};

