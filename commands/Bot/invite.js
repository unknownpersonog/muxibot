const Discord = require("discord.js")

module.exports = {
    name: "invite",
    description: "Muxi's Invite URL",
    timeout: 10000,
    run: async (interaction, client, message, args) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Muxi's invite link:`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RED")
                    .setDescription(`Muxi invite link is: https://discord.com/oauth2/authorize?client_id=922713124753256499&permissions=8&scope=bot%20applications.commands%20identify`)
                    .setTimestamp()
                    .setFooter('Muxi loves OPG!');
                interaction.reply({ embeds: [embed] })
    }
}
