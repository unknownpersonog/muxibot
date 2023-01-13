const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "join",
    description: "Muxi will join the VC you are in!",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "You are not in a voice channel.", ephemeral: true })
        }
        try {
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            await interaction.reply("Join Successful!")
        } catch (error) {
            return interaction.reply({ content: `Sadly, Error Connecting To The Voice Channel: ${error}`, ephemeral: true })
        }
    }
}
