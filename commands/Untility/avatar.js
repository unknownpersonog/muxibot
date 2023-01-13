const Discord = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Muxi will get an user's avatar.",
    options: [
        {
            name: "user",
            description: "Select user.",
            type: 6
        }
    ],
    timeout: 5000,
    run: async (interaction) => {
        const user = interaction.options.getUser("user") || interaction.user
        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setColor("RANDOM")
            .setImage(user.avatarURL())
            .setColor("RANDOM")
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setURL(user.avatarURL())
        interaction.reply({ embeds: [embed] })
    }
}
