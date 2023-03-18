import { Player } from "erela.js";
import { Message } from "discord.js";
import Manager from "../../../connections/manager";

export = {
  name: "volume",
  execute: async (client, message: Message, args) => {
    const volumelevel = args.join(" ");

    if (!volumelevel) return message.reply("Please provide a volume number");

    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const data = {
      guildId: message.guild.id,
    };

    await connection.node.send(data);

    connection.setVolume(Number(volumelevel));

    await message.channel.send(
      message.author.username + " setted the volume to " + volumelevel
    );
  },
};
