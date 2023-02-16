import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "shuffle",
  aliases: ["mix"],
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    connection.queue.shuffle();

    await message.channel.send(
      "The queue shuffled by: " + message.author.username
    );
  },
};
