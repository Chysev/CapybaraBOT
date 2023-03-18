import { Message, PermissionsBitField, TextChannel } from "discord.js";

export = {
  name: "slowmode",
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of Administrator
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      message.reply("You do not have permission to use this command");
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply("Please mention a channel.");
    }

    const time = args[1];
    if (!time || isNaN(time)) {
      return message.reply("Please provide a valid time in seconds.");
    }

    if (time < 0 || time > 21600) {
      return message.reply(
        "Please provide a valid time between 0 and 21600 seconds."
      );
    }

    try {
      await (channel as TextChannel).setRateLimitPerUser(time).then(() => {
        message.reply(`Slow mode has been set to ${time} seconds.`);
      });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while setting slow mode.");
    }
  },
};
