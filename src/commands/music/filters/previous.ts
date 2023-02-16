import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "previous",
  execute: async (client, message: Message, args) => {
    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    if (!connection.queue.previous) return message.reply("No current track");

    connection.stop();
    connection.queue.unshift(connection.queue.previous);

    await message.channel.send(
      "Playing the previous music by: " + message.author.username
    );
  },
};
