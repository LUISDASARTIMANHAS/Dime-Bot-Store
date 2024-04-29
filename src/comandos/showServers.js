import { SlashCommandBuilder } from "@discordjs/builders";

let showServersCommand = new SlashCommandBuilder()
  .setName("show-servers")
  .setDescription("Usado para ver os servidores do bot e suas informações");
showServersCommand = showServersCommand.toJSON();

function handleShowServers(interaction, servers) {
	if (interaction.commandName === "show-servers") {
    let serverList = "Lista de Servidores:\n";
    // Itera sobre a coleção de servidores
    servers.forEach((guild) => {
      serverList += `**${guild.name}** (ID: ${guild.id})\n`;
      serverList += `Membros: ${guild.memberCount}\n`;
			serverList += `Dono: <@${guild.ownerId}> ID: ${guild.ownerId}\n`;
      serverList += `Descrição: ${guild.description ? guild.description : 'Nenhuma descrição.'}\n\n`;
    });


    // Envia a lista de servidores para o canal atual
    interaction.channel.send(serverList);
  }
	}

export { showServersCommand, handleShowServers };
