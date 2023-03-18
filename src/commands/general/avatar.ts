import { EmbedBuilder } from "@discordjs/builders";

export = {
  name: "avatar",
  execute: (client, message: any, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please provide a username");

    const x64 = member.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 64,
    });
    const x128 = member.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 128,
    });
    const x256 = member.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 256,
    });
    const x512 = member.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 512,
    });
    const x1024 = member.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });
    const x2048 = member.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 2048,
    });

    const EmbedMe = new EmbedBuilder()
      .setTitle(`Avatar of ${member.user.tag}`)
      .setImage(x256)
      .setDescription(
        `Links: • [x64](${x64}) ` +
          `• [x128](${x128}) ` +
          `• [x256](${x256}) ` +
          `• [x512](${x512}) ` +
          `• [x1024](${x1024}) ` +
          `• [x2048](${x2048}) `
      );

    message.channel.send({
      embeds: [EmbedMe],
    });
  },
};
