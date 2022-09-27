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
      title: 'Weekly meeting',
      start: '2022-09-27T09:00:00',
      end: '2022-09-27T10:00:00',
    },
    {
      id: 'event2',
      calendarId: 'cal1',
      title: 'Lunch appointment',
      start: '2022-09-25T12:00:00',
      end: '2022-09-25T13:00:00',
    },
    {
      id: 'event3',
      calendarId: 'cal2',
      title: 'Vacation',
      start: '2022-09-28',
      end: '2022-09-28',
      isAllday: true,
      category: 'allday',
    },
  ]);
