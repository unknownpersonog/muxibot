const Discord = require("discord.js")

module.exports = {
    name: "loop",
    description: "Muxi will keep repeating the current song/queue",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "You are not in a voice channel.", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("Nothing to loop.")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "Join voice channel I am in or wait.", ephemeral: true })
        }
        let mode = client.distube.setRepeatMode(interaction)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        return interaction.reply("Repeat mode is set `" + mode + "`. You can use the command again to switch to another mode.")
    }
}
