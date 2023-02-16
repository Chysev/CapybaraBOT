import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "nightcore",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const data = {
      guildId: message.guild.id,
      timescale: {
        speed: 1.165,
        pitch: 1.125,
        rate: 1.05,
      },
    };

    await connection.node.send(data);

    await message.channel.send("Nightcore Effect Activated");
  },
};
