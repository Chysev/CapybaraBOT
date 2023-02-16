import {
  Events,
  Message,
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
} from "discord.js";
import { Player } from "erela.js";
import ytSearch from "yt-search";
import "../../../connections/muiscPlayer";
import Manager from "../../../connections/manager";

export = {
  name: "play",
  aliases: ["pl"],
  execute: async (client, message: Message, args) => {
    Manager.on("trackStart", async (player, track: any) => {
      const channel = client.channels.cache.get(player.textChannel);
      try {
        const EmbedMe = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Capybara Music")
          .setURL(
            "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg"
          )
          .setAuthor({
            name: "Capy",
            iconURL:
              "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
            url: "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
          })

          .setDescription("NOW PLAYING: " + track.title)

          .setThumbnail(
            "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg"
          )

          .setImage(
            "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Playing.gif"
          )
          .setTimestamp()
          .setFooter({
            text: "Vibe with Capybara",
            iconURL:
              "https://raw.githubusercontent.com/Chysev/CapybaraBOT/main/src/public/Capybara.jpg",
          });

        // Not available at the moment | Finding out how to not acknowledge multiple times
        /*         const Button: any = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("pause") // Pause
            .setLabel("Pause")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("stop") // Stop
            .setLabel("Stop")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("skip") // Skip
            .setLabel("Skip")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("loop") // Loop
            .setLabel("Loop")
            .setStyle(ButtonStyle.Secondary)
        );

                client.on(Events.InteractionCreate, async (interaction: any) => {
          await interaction.deferUpdate();
          if (!interaction.member.voice.channel)
            return interaction.reply(
              "You are not in a voice channel you stoopid"
            );

          const connection: Player = Manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
          });

          const collector: any =
            interaction.channel.createMessageComponentCollector({
              time: 15000,
              max: 1,
            });

          collector.on("collect", async (interaction: any) => {
            // Pause Button
            if (interaction.customId === "pause") {
              if (connection.paused) {
                try {
                  connection.pause(false);
                  await channel.send(
                    "The music is unpaused by: " + track.requester.tag
                  );
                } catch (error) {
                  console.log(error);
                }
              } else {
                connection.pause(true);
                await channel.send(
                  "The music paused by: " + track.requester.tag
                );
              }
              // Stop Button
            } else if (interaction.customId === "stop") {
              // If music is playing then user can stop
              if (connection.playing) {
                try {
                  connection.destroy();
                  await channel.send(
                    "The music stopped by: " + track.requester.tag
                  );
                  console.log("The music stopped by: " + track.requester.tag);
                } catch (error) {
                  console.log(error);
                }

                // If music is not playing then user cannot stop
              } else {
                await channel.send("I am not playing any music or audio");
              }
              // Skip Button
            } else if (interaction.customId === "skip") {
              // If music is playing then user can skip
              if (connection.playing) {
                try {
                  connection.stop();
                  await channel.send(
                    "The music skipped by: " + track.requester.tag
                  );
                  console.log("The music skipped by: " + track.requester.tag);
                } catch (error) {
                  console.log(error);
                }

                // If music is not playing then user cannot skip
              } else {
                await channel.send("I am not playing any music or audio");
              }
              // Loop Button
            } else if (interaction.customId === "loop") {
              // If the music is looped then user can unloop
              if (connection.queueRepeat) {
                try {
                  connection.setQueueRepeat(false);
                  await channel.send(
                    "The music unlooped by: " + track.requester.tag
                  );
                } catch (error) {
                  console.log(error);
                }

                // If the music is not looped then user can loop
              } else {
                connection.setQueueRepeat(true);
                await channel.send(
                  "The music looped by: " + track.requester.tag
                );
              }
            }
          });

          collector.on("end", (collected: any) => console.log(collected.size));
        }); */

        try {
          channel.send({
            //  components: [Button],
            embeds: [EmbedMe],
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    });

    client.on("raw", (d: any) => Manager.updateVoiceState(d));

    // If user is not in the voice channel then bot connot play and join
    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel.");
    if (!args.length)
      return message.reply("You need to give me a URL or a search term.");

    const search: any = args.join(" ");
    let res: any;

    try {
      res = await Manager.search(search, message.author);
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED")
        throw { message: "Playlists are not supported with this command." };
    } catch (err) {
      return message.reply(
        `There was an error while searching: ${err.message}`
      );
    }

    if (res.loadType === "NO_MATCHES")
      return message.reply("There was no tracks found in the server");

    const connection: Player = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    connection.connect();

    // Search YT and Play
    function SearchAndPlay(query: any) {
      try {
        ytSearch(query, (err: any, r: any) => {
          if (err) throw err;

          const video = r.videos[0];
          console.log(`Video URL: ${video.url}`);

          if (
            !connection.playing &&
            !connection.paused &&
            !connection.queue.size
          ) {
            connection.play(video.url);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    // QueueEnd
    Manager.on("queueEnd", (player) => {
      const channel = client.channels.cache.get(player.textChannel);
      channel.send("Queue has ended.");
      player.destroy();
    });

    SearchAndPlay(message.content);
    // Add music to Queue
    connection.queue.add(res.tracks[1]);
    return message.reply(`Enqueuing ${res.tracks[0].title}.`);
  },
};
