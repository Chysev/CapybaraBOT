import { SlashCommandBuilder } from "discord.js";
const math = require("mathjs");

export = {
  data: new SlashCommandBuilder()
    .setName("calculate")
    .setDescription("Evaluates a mathematical expression")
    .addStringOption((option) =>
      option
        .setName("expression")
        .setDescription("The mathematical expression to evaluate")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const expression = interaction.options.getString("expression");
    let result: any;

    try {
      result = math.evaluate(expression);
    } catch (error) {
      return interaction.reply(`Invalid expression: ${error.message}`);
    }

    await interaction.reply(`Result: ${result}`);
  },
};
