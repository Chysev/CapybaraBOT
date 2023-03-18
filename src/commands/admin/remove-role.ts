import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "removerole",
  aliases: ["rr"],
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of ManageRoles
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      return message.reply("You do not have permission to remove role");
    }

    const member = message.mentions.members.first();

    // !removerole @user role
    const roleName = args.slice(1).join(" ");

    if (!member) return message.reply("Please mention a user to remove role");

    if (!member.manageable)
      return message.reply("I cannot remove a role to this user");

    const role = message.guild.roles.cache.find(
      (role) => role.name === roleName
    );

    if (!role) return message.reply(`Role "${roleName}" not found`);

    await member.roles
      .remove(role)
      .then(() => {
        message.channel.send(
          `Successfully removed role "${roleName}" from ${member.displayName}`
        );
      })
      .catch((error) => {
        console.error(error);
        message.reply(`Failed to remove role "${roleName}"`);
      });
  },
};
