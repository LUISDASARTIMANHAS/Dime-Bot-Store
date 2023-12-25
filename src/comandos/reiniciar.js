//comando para reiniciar a main do bot
const Discord = require("discord.js");
const fs = require("fs");
const dimeID = "857238406026362912"
const LDAID = "533042065408262164"
const PINGOBRASID = "889857449178308638"

exports.run = async (bot, message, args) => {
    if ((message.author.id !== dimeID) || (message.author.id !== LDAID) || (message.author.id !== PINGOBRASID))
        return message.channel.send(
            `${message.author} ❌ **Acesso negado, comando liberado apenas para os donos do bot!**`
        );
    try {
        await message.reply(`🔔 **Bot reiniciado, com sucesso!**`);
        fs.readdir("./src/comandos/", (err, files) => {
            const filez = files.length;
            if (err) return console.error(err);
            message.channel.send(
                `🔧 **atualizados \`${filez + 11}\` todos os comandos, com sucesso!**`
            );
            console.log("atualizados " + filez + " commands");
            files.forEach(file => {
                delete require.cache[require.resolve(`./${file}`)];
            });
        });
        process.exit(1);
    } catch (e) {
        console.log(e);
    }
};