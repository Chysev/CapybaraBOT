import { Message } from "discord.js";

export = {
  name: "setnickname",
  execute: async (client, message: Message, args) => {
    const member = message.mentions.members.first();

    const nickname = args.slice(1).join(" ");

    if (!member) return message.reply("Please mention a user to set nickname");

    if (!nickname) return message.reply("Provide a nickname");

    await member.setNickname(nickname).then(() => {
      message.channel.send(
        `Successfully set ${member.user.tag}'s nickname to "${nickname}".`
      );
    });
  },
};
