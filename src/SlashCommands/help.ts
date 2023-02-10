import { SlashCommandBuilder } from "discord.js";

export = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help and list of Capybara's command"),
  execute: async (interaction) => {
    await interaction.reply("Help command is not available at the moment");
  },
};
