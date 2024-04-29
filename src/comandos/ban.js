import { SlashCommandBuilder } from "@discordjs/builders";

let banCommand = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Usado para moderação do servidor')

banCommand = banCommand.toJSON();

// help.js
function handleBan(interaction) {
  if (interaction.commandName === 'ban') {
    const date = new Date();

    let info = `
    Usuario X banido.
    Moderador: x
    Motivo: x
    `
    const embed = {
      title: "**__BAN__**",
      description: info,
      color: parseInt("FF0000", 16),
      timestamp: date
    };

    interaction.reply({ embeds: [embed] });
  }
}

export {
  banCommand,
  handleBan
}