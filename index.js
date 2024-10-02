import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import messages from "./messages/messages.js";

import sounds from "./sound/sounds.js";
import playSoundInChannel from "./sound/playSoundInChannel.js";

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

    const messageMatch = messages.find(
      (message) => message.trigger === content
    );
    if (messageMatch) {
      await message.reply(messageMatch.response);
    }

    const soundMatch = sounds.find((sound) => sound.trigger === content);
    console.log(soundMatch);
    if (soundMatch) {
      await playSoundInChannel(message, soundMatch.trigger);
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
