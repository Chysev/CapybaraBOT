import nodes from "./server";
import { Manager, Payload } from "erela.js";
import client from "../handlers/clientHandler.js";

const manager = new Manager({
  nodes,

  send: (id: string, payload: Payload) => {
    const guild = client.guilds.cache.get(id);

    if (guild) guild.shard.send(payload);
  },
});

export default manager;
