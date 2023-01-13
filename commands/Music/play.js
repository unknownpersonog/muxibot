module.exports = {
    name: "play",
    description: "Muxi will play your favourite music!",
    options: [
        {
            name: "query",
            type: 3,
            description: "Name of song you want to play",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)
        const query = interaction.options.get("query").value
        if (!voiceChannel) {
            return interaction.reply({ content: "You are not in a voice channel.", ephemeral: true })
        }
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "Join the voice channel I am in or wait.", ephemeral: true })
            }
        }
        await interaction.reply("Let me search for your track")
        await interaction.editReply("Search Finished! Loading your track!")
        client.distube.play(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}
