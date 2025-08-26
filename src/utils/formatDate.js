export function formatDate(weatherDate) {
  const date = new Date(weatherDate);
  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  return `${day} ${monthName}`;
}
