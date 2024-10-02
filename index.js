import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  // Ignore messages from bots to prevent potential loops
  if (message.author.bot) return;

  try {
    // React with a 👍 emoji to every message
    await message.react("Halt deine Fresse du HS");

    // You can add more reactions if you want
    // await message.react('🎉');
  } catch (error) {
    console.error("Failed to react to message:", error);
  }
});

client.login(process.env.DISCORD_TOKEN);
