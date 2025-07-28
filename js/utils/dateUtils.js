export function getIranDateTime() {
  const now = new Date();

  const options = {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dateTimeParts = now.toLocaleString("en-GB", options).split(", ");
  const [day, month, year] = dateTimeParts[0].split("/");
  const time = dateTimeParts[1];

  return `${year}-${month}-${day}:${time}`;
}
