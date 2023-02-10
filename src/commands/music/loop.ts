import { Message } from "discord.js";

export = {
  name: "loop",
  aliases: ["again", "arc"],
  execute: async (client, message: Message, args, connection) => {
    // If the use is not in the voice channel then this command is not avaialble
    if (!message.member.voice.channel)
      return message.reply("You are not in a voice channel you stoopid");

    // If the music is looped then user can unloop
    if (connection.queueRepeat) {
      try {
        connection.setQueueRepeat(false);
        await message.channel.send(
          "The music unlooped by: " + message.author.username
        );
      } catch (error) {
        console.log(error);
      }
      // If the music is not looped then user can loop
    } else {
      connection.setQueueRepeat(true);
      await message.channel.send(
        "The music looped by: " + message.author.username
      );
    }
  },
};
