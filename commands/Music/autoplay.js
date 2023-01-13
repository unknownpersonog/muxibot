const Discord = require("discord.js")

module.exports = {
    name: "autoplay",
    description: "Ask Muxi to disable or enable Autoplay",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "You are not in a voice channel", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("Nothing to play in the list.")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "Join the voice channel I am in or wait.", ephemeral: true })
        }
        const mode = client.distube.toggleAutoplay(interaction)
        return interaction.reply("Muxi successfully turned autoplay `" + (mode ? "On" : "Off") + "`")
    }
}
