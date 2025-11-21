import { Client, Events, GatewayIntentBits, messageLink } from 'discord.js';

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ] 
 });

client.on("messageCreate",(message)=>{
    //console.log(message);
    if(message.author.bot) return; 
    if(message.content.startsWith('create')){
       const url=message.content.split('create')[1];
       return message.reply({
        content:"Generating Short Id for "+url 
       });
    }
    message.reply({
      content:"Hi form Bot"
    })
})

client.on("interactionCreate",(interaction)=>{
  // console.log(interaction)
  interaction.reply("Pong!!")
})

client.login(
  "MTQzODQ3ODQ5MTM1NTE4NTE1Mg.GP1ZW5.sUnUHxL-x8sUxT9sxuPu6Ak-5gZG896n8VzTvc"
)