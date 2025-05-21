/**
 * Format a date or time string safely
 * @param dateStr The date/time string to format
 * @param fallback Optional fallback text if date is invalid (default: "Not specified")
 * @returns Formatted date string or fallback text
 */
export const formatDateSafely = (
  dateStr: string | null | undefined,
  fallback: string = 'Not specified'
): string => {
  if (!dateStr) return fallback;

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleString();
  } catch (e) {
    return fallback;
  }
};
