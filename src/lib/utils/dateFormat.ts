export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear().toString().slice(-2);

  // Format the date as DD MMM YY
  return `${day.toString().padStart(2, "0")} ${month} ${year}`;
};
