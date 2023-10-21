/////////////
///HOME: ///
///////////

// 1) Recent Results GET API:

// Info: To get recent results at the homepage for show purpose.
// Structure:
[
  {
    date: 1067704477248,
    event: "Event 01",
    breedName: "German Shepherd",
    club: "Inspedium",
    country: "Pakistan",
    countryCode: "PK",
    eventId: "3",
  },
  {
    // same as above
  },
];

// 2) Subscription for updates POST API
// Info: To subscribe a user to our updates

/////////////////////
///SHOW-RESULTS: ///
///////////////////

// 1) Events List GET API:

// Info: To fetch all events according to the breed that is selected
// Structure:
[
  {
    date: 1067704477248,
    event: "Event 01",
    club: "Inspedium",
    country: "Pakistan",
    countryCode: "PK",
    eventId: "1",
  },
  {
    date: 1306751839992,
    event: "Event 02",
    club: "Inspedium",
    country: "United States",
    countryCode: "US",
    eventId: "2",
  },
];

// 2) Filter Events List POST API:

// Info: To filter the event list according to a date range, country and club.
// Structure:
// Same as Events List GET API

// 3) Club Names List GET

// Info: To get all club names for the user to filter
// Structure:
[
  {
    id: 1,
    label: "Rottweiler",
  },
  {
    id: 2,
    label: "Club#2",
  },
  {
    // same as above
  },
];
