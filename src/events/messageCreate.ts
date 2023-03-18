import { Events, Message } from "discord.js";
import client from "../handlers/clientHandler";

export = {
  name: Events.MessageCreate,
  execute: async (message: Message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
      return;

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
      execute_commands.execute(client, message, args);
    } catch (error) {
      console.error(error);
      await message.reply("There was an error trying to execute that command!");
    }
  },
};
