const Calendar = tui.Calendar;

const container = document.getElementById('calendar');
const options = {
  defaultView: 'week',
  usageStatistics: false,
  timezone: {
    zones: [
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


var currentDateObj = new Date();
var numberOfMlSeconds = currentDateObj.getTime();
var addMlSeconds1 = 60 * 60 * 1000;
var addMlSeconds2 = 60 * 60 * 4000;
var addMlSeconds3 = 60 * 60 * 6000;
var newDateObj1 = new Date(numberOfMlSeconds + addMlSeconds1);
var newDateObj2 = new Date(numberOfMlSeconds + addMlSeconds2);
var newDateObj3 = new Date(numberOfMlSeconds + addMlSeconds3);

calendar.createEvents([
    {
      id: 'event1',
      calendarId: 'cal2',
      title: 'Weekly Checkup',
      start: currentDateObj.toJSON().slice(0, 19),
      end: newDateObj1.toJSON().slice(0, 19),
    },
    {
      id: 'event2',
      calendarId: 'cal1',
      title: 'Dr. Ambedkar - Orthopaedic',
      start: newDateObj2.toJSON().slice(0, 19),
      end: newDateObj3.toJSON().slice(0, 19),
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


  preLoaderHandler();