import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import {
  Activity,
  ActivityType,
  Client,
  GatewayIntentBits,
  Routes,
} from "discord.js";
import { pingCommand, handlePing } from "./comandos/ping.js";
import { helpCommand, handleHelp } from "./comandos/help.js";
import { sendLogs, sendLogsEmbed } from "./comandos/sendLogs.js";
import { showServersCommand, handleShowServers } from "./comandos/showServers.js";
import { sayEmbedCommand, handleSayEmbed } from "./comandos/send-embed.js";
import { banCommand, handleBan } from "./comandos/ban.js";
const rawData = fs.readFileSync("./data/config.json");
const configs = JSON.parse(rawData);
const date = new Date();
const ano = date.getFullYear();
config();
const token = process.env.BOT_STORE_TOKEN;
const CLIENT_ID = process.env.BOT_STORE_CLIENT_ID;
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const rest = new REST({ version: "10" }).setToken(token);

bot.on("ready", async () => {
  const usersCount = bot.users.cache.size;
  const channelsCount = bot.channels.cache.size;
  const guildsCount = bot.guilds.cache.size;
  const botTag = bot.user.tag;
  const pingobrasLOG = await bot.channels.fetch("1032778034811506738");
  const atividades = [
    `${guildsCount} servidores!`,
    configs.descricao + ano,
    `${channelsCount} canais!`,
    configs.descricao + ano,
    `${usersCount} usuários!`,
    configs.descricao + ano,
  ];
  const info =
      "ℹ️" +
      botTag +
      " Conectou-se Ao Servidor De Hosteamento #04 \n" +
      "✅INICIADO POR: WebSiteHost \n" +
      "Duração:30Min Ou Infinita Pelo Dedicado \n" +
      "**Alterações:** \n" +
      configs.lista;

  alterarStatus();
  setInterval(alterarStatus, 60000);
   // sendLogs(pingobrasLOG, "<@1133630381153861743>");
   sendLogsEmbed(
    pingobrasLOG,
    "**__🖥️MENSAGEM DO SERVIDOR🖥️:__**",
    info,
    16753920,
    "",
    ""
  );

  console.log("Usuários:" + usersCount);
  console.log("Canais:" + channelsCount);
  console.log("Servidores:" + guildsCount);

  function alterarStatus() {
    const ramdomActivity = atividades[getRandomInt(atividades.length-1)];
    const status = [
      {
        name: ramdomActivity,
        type: ActivityType.Competing
      },
      {
        name: "Website: pingobras.glitch.me",
        type: ActivityType.Custom
      },
      {
        name: ramdomActivity,
        type: ActivityType.Listening
      },
      {
        name: ramdomActivity,
        type: ActivityType.Playing
      },
      {
        name: ramdomActivity,
        type: ActivityType.Watching
      },
    ]
    const ramdomStatus = status[getRandomInt(status.length-1)]

    bot.user.setActivity(ramdomStatus);
    bot.user.setStatus("idle");
    console.log("STATUS DO DISCORD DO " + botTag);
    console.log(`Atividade do Status: ${ramdomActivity}`);
  }
});

bot.on("interactionCreate", (interaction) => {
  handlePing(interaction);
  handleHelp(interaction);
  handleShowServers(interaction,bot.guilds.cache);
  handleSayEmbed(interaction);
  handleBan(interaction);
});

async function main() {
  const commands = [
    pingCommand,
    helpCommand,
    showServersCommand,
    sayEmbedCommand,
    banCommand
  ];
  try {
    console.log("Recarregando comandos de barra /");
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      console.log(`comando: ${JSON.stringify(command, null,2)}. Foi carregado!`);
    }
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });
    bot.login(token);
  } catch (err) {
    console.log(err);
  }
}
main();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
