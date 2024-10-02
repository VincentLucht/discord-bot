import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';
import { join } from 'path';
import sodium from 'libsodium-wrappers';

export default async function playSoundInChannel(message, soundFileName, volume = 0.1) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    await message.reply("You need to be in a voice channel to use this command!");
    return;
  }

  await sodium.ready;
  
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  const player = createAudioPlayer();

  const resource = createAudioResource(join(process.cwd(), 'sound', "sounds", soundFileName), {
    inlineVolume: true
  });
  resource.volume.setVolume(volume); // set volume

  player.play(resource);
  connection.subscribe(player);
}