export const formatTokens: Record<string, RegExp> = {
  YYYY: /(\d{4})/,
  MM: /(\d{2})/,
  DD: /(\d{2})/,
  HH: /(\d{2})/,
  mm: /(\d{2})/,
  ss: /(\d{2})/,
};
export const dateDefaults: Record<string, number> = {
  YYYY: 0,
  MM: 1,
  DD: 1,
  HH: 0,
  mm: 0,
  ss: 0,
};
export const dateFormat: string = 'MMM dd, yyyy';
export const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
export const dateTimeFormat: string = `${dateFormat} hh:mm a`;
export const dateTimeFormatOption: Intl.DateTimeFormatOptions = {
  ...dateFormatOption,
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

/**
 * Constructs a Date object from the provided date values, validating each component.
 *
 * @param {Record<string, number>} dateValues - An object containing date components.
 * @param {number} dateValues.YYYY - The year component of the date.
 * @param {number} dateValues.MM - The month component of the date (1-indexed).
 * @param {number} dateValues.DD - The day component of the date.
 * @param {number} dateValues.HH - The hours component of the date.
 * @param {number} dateValues.mm - The minutes component of the date.
 * @param {number} dateValues.ss - The seconds component of the date.
 * @returns {Date | null} A Date object if the values are valid, otherwise null.
 *
 * @throws {Error} If any date component is out of its valid range.
 */
export function buildDateFromValues(dateValues: Record<string, number>): Date | null {
  const year = dateValues.YYYY || dateDefaults.YYYY;
  const month = (dateValues.MM || dateDefaults.MM) - 1; // Months are 0-indexed
  const day = dateValues.DD || dateDefaults.DD;
  const hours = dateValues.HH || dateDefaults.HH;
  const minutes = dateValues.mm || dateDefaults.mm;
  const seconds = dateValues.ss || dateDefaults.ss;

  // Validate ranges
  if (month < 0 || month > 11) return null; // Month should be between 0 and 11
  if (day < 1 || day > 31) return null; // Day should be between 1 and 31
  if (hours < 0 || hours > 23) return null; // Hours should be between 0 and 23
  if (minutes < 0 || minutes > 59) return null; // Minutes should be between 0 and 59
  if (seconds < 0 || seconds > 59) return null; // Seconds should be between 0 and 59

  // Check for valid day in month
  const date = new Date(year, month, day, hours, minutes, seconds);
  if (date.getMonth() !== month) return null; // Invalid day for the month

  return date;
}

/**
 * Formats a date according to the specified locale and options.
 * Supports Date objects.
 * @param {string | number | Date} date - The date to format. Can be a string, number, or Date object.
 * @param {string} [locale='en-US'] - The locale string that determines the format of the date.
 * @param {Intl.DateTimeFormatOptions} [options={ year: 'numeric', month: 'short', day: 'numeric' }] - Options to customize the date format.
 * @returns {string} The formatted date string.
 * @example
 * format(new Date(), 'en-US'); // 'Oct 5, 2023'
 * format('2023-10-05', 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }); // '5 October 2023'
 */
export function format(
  date: string | number | Date,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = dateFormatOption,
): string {
  const jsDate = new Date(date);
  return jsDate.toLocaleDateString(locale, options);
}

/**
 * Retrieves the preferred locale of the user's browser.
 * It checks for the locale in the following order:
 * - navigator.languages[0] for Chrome and Firefox
 * - navigator.language for all browsers
 * - navigator.userLanguage for Internet Explorer <= 10
 * @returns {string | null | undefined} The preferred locale of the user's browser, or undefined if not available.
 * @example
 * const locale = getLocale();
 * console.log(locale); // e.g., 'en-US'
 */
export function getLocale(): string | null | undefined {
  const navigator = window?.navigator;
  return navigator == null
    ? null
    : (navigator.languages && navigator.languages[0]) || // Chrome / Firefox
        navigator.language || // All browsers
        (navigator as any).userLanguage; // IE <= 10
}

/**
 * @description Generate and return a string array containing the localized months of the year
 * @param {String} locale The locale string used for formatting the returned string array.  Used for internationalization.
 * @param {String} format The format for the returned list.  Defaults to the long name (e.g. "January", "February", etc).
 *      Valid values are "numeric", "2-digit", "long", "short", "narrow". Note two months may have the same "narrow" format
 *      for some locales (e.g. March and May's narrow style are "M").
 * @returns {string[]}
 */
export function getMonthList(
  locale: string = 'en-US',
  format: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined = 'long',
) {
  const months = [];
  const options: Intl.DateTimeFormatOptions = { month: format };
  const date = new Date(2000, 0, 1); // Use a fixed year and day for consistency
  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    months.push(date.toLocaleString(locale, options));
  }
  return months;
}

/**
 * Checks if a value is a JavaScript Date object.
 * @param value - The value to check.
 * @returns {boolean} True if the value is a Date, false otherwise.
 */
export function isDate(value: any): boolean {
  return value instanceof Date;
}

/**
 * Parses a date string into a Date object based on the provided format.
 * @param dateString - The date string to parse.
 * @param format - The format string (e.g., 'YYYY-MM-DD', 'DD/MM/YYYY').
 * @returns {Date | null} A Date object if parsing is successful, or null if it fails.
 */
export function parse(dateString: string, format: string = 'YYYY/MM/DD'): Date | null {
  if (dateString == null) return null;

  // Replace format tokens with their regex patterns
  const regexString = format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => formatTokens[match].source);
  const regex = new RegExp(`^${regexString}$`);
  const matches = dateString.match(regex);
  if (!matches) return null;

  let dateValues: Record<string, number> = {};
  let matchIndex = 1;

  // Determine the order of tokens in the format string
  const tokenOrder: string[] = [];
  format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => {
    tokenOrder.push(match);
    return match;
  });

  // Assign values to the correct tokens based on their order
  for (const token of tokenOrder) {
    dateValues[token] = parseInt(matches[matchIndex++], 10);
  }

  return buildDateFromValues(dateValues);
}

/**
 * Returns a human-readable "time ago" string for a given date.
 * @param pastDate - The date to compare against the current date.
 * @returns {string} A string representing the time elapsed since the given date.
 * @example
 * timeAgo(new Date(Date.now() - 60000)); // '1 minute ago'
 */
export function timeAgo(pastDate: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}
