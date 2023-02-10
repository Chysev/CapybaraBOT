import { readdirSync } from "fs";
import { Collection } from "discord.js";
import client from "../handlers/clientHandler";

// Command Collection Handler
client.commands = new Collection();

// File Type
let filetype: string = ".js";

// Path Handler
import commandPaths from "../pathHandlers/commandPathHandler";

// File Reader Handler
for (const path of commandPaths) {
  // Files Handler
  const commandFiles: any = readdirSync(path).filter((file) =>
    file.endsWith(filetype)
  );

  for (const file of commandFiles) {
    const command = require(`${path}/${file}`);
    client.commands.set(command.name, command);
  }
}

console.log(
  "Successfully loaded all " +
    client.commands.size +
    " application (!) commands"
);
