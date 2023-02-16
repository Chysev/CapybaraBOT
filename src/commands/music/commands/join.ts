import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "join",
  aliases: ["in"],
  execute: async (client, message: Message, args) => {
    // If the user is in the voice call then bot can join
    if (message.member.voice.channel) {
      try {
        const connection: Player = Manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
        });
        connection.connect();
        await message.reply("I joined in the call and dont left me hanging");
      } catch (error) {
        console.log(error);
      }
      // If not bot cannot join
    } else {
      await message.reply("Join voice call and try again bro");
    }
  },
};
