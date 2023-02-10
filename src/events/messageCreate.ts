import { Player } from "erela.js";
import { Events, Message } from "discord.js";
import Manager from "../connections/manager";
import client from "../handlers/clientHandler";

export = {
  name: Events.MessageCreate,
  execute: async (message: Message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
      return;

    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    const args: string[] = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/);
    const command: string = args.shift().toLowerCase();

    if (
      !client.commands.has(command) &&
      !client.commands.find(
        (commands: any) =>
          commands.aliases && commands.aliases.includes(command)
      )
    )
      return;

    try {
      let execute_commands: any =
        client.commands.get(command) ||
        client.commands.find(
          (commands: any) =>
            commands.aliases && commands.aliases.includes(command)
        );
      execute_commands.execute(client, message, args, connection, Manager);
    } catch (error) {
      console.error(error);
      await message.reply("There was an error trying to execute that command!");
    }
  },
};
