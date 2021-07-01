const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
  const roblox = require('./node_modules/noblox.js');
const fs = require('fs');
const { Verify } = require('crypto');
 
client.on('ready', () => {
  console.log(`Loggin in as ${client.user.tag}!`);
});
 
client.on('message',async message => {
  const args = message.content.slice(config.Prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
if (command == 'roblox') {
  const username = args[0]
  if (username) {
    roblox.getIdFromUsername(username).then(id => {
      if (!id) {
        message.reply(" ไม่พบผู้ใช้ **" + username + "**")
      } else if (id) {
        roblox.getPlayerInfo(parseInt(id)).then(function(info) {
          const embed = new Discord.MessageEmbed()
          
          .setColor("fffff8")
          .setTitle("ข้อมูลผู้เล่น")
          .setImage(`https://www.roblox.com/Avatar-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
          .addField("> ชื่อผู้ใช้", info.username , false)
          .addField("> คำอธิบาย", info.status, false)
          .addField("> ไอดีของผู้เล่น", id, false)
          .addField("> สร้างมาแล้ว(วัน)", info.age, false)
          .addField("> ข้อมูลเพิ่มเติม",`[กดที่นี่](https://www.roblox.com/users/${id}/profile)`, false)
          .setTimestamp()
 
          message.reply({embed})
        })
      }
    })
  }
}
});
 
client.login(config.Token);