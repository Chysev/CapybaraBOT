import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "slow",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const data = {
      guildId: message.guild.id,
      timescale: {
        speed: 0.5,
        pitch: 1.0,
        rate: 0.8,
      },
    };

    await connection.node.send(data);

    await message.channel.send("Slow Effect Activated");
  },
};
