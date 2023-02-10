import { Message } from "discord.js";

export = {
  name: "pause",
  aliases: ["wait", "breakoff", "rest", "break"],
  execute: async (client, message: Message, args, connection) => {
    // If the use is not in the voice channel then this command is not avaialble
    if (!message.member.voice.channel)
      return message.reply("You are not in a voice channel you stoopid");

    // If the music or audio is not paused then user can pause
    if (connection.paused) {
      try {
        connection.pause(false);
        await message.channel.send(
          "The music is unpaused by: " + message.author.username
        );
      } catch (error) {
        console.log(error);
      }
    }
  },
};
