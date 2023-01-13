const Discord = require("discord.js")

module.exports = {
    name: "jump",
    description: "Muxi will jump to an song in the queue",
    options: [
        {
            name: "id",
            type: 10,
            description: "The songs ID in the queue",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const musicid = interaction.options.getNumber("id")
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "You are not in a voice channel.", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("Nothing to play in the list")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "Join the voice channel I am in or wait.", ephemeral: true })
        }
        try {
            await client.distube.jump(interaction, parseInt(musicid))
            await interaction.reply({ content: "Jumped to the song number " + musicid })
        } catch {
            return interaction.reply({ content: "Song id is not valid!!", ephemeral: true })
        }
    }
}
