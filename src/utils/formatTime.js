export function formatTime(time) {
  const date = new Date(time * 1000);
  return date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
