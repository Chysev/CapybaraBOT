export = {
  name: "rolelist",
  aliases: ["rl"],
  execute: async (client, message: any, args) => {
    // Get and push the datas to send the role list
    let roleList = "";
    message.guild.roles.cache.forEach((role) => {
      roleList += `RoleName: ${role.name}, RoleID: ${role.id}\n`;
    });

    await message.channel.send(roleList);
  },
};
