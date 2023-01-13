const Discord = require("discord.js")

module.exports = {
    name: "pause",
    description: "Muxi will pause the song.",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "You are not in a voice channel.", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("Nothing is playing.")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "Join the voice channel I am in or wait.", ephemeral: true })
        }
        try {
            await client.distube.pause(interaction)
            await interaction.reply("The track is now paised")
            const message = await interaction.fetchReply()
        } catch {
            interaction.reply({ content: " The song/queue is already paused", ephemeral: true })
        }
    }
}
