const Discord = require("discord.js")

module.exports = {
    name: "resume",
    description: "Muxi will resume a paused song/queue.",
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
            await client.distube.resume(interaction)
            await interaction.reply("Resumed the song/queue.")
            const message = await interaction.fetchReply()
            await message.react("▶")
        } catch {
            interaction.reply({ content: "Nothing is paused currently.", ephemeral: true })
        }
    }
}
