import { SlashCommandBuilder } from "@discordjs/builders";

let sayEmbedCommand = new SlashCommandBuilder()
    .setName('sayembed')
    .setDescription('Usado enviar embeds no canal')
    .addStringOption((option) => option
        .setName("title")
        .setDescription("titulo do embed")
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName("description")
        .setDescription("descrição do embed")
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName("color")
        .setDescription("cor do embed em hexadecimal (#ffffff)")
        .setRequired(true)
    )
    .addChannelOption((option) => option
        .setName("channel")
        .setDescription("canal em que o embed sera enviado")
        .setRequired(true)
    )
sayEmbedCommand = sayEmbedCommand.toJSON()

function handleSayEmbed(interaction) {
    if (interaction.commandName === "sayembed") {
        const titulo = interaction.options.getString("title");
        const descricao = interaction.options.getString("description");
        const color = parseInt(
            interaction.options.getString("color").replace("#", ""),
            16
        ); // Converte a cor hexadecimal para um número inteiro
        const channel = interaction.options.getChannel("channel");

        const embed = {
            title: titulo,
            description: descricao,
            color: color,
        };

        // Envia o embed diretamente para o canal fornecido
        interaction.guild.channels.cache.get(channel.id).send({ embeds: [embed] });
        interaction.reply({
            content: `Embed enviado para o canal ${channel.name}!`,
        });
    }
}

export {
    sayEmbedCommand,
    handleSayEmbed
};
