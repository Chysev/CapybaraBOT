import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "resume",
  aliases: ["wait", "breakoff", "rest", "break"],
  execute: async (client, message: Message, args) => {
    // If the use is not in the voice channel then this command is not avaialble
    if (!message.member.voice.channel)
      return message.reply("You are not in a voice channel you stoopid");

    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    // If the music or audio is paused then user can resume
    if (!connection.paused) {
      try {
        connection.pause(true);
        await message.channel.send(
          "The music resumed by: " + message.author.username
        );
      } catch (error) {
        console.log(error);
      }
    }
  },
};
