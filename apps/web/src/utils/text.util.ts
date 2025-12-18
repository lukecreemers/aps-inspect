export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getInitials = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
