const Discord = require('discord.js');
const bot = new Discord.Client({
  autorun:true
});

const token = 'ODE1OTQ0NzkxNTE4MDg1MTYx.YDzxzQ.KGZxHIKi16rZZOlDl1lImbTTCug';

bot.on('ready',() => {
  console.log('Bot Is Online');
});


// let img = fs.writeFileSync('user.png',resizedImage);
//
//
// bot.on('ready', async () => {
//   await bot.channels.cache.get('815948303593504861').send("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKb2mdO3Lk6GHdpkx4BGoiu_RulnbBPgzzQ&usqp=CAU");
//   await bot.channels.cache.get('815948303593504861').send('Hello here!');
//
//
// })
//
// bot.on('message', async (message) => {
//   let imgAdd = message.attachments.url;
//   console.log(imgAdd);
//   if(message.content !== "Hello here!") {
//     bot.destroy();
//   }
// })
// bot.login(token);






module.exports = {
  bot,
  token
}
