import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "stop",
  aliases: ["end", "terminate"],
  execute: async (client, message: Message, args) => {
    // If the use is not in the voice channel then this command is not avaialble
    if (!message.member.voice.channel)
      return message.reply("You are not in a voice channel you stoopid");

    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    // If music is playing then user can stop
    if (connection.playing) {
      try {
        connection.destroy();
        await message.channel.send(
          "The music stopped by: " + message.author.username
        );
        console.log("The music stopped by: " + message.author.username);
      } catch (error) {
        console.log(error);
      }

      // If not then user cannot stop
    } else {
      await message.channel.send("I am not playing any music or audio");
    }
  },
};
