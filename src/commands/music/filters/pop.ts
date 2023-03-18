import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "pop",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });
    const data = {
      guildId: message.guild.id,
      equalizer: [
        { band: 0, gain: 0.65 },
        { band: 1, gain: 0.45 },
        { band: 2, gain: -0.45 },
        { band: 3, gain: -0.65 },
        { band: 4, gain: -0.35 },
        { band: 5, gain: 0.45 },
        { band: 6, gain: 0.55 },
        { band: 7, gain: 0.6 },
        { band: 8, gain: 0.6 },
        { band: 9, gain: 0.6 },
        { band: 10, gain: 0 },
        { band: 11, gain: 0 },
        { band: 12, gain: 0 },
        { band: 13, gain: 0 },
      ],
    };

    await connection.node.send(data);

    await message.channel.send("Pop Equalizer Activated");
  },
};
