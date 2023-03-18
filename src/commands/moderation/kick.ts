import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "kick",
  aliases: ["goaway"],
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of KickMembers
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      message.reply("You do not have permission to kick members");
    }

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please mention a user to kick");

    if (!member.kickable) return message.reply("I cannot kick this user");

    // !kick @user reason
    const reason = args.slice(1).join(" ");
    if (!reason) return message.reply("Please provide a reason");

    await member.kick();
    await message.channel.send(
      `${member.user.tag} That user has been kicked because ${reason}`
    );
  },
};
