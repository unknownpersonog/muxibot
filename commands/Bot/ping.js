const Discord = require("discord.js")
const ms = require('ms')

module.exports = {
    name: "ping",
    description: "Returns with Muxi's ping",
    run: async (interaction, client) => {
        const embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("PONG!")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`Muxi calculated her ping ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago and it was **${client.ws.ping}ms**`)
            .setTimestamp()
        embed.setFooter('Muxi forever!');
        interaction.reply({ embeds: [embed] })
    }
}
