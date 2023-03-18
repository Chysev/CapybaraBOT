import { Events } from "discord.js";
import Manager from "../connections/manager";

export = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    Manager.init(client.user.id);
    console.log(`Logged in as ${client.user.tag}`);
  },
};
