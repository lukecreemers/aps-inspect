// Formats a date into a relative time string, e.g. "3 minutes ago", "2 hours ago", "1 day ago", "1 week ago"
export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const inputDate = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - inputDate.getTime();

  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;

  if (diffMs < MINUTE) {
    return "Just now";
  } else if (diffMs < HOUR) {
    const minutes = Math.floor(diffMs / MINUTE);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (diffMs < DAY) {
    const hours = Math.floor(diffMs / HOUR);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (diffMs < WEEK) {
    const days = Math.floor(diffMs / DAY);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else {
    const weeks = Math.floor(diffMs / WEEK);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
};
