import { PermissionsBitField, TextChannel } from "discord.js";

export = {
  name: "unslowmode",
  execute: async (client, message: any, args) => {
    // Check if the user has a permission of Administrator
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      message.reply("You do not have permission to use this command");
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply("Please mention a valid channel");
    }
    if (!(channel instanceof TextChannel)) {
      return message.reply("The channel mentioned must be a text channel");
    }

    await channel.setRateLimitPerUser(0).then(() => {
      message.reply("Slowmode has been successfully disabled in this channel.");
    });
  },
};
