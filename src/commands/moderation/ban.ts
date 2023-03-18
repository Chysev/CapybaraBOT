import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "ban",
  aliases: ["hammer"],
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of BanMembers
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      message.reply("You do not have permission to ban members");
    }

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please mention a users to ban");

    if (!member.bannable) return message.reply("I cannot ban this user");

    // !ban @user reason
    const reason = args.slice(1).join(" ");
    if (!reason) return message.reply("Please provide a reason");

    await member.ban({ reason: reason });
    await message.channel.send(
      `${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`
    );
  },
};
