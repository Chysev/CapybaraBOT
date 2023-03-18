import { Events } from "discord.js";

export = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const SlashCommand: any = interaction.client.commands.get(
      interaction.commandName
    );

    if (!SlashCommand) {
      console.error(
        `No command matching ${interaction.commandName} was found in our database`
      );
      return;
    }

    try {
      await SlashCommand.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error trying to execute that slash command!",
        ephemeral: true,
      });
    }
  },
};
