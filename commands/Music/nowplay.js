const Discord = require("discord.js")
const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"}\``
module.exports = {
    name: "nowplaying",
    description: "Muxi will tell you information about current song.",
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
        const song = queue.songs[0]
        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: "Now Playing", iconURL: "https://raw.githubusercontent.com/HELLSNAKES/Music-Slash-Bot/main/assets/music.gif" })
            .setDescription(`[${song.name}](${song.url})`)
            .addField("**Link to download**", `[Download This Song](${song.streamURL})`)
            .setThumbnail(song.thumbnail)
            .setColor("RANDOM")
            .setTimestamp()
        return interaction.reply({ embeds: [embed] })
    }
}
