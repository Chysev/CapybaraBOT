import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "mute",
  aliases: ["donttalk"],
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of MuteMembers
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)
    ) {
      message.reply("You do not have permission to mute members");
    }

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please mention a user to mute");

    if (!member.manageable) return message.reply("I cannot mute this member");

    const mutedrole = message.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );

    if (!mutedrole) return message.reply("There is no muted role");

    await member.roles.add(mutedrole);

    const reason = args.slice(1).join(" ");
    if (!reason) return message.reply("Please provide a reason");

    setTimeout(() => {
      member.roles.remove(mutedrole);
    }, 600000);

    message.channel.send(
      `${member.user.tag} has been muted for 10 minutes because ${reason}`
    );
  },
};
