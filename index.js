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

  const test = sounds.map((sound) => sound.trigger);
  console.log(test);

  if (!message.content.trim()) {
    console.log("Received an empty message, skipping processing");
    return;
  }

  try {
    const content = message.content.trim().toLowerCase();

    // help
    if (content === "!help") {
      await message.reply(sounds.map((sound) => sound.trigger).join("\n"));
    }
    
    // text messages
    const messageMatch = messages.find(
      (message) => message.trigger === content
    );
    if (messageMatch) {
      await message.reply(messageMatch.response);
    }

    // sounds
    const soundMatch = sounds.find((sound) => sound.trigger === content);
    if (soundMatch) {
      await playSoundInChannel(message, soundMatch.path, soundMatch?.volume);
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
