import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "clean",
  aliases: ["wipe"],
  execute: (client, message: any, args) => {
    // Check if the user has a permission of ManageChannels
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)
    ) {
      message.reply("You do not have permission to add role");
    }

    const amount = parseInt(args[0]) + 1;

    // Check if the amount is not a Number
    if (isNaN(amount)) {
      message.reply("That doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      message.reply("You need to input a number between 1 and 99.");
    }

    message.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
      message.channel.send(
        "There was an error trying to prune messages in this channel!"
      );
    });
  },
};
