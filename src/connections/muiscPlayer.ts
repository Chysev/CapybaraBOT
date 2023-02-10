import Manager from "./manager";

// Node Connection
Manager.on("nodeConnect", (node: any) => {
  console.log(`Server: "${node.options.name}" connected.`);
});

Manager.on("nodeError", (node: any, error) => {
  console.log(
    `Server: "${node.options.name}" encountered an error: ${error.message}.`
  );
});
