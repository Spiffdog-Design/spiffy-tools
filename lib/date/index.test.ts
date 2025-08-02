import { describe, it, expect, vi } from 'vitest';
import {
  addDays,
  dateFormatOption,
  daysToMs,
  format,
  getDateMidnight,
  getLocale,
  getMonthList,
  getTodayMidnight,
  getTomorrowMidnight,
  getYTDDays,
  hoursToMs,
  minutesToMs,
  msToDays,
  msToHours,
  msToMinutes,
  msToSeconds,
  parse,
  secondsToMs,
  subtractDays,
  timeAgo,
} from '../date'; // Adjust the import path as necessary

describe('date tests', () => {
  describe('addDays', () => {
    it('should add the specified number of days to a given date', () => {
      const initialDate = new Date('2023-10-01');
      const result = addDays(initialDate, 5);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-06');
    });

    it('should handle negative numbers to subtract days', () => {
      const initialDate = new Date('2023-10-01');
      const result = addDays(initialDate, -3);
      expect(result.toISOString().slice(0, 10)).toBe('2023-09-28');
    });

    it('should return the same date if noOfDays is 0', () => {
      const initialDate = new Date('2023-10-01');
      const result = addDays(initialDate, 0);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-01');
    });

    it('should correctly handle month boundaries', () => {
      const initialDate = new Date('2023-01-31');
      const result = addDays(initialDate, 1);
      expect(result.toISOString().slice(0, 10)).toBe('2023-02-01');
    });

    it('should correctly handle year boundaries', () => {
      const initialDate = new Date('2023-12-31');
      const result = addDays(initialDate, 1);
      expect(result.toISOString().slice(0, 10)).toBe('2024-01-01');
    });

    it('should handle date strings as input', () => {
      const initialDate = '2023-10-01';
      const result = addDays(initialDate, 10);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-11');
    });

    it('should handle timestamps as input', () => {
      const initialDate = new Date('2023-10-01').getTime();
      const result = addDays(initialDate, 10);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-11');
    });
  });
  describe('format', () => {
    it('should format a Date object correctly', () => {
      const date = new Date(Date.UTC(2023, 9, 5));
      const formattedDate = format(date, 'en-US');
      expect(formattedDate).toBe(date.toLocaleString('en-US', dateFormatOption));
    });
    it('should format a date string correctly', () => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      };
      const date = '2023-10-05T00:00:00Z';
      const formattedDate = format(date, 'en-GB', options);
      expect(formattedDate).toBe(new Date(date).toLocaleString('en-GB', options));
    });
    it('should format a number timestamp correctly', () => {
      const timestamp = Date.UTC(2023, 9, 5); // Use UTC timestamp
      const formattedDate = format(timestamp, 'en-US');
      expect(formattedDate).toBe(new Date(timestamp).toLocaleString('en-US', dateFormatOption));
    });
    it('should use default locale and options if none are provided', () => {
      const date = new Date(Date.UTC(2023, 9, 5)); // Use UTC date
      const formattedDate = format(date);
      expect(formattedDate).toBe(date.toLocaleString('en-US', dateFormatOption));
    });
  });
  describe('getDateMidnight', () => {
    it('should set the time of the given date to midnight', () => {
      const date = new Date('2023-10-10T15:30:00');
      const result = getDateMidnight(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });
  describe('getLocale', () => {
    it('should return the first language from navigator.languages if available', () => {
      const mockLanguages = ['en-US', 'fr-FR'];
      vi.stubGlobal('navigator', { languages: mockLanguages });
      const locale = getLocale();
      expect(locale).toBe('en-US');
    });
    it('should return navigator.language if navigator.languages is not available', () => {
      const mockLanguage = 'fr-FR';
      vi.stubGlobal('navigator', { language: mockLanguage });
      const locale = getLocale();
      expect(locale).toBe('fr-FR');
    });
    it('should return navigator.userLanguage if neither navigator.languages nor navigator.language is available', () => {
      const mockUserLanguage = 'de-DE';
      vi.stubGlobal('navigator', { userLanguage: mockUserLanguage });
      const locale = getLocale();
      expect(locale).toBe('de-DE');
    });
    it('should return null if navigator is not available', () => {
      vi.stubGlobal('navigator', null);
      const locale = getLocale();
      expect(locale).toBeNull();
    });
    it('should return undefined if no language properties are available', () => {
      vi.stubGlobal('navigator', {});
      const locale = getLocale();
      expect(locale).toBeUndefined();
    });
  });
  describe('getMonthList', () => {
    it('should return long month names in English by default', () => {
      const months = getMonthList();
      expect(months).toEqual([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]);
    });
    it('should return short month names in English', () => {
      const months = getMonthList('en-US', 'short');
      expect(months).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    });
    it('should return numeric month names in English', () => {
      const months = getMonthList('en-US', 'numeric');
      expect(months).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    });
    it('should return long month names in French', () => {
      const months = getMonthList('fr-FR', 'long');
      expect(months).toEqual([
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ]);
    });
    it('should return narrow month names in English', () => {
      const months = getMonthList('en-US', 'narrow');
      expect(months).toEqual(['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']);
    });
    it('should return 2-digit month names in English', () => {
      const months = getMonthList('en-US', '2-digit');
      expect(months).toEqual(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
    });
  });
  describe('getTodayMidnight', () => {
    it("should return today's date set to midnight", () => {
      const result = getTodayMidnight();
      const now = new Date();
      expect(result.getFullYear()).toBe(now.getFullYear());
      expect(result.getMonth()).toBe(now.getMonth());
      expect(result.getDate()).toBe(now.getDate());
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });
  describe('getTomorrowMidnight', () => {
    it("should return tomorrow's date set to midnight", () => {
      const result = getTomorrowMidnight();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(result.getFullYear()).toBe(tomorrow.getFullYear());
      expect(result.getMonth()).toBe(tomorrow.getMonth());
      expect(result.getDate()).toBe(tomorrow.getDate());
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });
  describe('getYTDDays', () => {
    it('should calculate the number of days from the start of the year to tomorrow', () => {
      const result = getYTDDays();

      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const startOfYear = new Date(today.getFullYear(), 0, 0);
      const dayInMs = daysToMs(1);
      const expectedDays = Math.ceil((today.getTime() - startOfYear.getTime()) / dayInMs);

      expect(result).toBe(expectedDays);
    });
  });
  describe('parse', () => {
    it('should parse a date string in the default format "YYYY/MM/DD"', () => {
      const date = parse('2023/10/05');
      expect(date).toEqual(new Date(2023, 9, 5)); // October is month 9 (0-indexed)
    });
    it('should parse a date string in the format "DD-MM-YYYY"', () => {
      const date = parse('05-10-2023', 'DD-MM-YYYY');
      expect(date).toEqual(new Date(2023, 9, 5));
    });
    it('should parse a date string with time in the format "YYYY-MM-DD HH:mm:ss"', () => {
      const date = parse('2023-10-05 14:30:00', 'YYYY-MM-DD HH:mm:ss');
      expect(date).toEqual(new Date(2023, 9, 5, 14, 30, 0));
    });
    it('should return null for an invalid date string', () => {
      const date = parse('2023-14-05', 'YYYY-MM-DD'); // Invalid month
      expect(date).toBeNull();
    });
    it('should return null for a date string that does not match the format', () => {
      const date = parse('2023/10/05', 'DD-MM-YYYY');
      expect(date).toBeNull();
    });
    it('should parse a date string in the format "MM/DD/YYYY"', () => {
      const date = parse('10/05/2023', 'MM/DD/YYYY');
      expect(date).toEqual(new Date(2023, 9, 5));
    });
    it('should parse a date string with time in the format "DD/MM/YYYY HH:mm"', () => {
      const date = parse('05/10/2023 14:30', 'DD/MM/YYYY HH:mm');
      expect(date).toEqual(new Date(2023, 9, 5, 14, 30));
    });
    it('should handle leading zeros in date components', () => {
      const date = parse('2023-01-01', 'YYYY-MM-DD');
      expect(date).toEqual(new Date(2023, 0, 1)); // January is month 0 (0-indexed)
    });
    it('should return null for an empty date string', () => {
      const date = parse('', 'YYYY-MM-DD');
      expect(date).toBeNull();
    });
    it('should return null for a null input', () => {
      const date = parse(null as unknown as string, 'YYYY-MM-DD');
      expect(date).toBeNull();
    });
    it('should return null for an undefined input', () => {
      const date = parse(undefined as unknown as string, 'YYYY-MM-DD');
      expect(date).toBeNull();
    });
  });
  describe('subtractDays', () => {
    it('should subtract the specified number of days from a given date', () => {
      const initialDate = new Date('2023-10-10');
      const result = subtractDays(initialDate, 5);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-05');
    });

    it('should handle negative numbers to add days', () => {
      const initialDate = new Date('2023-10-10');
      const result = subtractDays(initialDate, -3);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-13');
    });

    it('should return the same date if noOfDays is 0', () => {
      const initialDate = new Date('2023-10-10');
      const result = subtractDays(initialDate, 0);
      expect(result.toISOString().slice(0, 10)).toBe('2023-10-10');
    });

    it('should correctly handle month boundaries', () => {
      const initialDate = new Date('2023-03-01');
      const result = subtractDays(initialDate, 1);
      expect(result.toISOString().slice(0, 10)).toBe('2023-02-28');
    });

    it('should correctly handle year boundaries', () => {
      const initialDate = new Date('2024-01-01');
      const result = subtractDays(initialDate, 1);
      expect(result.toISOString().slice(0, 10)).toBe('2023-12-31');
    });

    it('should handle date strings as input', () => {
      const initialDate = '2023-10-10';
      const result = subtractDays(initialDate, 10);
      expect(result.toISOString().slice(0, 10)).toBe('2023-09-30');
    });

    it('should handle timestamps as input', () => {
      const initialDate = new Date('2023-10-10').getTime();
      const result = subtractDays(initialDate, 10);
      expect(result.toISOString().slice(0, 10)).toBe('2023-09-30');
    });
  });
  describe('timeAgo', () => {
    it('should return "just now" for a date less than a second ago', () => {
      const pastDate = new Date(Date.now() - 500); // 0.5 seconds ago
      expect(timeAgo(pastDate)).toBe('just now');
    });
    it('should return "1 second ago" for a date exactly one second ago', () => {
      const pastDate = new Date(Date.now() - 1000); // 1 second ago
      expect(timeAgo(pastDate)).toBe('1 second ago');
    });
    it('should return "30 seconds ago" for a date 30 seconds ago', () => {
      const pastDate = new Date(Date.now() - 30000); // 30 seconds ago
      expect(timeAgo(pastDate)).toBe('30 seconds ago');
    });
    it('should return "1 minute ago" for a date exactly one minute ago', () => {
      const pastDate = new Date(Date.now() - 60000); // 1 minute ago
      expect(timeAgo(pastDate)).toBe('1 minute ago');
    });
    it('should return "5 minutes ago" for a date 5 minutes ago', () => {
      const pastDate = new Date(Date.now() - 300000); // 5 minutes ago
      expect(timeAgo(pastDate)).toBe('5 minutes ago');
    });
    it('should return "1 hour ago" for a date exactly one hour ago', () => {
      const pastDate = new Date(Date.now() - 3600000); // 1 hour ago
      expect(timeAgo(pastDate)).toBe('1 hour ago');
    });
    it('should return "2 hours ago" for a date 2 hours ago', () => {
      const pastDate = new Date(Date.now() - 7200000); // 2 hours ago
      expect(timeAgo(pastDate)).toBe('2 hours ago');
    });
    it('should return "1 day ago" for a date exactly one day ago', () => {
      const pastDate = new Date(Date.now() - 86400000); // 1 day ago
      expect(timeAgo(pastDate)).toBe('1 day ago');
    });
    it('should return "3 days ago" for a date 3 days ago', () => {
      const pastDate = new Date(Date.now() - 259200000); // 3 days ago
      expect(timeAgo(pastDate)).toBe('3 days ago');
    });
    it('should return "1 week ago" for a date exactly one week ago', () => {
      const pastDate = new Date(Date.now() - 604800000); // 1 week ago
      expect(timeAgo(pastDate)).toBe('1 week ago');
    });
    it('should return "2 weeks ago" for a date 2 weeks ago', () => {
      const pastDate = new Date(Date.now() - 1209600000); // 2 weeks ago
      expect(timeAgo(pastDate)).toBe('2 weeks ago');
    });
    it('should return "1 month ago" for a date exactly one month ago', () => {
      const pastDate = new Date(Date.now() - 2592000000); // 1 month ago
      expect(timeAgo(pastDate)).toBe('1 month ago');
    });
    it('should return "6 months ago" for a date 6 months ago', () => {
      const pastDate = new Date(Date.now() - 15552000000); // 6 months ago
      expect(timeAgo(pastDate)).toBe('6 months ago');
    });
    it('should return "1 year ago" for a date exactly one year ago', () => {
      const pastDate = new Date(Date.now() - 31536000000); // 1 year ago
      expect(timeAgo(pastDate)).toBe('1 year ago');
    });
    it('should return "2 years ago" for a date 2 years ago', () => {
      const pastDate = new Date(Date.now() - 63072000000); // 2 years ago
      expect(timeAgo(pastDate)).toBe('2 years ago');
    });
  });

  describe('Time Conversion Functions', () => {
    it('should convert days to milliseconds', () => {
      expect(daysToMs(1)).toBe(24 * 60 * 60 * 1000);
    });

    it('should convert hours to milliseconds', () => {
      expect(hoursToMs(1)).toBe(60 * 60 * 1000);
    });

    it('should convert minutes to milliseconds', () => {
      expect(minutesToMs(1)).toBe(60 * 1000);
    });

    it('should convert seconds to milliseconds', () => {
      expect(secondsToMs(1)).toBe(1000);
    });

    it('should convert milliseconds to days', () => {
      expect(msToDays(24 * 60 * 60 * 1000)).toBe(1);
    });

    it('should convert milliseconds to hours', () => {
      expect(msToHours(60 * 60 * 1000)).toBe(1);
    });

    it('should convert milliseconds to minutes', () => {
      expect(msToMinutes(60 * 1000)).toBe(1);
    });

    it('should convert milliseconds to seconds', () => {
      expect(msToSeconds(1000)).toBe(1);
    });
  });
});
