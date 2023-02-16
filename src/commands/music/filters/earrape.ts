import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "earrape",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const data = {
      guildId: message.guild.id,
    };

    await connection.node.send(data);

    connection.setVolume(Number(500));

    await message.channel.send("Earrape Activated Bitch Lets Get it On!");
  },
};
