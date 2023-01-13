const Discord = require("discord.js")

module.exports = {
    name: "queue",
    description: "Muxi will show the songs in queue.",
    timeout: 10000,
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
        const q = queue.songs.map((song, i) => {
            return `${i === 0 ? "I am currently playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n")

        const embed = new Discord.MessageEmbed()
            .setDescription(`**Current queue: ** \n\n  ${q}`)
            .setColor("RANDOM")
        interaction.reply({ embeds: [embed] })
    }
}
