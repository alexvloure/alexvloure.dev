export default function getTimeString(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedHours =
    hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}
