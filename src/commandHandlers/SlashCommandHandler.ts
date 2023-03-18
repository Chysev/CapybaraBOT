import { REST, Routes } from "discord.js";
import client from "../handlers/clientHandler";

// Command Collection Handler
const SlashCommand = [];

// Path Handler
import commandFiles from "../pathHandlers/SlashCommandPathHandler";

for (const file of commandFiles) {
  const command = require(`../SlashCommands/${file}`);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The slash command at ${command} is missing a required "data" or "execute" property.`
    );
  }

  // Push to Collection Handler
  SlashCommand.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${SlashCommand.length} application (/) commands.`
    );

    // Retrieve and use the iterate datas
    const data: any = await rest.put(
      Routes.applicationCommands(process.env.CLIENTID),
      {
        body: SlashCommand,
      }
    );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

export default SlashCommand;
