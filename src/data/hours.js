/**
 * Opening hours — exactly as published on the VM Music Factory Google listing.
 * The studio is open 24 hours, all seven days.
 */
export const hours = [
  { day: 'Monday', time: 'Open 24 hours' },
  { day: 'Tuesday', time: 'Open 24 hours' },
  { day: 'Wednesday', time: 'Open 24 hours' },
  { day: 'Thursday', time: 'Open 24 hours' },
  { day: 'Friday', time: 'Open 24 hours' },
  { day: 'Saturday', time: 'Open 24 hours' },
  { day: 'Sunday', time: 'Open 24 hours' },
];

export const hoursSummary = 'Open 24 hours · All 7 days';

/**
 * Schema.org opening hours. "Open 24 hours" is expressed as 00:00–23:59
 * for every day of the week.
 */
export const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
];

export default hours;
