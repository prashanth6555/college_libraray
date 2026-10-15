export function shift(days, from = new Date()) {
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((parseDate(dateStr) - today) / 86400000);
}

export function formatDate(dateStr) {
  return parseDate(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function addDays(dateStr, days) {
  return shift(days, parseDate(dateStr));
}

export function fineFor(due) {
  const late = daysUntil(due);
  if (late >= 0) return 0;
  return Math.min(200, Math.abs(late) * 5);
}
