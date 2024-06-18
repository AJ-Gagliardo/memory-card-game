const playAudio = (src, volume = 0.01, startTime = 1) => {
  const audio = new Audio(src);
  audio.volume = volume; // Set the volume
  audio.currentTime = startTime; // Set the start time to 2 seconds
  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
};

export default playAudio;
