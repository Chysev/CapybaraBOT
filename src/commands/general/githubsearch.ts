export = {
  name: "githubsearch",
  aliases: ["gitsrch"],
  execute: (client, message: any, args) => {
    const username = args.join(" ");

    if (!username) return message.reply("Please provide a username");

    message.channel.send(`https://github.com/${username}`);
  },
};
