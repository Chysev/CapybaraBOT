import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "deafen",
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of DeafenMembers
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.DeafenMembers)
    ) {
      message.reply("You do not have permission to deafen members");
    }

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please mention a user to deafen");

    if (!member.voice.channel)
      return message.reply("That user is not in the voice channel");

    await member.voice.setDeaf(true).then(() => {
      message.channel.send(`Successfully deafened ${member.displayName}.`);
    });
  },
};
