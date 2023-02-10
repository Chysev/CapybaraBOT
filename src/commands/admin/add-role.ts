import { Message, PermissionsBitField } from "discord.js";

export = {
  name: "addrole",
  aliases: ["ar"],
  execute: async (client, message: Message, args) => {
    // Check if the user has a permission of ManageRoles
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      message.reply("You do not have permission to add role");
    }

    const member = message.mentions.members.first();

    // !addrole @user role
    const roleName = args.slice(1).join(" ");

    if (!member) return message.reply("Please mention a user to add role");

    if (!member.manageable)
      return message.reply("I cannot add a role to this user");

    const role = message.guild.roles.cache.find(
      (role) => role.name === roleName
    );

    if (!role) return message.reply(`Role "${roleName}" not found`);

    await member.roles
      .add(role)
      .then(() => {
        message.channel.send(
          `Successfully added role "${roleName}" from ${member.displayName}`
        );
      })
      .catch((error) => {
        console.error(error);
        message.reply(`Failed to add role "${roleName}"`);
      });
  },
};
