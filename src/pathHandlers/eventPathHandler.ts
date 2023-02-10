import { readdirSync } from "fs";
import path from "path";

let filetype: string = ".js";

const eventsPath = path.join(__dirname, "../events");

const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith(filetype)
);

export default eventFiles;
