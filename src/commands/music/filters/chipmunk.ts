import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "chipmunk",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const data = {
      guildId: message.guild.id,
      timescale: {
        speed: 1.05,
        pitch: 1.35,
        rate: 1.25,
      },
    };

    await connection.node.send(data);

    await message.channel.send("Chipmunk Effect Activated");
  },
};
