import path from "path";

const commandsGeneralPath: string = path.join(__dirname, "../commands/general"),
  commandsMusicPath: string = path.join(__dirname, "../commands/music"),
  commandsMusicCommandsPath: string = path.join(
    __dirname,
    "../commands/music/commands"
  ),
  commandsMusicFiltersPath: string = path.join(
    __dirname,
    "../commands/music/filters"
  ),
  commandsOwnerPath: string = path.join(__dirname, "../commands/owner"),
  commandsModerationPath: string = path.join(
    __dirname,
    "../commands/moderation"
  ),
  commandsAdminPath: string = path.join(__dirname, "../commands/admin");

const commandPaths: string[] = [
  commandsGeneralPath,
  commandsMusicPath,
  commandsMusicCommandsPath,
  commandsMusicFiltersPath,
  commandsOwnerPath,
  commandsModerationPath,
  commandsAdminPath,
];

export default commandPaths;
