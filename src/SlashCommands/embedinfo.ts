import {
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";

export = {
  data: new SlashCommandBuilder()
    .setName("embedinfo")
    .setDescription("Embed info about Capybara"),

  execute: async (interaction) => {
    // Check if the user has a permission of Administrator
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      interaction.reply({
        content: "You do not have permission to do that you stoopid human",
        ephemeral: true,
      });
    }
    const EmbedMe = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Hi fellas! Capybara is now on Discord")
      .setURL(
        "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg"
      )
      .setAuthor({
        name: "Capy",
        iconURL:
          "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
        url: "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
      })
      .setDescription(
        "\nCapybara is a fun and helpful Discord bot that brings joy and convenience to your server. \n"
      )

      .setThumbnail(
        "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg"
      )

      .setImage(
        "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg"
      )
      .setTimestamp()
      .setFooter({
        text: "Capybara",
        iconURL:
          "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
      });
    const LinkButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("My Developer")
        .setURL("https://github.com/Chysev")
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({ embeds: [EmbedMe], components: [LinkButton] });
  },
};
