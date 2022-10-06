const Calendar = tui.Calendar;

const container = document.getElementById('calendar');
const options = {
  defaultView: 'week',
  usageStatistics: false,
  timezone: {
    zones: [
      {
        timezoneName: 'Asia/Seoul',
        displayLabel: 'Seoul',
      },
      {
        timezoneName: 'Asia/Kolkata',
        displayLabel: 'Noida',
      },
    ],
  },
  calendars: [
    {
      id: 'cal1',
      name: 'Personal',
      backgroundColor: '#03bd9e',
    },
  ],
   usageStatistics: false
};

const calendar = new Calendar(container, options);


calendar.createEvents([
    {
      id: 'event1',
      calendarId: 'cal2',
      title: 'Weekly Checkup',
      start: '2022-10-05T09:00:00',
      end: '2022-10-05T11:00:00',
    },
    {
      id: 'event2',
      calendarId: 'cal1',
      title: 'Dr. Ambedkar - Orthopaedic',
      start: '2022-10-07T14:00:00',
      end: '2022-10-07T15:00:00',
    },
    {
      id: 'event3',
      calendarId: 'cal2',
      title: 'Operation - ICU',
      start: '2022-10-08',
      end: '2022-10-08',
      isAllday: true,
      category: 'allday',
    },
  ]);
