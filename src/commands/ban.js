const Discord = require("discord.js");
const embed = new Discord.MessageEmbed();
const {comandos, prefix} = require("../../data/config.json");

module.exports.run = async (bot, message, args) => {
  const novaLinha = "\n";

  let info = "ℹ️" + novaLinha;
  
  embed.setTitle(`**__BAN__**`);
  embed.setColor("#00FF00");
  embed.setDescription(info);
  embed.setTimestamp();

  message.delete().catch((O_o) => {});
  message.channel.send(embed);
};
