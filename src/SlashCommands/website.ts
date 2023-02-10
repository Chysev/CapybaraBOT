import { SlashCommandBuilder } from "discord.js";

export = {
  data: new SlashCommandBuilder()
    .setName("website")
    .setDescription("Info about CapybaraBOT website"),
  execute: async (interaction) => {
    await interaction.reply("https://johnlayda.vercel.app");
  },
};
