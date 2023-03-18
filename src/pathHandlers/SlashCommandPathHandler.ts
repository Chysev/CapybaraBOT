import { readdirSync } from "fs";
import path from "path";

let filetype: string = ".js";

const commandsPath = path.join(__dirname, "../SlashCommands");

const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(filetype)
);

export default commandFiles;
