import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "speed",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const data = {
      guildId: message.guild.id,
      timescale: {
        speed: 2.0,
        pitch: 1.0,
        rate: 2.0,
      },
    };

    await connection.node.send(data);

    await message.channel.send("Speed Effect Activated");
  },
};
