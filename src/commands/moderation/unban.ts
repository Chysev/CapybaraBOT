import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "unban",
  aliases: ["removehandcuffs"],
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of BanMembers
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      message.reply("You do not have permission to ban members");
    }

    const userid = args.join(" ");

    if (!userid) return message.reply("Please provide user's id to unban");

    await message.guild.bans.fetch().then(() => {
      message.guild.members.unban(userid);
    });
    await message.channel.send(
      `<@${userid}> has been unbanned by ${message.author.tag}`
    );
  },
};
