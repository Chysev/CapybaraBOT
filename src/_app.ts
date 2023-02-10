import client from "./handlers/clientHandler";

import dotenv from "dotenv";
dotenv.config();

import "./models/UserLevel";
import "./handlers/eventHandler";
import "./commandHandlers/commandHandler";
import "./commandHandlers/SlashCommandHandler";
import databaseLevelUp from "./connections/databaseLevelUp";

process.on("uncaughtException", (error: Error) => {
  console.log(error);
});

process.on("unhandledRejection", (error: Error) => {
  console.log(error);
});

databaseLevelUp
  .sync()
  .then(() => {
    console.log("Level Up database connection established");
    client.login(process.env.TOKEN);
  })
  .catch((error) => {
    console.error("Error establishing database connection:", error);
  });
