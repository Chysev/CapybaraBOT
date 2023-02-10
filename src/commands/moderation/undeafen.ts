import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "undeafen",
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of DeafenMembers
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.DeafenMembers)
    ) {
      message.reply("You do not have permission to undeafen members");
    }

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please mention a user to undeafen");

    if (!member.voice.channel)
      return message.reply("That user is not in the voice channel");

    await member.voice.setDeaf(false).then(() => {
      message.channel.send(`Successfully undeafened ${member.displayName}.`);
    });
  },
};
