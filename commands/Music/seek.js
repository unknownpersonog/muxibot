const Discord = require("discord.js")

module.exports = {
    name: "seek",
    description: "Muxi will skip the song to specific time.",
    options: [
        {
            name: "amount",
            type: 10,
            description: "Time you want to jump to in seconds",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const args = interaction.options.getNumber("amount")
        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)
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
        const time = parseInt(args)
        if (!time) return interaction.reply({ content: "Please specify the time correctly | In seconds only!" })
        if (time >= queue.songs[0].duration) return interaction.reply({ content: `Time < \`${queue.songs[0].duration} seconds\`` })
        client.distube.seek(interaction, Number(args))
        const embed = new Discord.MessageEmbed()
            .setDescription(`Jumped to \`${args} seconds time\``)
            .setColor("RANDOM")
        return interaction.reply({ embeds: [embed] })
    }
}
