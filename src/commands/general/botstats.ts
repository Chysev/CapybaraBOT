import {
  Message,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import os from "os";

export = {
  name: "botstats",
  execute: async (client, message: Message, args) => {
    // CPU
    const platform = process.platform.replace(/win32/g, "Windows");
    const architecture = os.arch();
    const cores = os.cpus().length;
    const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

    // RAM
    const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    )} MB`;
    const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(
      2
    )} GB`;
    const botUsage = `${(
      (process.memoryUsage().heapUsed / os.totalmem()) *
      100
    ).toFixed(1)}%`;

    const overallUsed = `${(
      (os.totalmem() - os.freemem()) /
      1024 /
      1024 /
      1024
    ).toFixed(2)} GB`;
    const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(
      2
    )} GB`;
    const overallUsage = `${Math.floor(
      ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
    )}%`;

    const EmbedMe = new EmbedBuilder()
      .setTitle("Bot Information")
      .setColor("Blue")
      .addFields(
        { name: "-----------------------------", value: "**CPU**" },
        { name: "**OS:** ", value: `${platform}` },
        { name: "**Cores:** ", value: `${cores}` },
        { name: "**Usage:** ", value: `${cpuUsage}` }
      )
      .addFields(
        {
          name: "-----------------------------",
          value: "**BOT'S Server RAM**",
        },
        { name: "**Used:** ", value: `${botUsed}` },
        { name: "**Available:** ", value: `${botAvailable}` },
        { name: "**Usage:** ", value: `${botUsage}` }
      )
      .addFields(
        {
          name: "-----------------------------",
          value: "**BOT'S Overall Server RAM**",
        },
        { name: "**Used:** ", value: `${overallUsed}` },
        { name: "**Available:** ", value: `${overallAvailable}` },
        { name: "**Usage:** ", value: `${overallUsage}` },
        {
          name: "-----------------------------",
          value: "End of the information",
        }
      );

    const LinkButton: any = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Link to GitHUb Repository")
        .setURL("https://github.com/Chysev")
        .setStyle(ButtonStyle.Link)
    );
    message.channel.send({
      embeds: [EmbedMe],
      components: [LinkButton],
    });
  },
};
