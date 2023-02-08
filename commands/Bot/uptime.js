const Discord = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: "uptime",
    description: "Muxi's Uptime",
    timeout: 5000,
    run: async (interaction, client) => {
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setDescription(`Muxi is online from last ${prettyMilliseconds(client.uptime)}`)
            .setTimestamp()
            .setFooter('Muxi plays minecraft!');

        interaction.reply({ embeds: [embed] })
    }
}
