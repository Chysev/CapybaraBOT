import { EmbedBuilder, Message, PermissionsBitField } from "discord.js";

export = {
  name: "announce",
  aliases: ["shout"],
  execute: async (client, message: any, args) => {
    // Check if the user has a permission of Administrator
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      message.reply("You do not have permission to use this command");
    }
    const prompt = (question: string) => {
      return new Promise<string>((resolve) => {
        message.channel.send(question).then((sentMessage: any) => {
          const filter: any = (message: Message) =>
            message.author.id === message.author.id &&
            message.channel.id === sentMessage.channel.id;
          const collector: any = sentMessage.channel.createMessageCollector(
            filter,
            {
              time: 15000,
              max: 1,
            }
          );

          collector.on("collect", (collected) => {
            resolve(collected.content);
            collector.stop();
          });
        });
      });
    };

    const title = await prompt("Title?");
    const description = await prompt("Description?");
    const footer = await prompt("Footer?");
    const channel = await prompt(
      "What channel would you like to send the announce?"
    );

    if (!prompt) return message.reply("Please provide details");

    const EmbedMe = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setFooter({
        text: `${footer}`,
        iconURL:
          "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
      });
    await message.channel.bulkDelete(8, true).then(() => {
      client.channels.cache
        .find((channelmention: any) => channelmention.name === channel)
        .send({
          embeds: [EmbedMe],
        });
    });
  },
};
