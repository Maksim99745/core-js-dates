/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const parsedDate = new Date(date);
  const result = parsedDate.getTime();
  return result;
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  let hours = date.getHours();
  if (String(hours).length === 1) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  if (String(seconds).length === 1) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const result = new Date(date);
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wensday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return dayNames[result.getDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const newDate = new Date(date);
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDay = dayNames[newDate.getDay()];
  let daysBeforeFriday = 0;
  if (currentDay === 'Friday') {
    daysBeforeFriday = 7;
  } else {
    daysBeforeFriday = (5 - newDate.getDay() + 7) % 7;
  }
  const nextFriday = newDate.setDate(newDate.getDate() + daysBeforeFriday);
  return new Date(nextFriday);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const newDate = new Date(year, month, 0);
  return newDate.getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const start = new Date(dateStart).setUTCHours(0, 0, 0, 0);
  const end = new Date(dateEnd).setUTCHours(0, 0, 0, 0);
  const result = end - start;
  return result / 86400 / 1000 + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const utcTimerr = new Date(date).setUTCHours(0, 0, 0, 0);
  const start = new Date(period.start).setUTCHours(0, 0, 0, 0);
  const end = new Date(period.end).setUTCHours(0, 0, 0, 0);
  if (utcTimerr >= start && utcTimerr <= end) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(dateString) {
  const time = new Date(dateString);
  const month = time.getUTCMonth() + 1;
  const day = time.getUTCDate();
  const year = time.getUTCFullYear();
  const hour = time.getUTCHours();
  const minute = time.getUTCMinutes();
  const second = time.getUTCSeconds();
  const partOfTheDay = hour >= 12 ? 'PM' : 'AM';
  const twelveFormat = hour % 12 === 0 ? 12 : hour % 12;
  const strMinutes = minute < 10 ? `0${minute}` : minute;
  const strSecond = second < 10 ? `0${second}` : second;

  const readyDate = `${month}/${day}/${year}, ${twelveFormat}:${strMinutes}:${strSecond} ${partOfTheDay}`;

  return readyDate;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const monthLength = new Date(year, month, 0).getDate();
  let weekends = 0;
  for (let i = 1; i <= monthLength; i += 1) {
    const currentDate = new Date(year, month - 1, i);
    if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
      weekends += 1;
    }
  }
  return weekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const year = date.getFullYear();
  const startOfTheYear = new Date(year, 0, 1);
  let weekCount = 1;

  while (date.getTime() > startOfTheYear.getTime()) {
    if (startOfTheYear.getDay() === 0) {
      weekCount += 1;
    }
    startOfTheYear.setDate(startOfTheYear.getDate() + 1);
  }

  return weekCount;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const currentDate = new Date(date);
  let isFriday13 = false;
  let result;

  while (!isFriday13) {
    const day = currentDate.getDay();
    const dateM = currentDate.getDate();
    if (day === 5 && dateM === 13) {
      result = new Date(currentDate);
      isFriday13 = true;
    } else {
      currentDate.setDate(13);
      const dayThisMounth = currentDate.getDay();
      const dateThisMounth = currentDate.getDate();
      if (dayThisMounth === 5 && dateThisMounth === 13) {
        result = new Date(currentDate);
        isFriday13 = true;
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  return result;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const mounth = date.getMonth();
  if (mounth < 4) {
    return 1;
  }
  if (mounth >= 4 && mounth < 6) {
    return 2;
  }
  if (mounth >= 6 && mounth < 8) {
    return 3;
  }
  return 4;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const schedule = [];
  const startDateStr = period.start.split('-');
  const endDateStr = period.end.split('-');
  const startDate = new Date(
    startDateStr[2],
    startDateStr[1] - 1,
    startDateStr[0]
  );
  const endDate = new Date(endDateStr[2], endDateStr[1] - 1, endDateStr[0]);

  function getApropriateDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const amountOfDays = Math.round(Math.abs((endDate - startDate) / 86400000));
  for (let i = 0; i <= amountOfDays; ) {
    for (let j = 0; j < countWorkDays && i <= amountOfDays; j += 1) {
      schedule.push(getApropriateDate(new Date(startDate)));
      startDate.setDate(startDate.getDate() + 1);
      i += 1;
    }
    for (let e = 0; e < countOffDays && i <= amountOfDays; e += 1) {
      startDate.setDate(startDate.getDate() + 1);
      i += 1;
    }
  }

  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  let result = true;
  if (year % 4 !== 0) {
    result = false;
  }
  if (year % 100 === 0 && year % 400 !== 0) {
    result = false;
  }
  return result;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
