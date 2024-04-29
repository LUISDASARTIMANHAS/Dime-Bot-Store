import { SlashCommandBuilder } from "@discordjs/builders";

let helpCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Usado para ver os comandos e informações')

helpCommand = helpCommand.toJSON();

// help.js
function handleHelp(interaction) {
    if (interaction.commandName === 'help') {
        const date = new Date();
        const novaLinha = "\n";
        let info = ""
        const comandos = []

        // Iterar sobre cada comando no JSON
        comandos.forEach((comando) => {
            info += "__**" + comando.title + "**__" +
                novaLinha +
                comando.description +
                novaLinha
        });

        const embed = {
            title: "**__PAINEL DE AJUDA__**",
            description: info,
            color: parseInt("FFF000", 16),
            timestamp: date
        };

        interaction.reply({ embeds: [embed] });
    }
}

export {
    helpCommand,
    handleHelp
}