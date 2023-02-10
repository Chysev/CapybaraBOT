import { Message } from "discord.js";

export = {
  name: "ping",
  aliases: ["latency", "ms"],
  execute: async (client, message: Message, args) => {
    await message.channel.send("Latency: " + client.ws.ping + "ms");
  },
};
