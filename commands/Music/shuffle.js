const Discord = require("discord.js")

module.exports = {
    name: "shuffle",
    description: "Muxi will shuffle the songs in queue.",
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
        await client.distube.shuffle(interaction)
        await interaction.reply("Shuffled the songs!")
        const message = await interaction.fetchReply()
    }
}
