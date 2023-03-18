import client from "./clientHandler";

// Path handler
import eventFiles from "../pathHandlers/eventPathHandler";

for (const file of eventFiles) {
  const event = require(`../events/${file}`);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}
