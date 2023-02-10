import {
  SlashCommandBuilder,
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
} from "discord.js";

export = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite link for Capybara"),
  execute: async (interaction) => {
    const EmbedMe = new EmbedBuilder()
      .setColor(0x009ff)
      .setTitle("Invite Link")
      .setDescription(
        "I am Capybara if you like me invite me to your server, I can do variety of task!"
      );

    const Button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=997853238919446548&permissions=8&scope=bot"
        )
        .setStyle(ButtonStyle.Link)
    );
    await interaction.reply({
      components: [Button],
      embeds: [EmbedMe],
    });
  },
};
