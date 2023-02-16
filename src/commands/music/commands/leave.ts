import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "leave",
  aliases: ["out"],
  execute: async (client, message: Message, args) => {
    // If the user is in the voice channel then bot can leave
    if (message.member.voice.channel) {
      try {
        const connection: Player = Manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
        });
        connection.destroy();
      } catch (error) {
        console.log(error);
      }
      // If not bot connot leave
    } else {
      await message.reply("We are not in the voice call you stoopid");
    }
  },
};
