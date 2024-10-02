import { Client, GatewayIntentBits } from "discord.js";
import { join } from "path";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import dotenv from "dotenv";
import sodium from "libsodium-wrappers";
dotenv.config();

import messages from "./messages/messages.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("messageCreate", async (message) => {
  // Ignore messages from bots to prevent potential loops
  if (message.author.bot) return;

  if (!message.content.trim()) {
    console.log("Received an empty message, skipping processing");
    return;
  }

  try {
    const content = message.content.trim().toLowerCase();

    const messageMatch = messages.find((controller) => controller.trigger = content);

    if (messageMatch) {
      await message.reply(messageMatch.response);
    }

    // Play sounds
    if (content === "!ambatukam") {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        await message.reply(
          "You need to be in a voice channel to use this command!",
        );
        return;
      }

      // Initialize sodium before playing audio
      await sodium.ready;

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource(join(process.cwd(), 'sounds', 'ambatukam.mp3'));

      player.play(resource);
      connection.subscribe(player);
    }

    // futterluke
    if (content === "!futterluke") {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        await message.reply(
          "You need to be in a voice channel to use this command!",
        );
        return;
      }

      // Initialize sodium before playing audio
      await sodium.ready;

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource(join(process.cwd(), 'sounds', 'futterluke.mp3'));

      player.play(resource);
      connection.subscribe(player);
    }
  } catch (error) {
    console.error("Failed to react to message:", error);
  }
});

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.login(process.env.DISCORD_TOKEN);
console.log("Attempting to log in...");
