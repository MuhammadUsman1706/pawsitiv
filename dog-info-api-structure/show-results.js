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


// 2) Club Names List GET API:

// Info: To get all club names for the user to filter
// Structure:
[
  {
    id: 1,
    label: "Rottweiler"
  },
  {
    id: 2,
    label: "Club#2"
  },
  {
    // same as above
  }
];

// 3) Country Names List GET API:

// Info: To get all club names for the user to filter
// Structure:
[
  {
    id: 1,
    label: "Pakistan"
  },
  {
    id: 2,
    label: "Australia"
  },
  {
    // same as above
  }
];




// 3) Filter Events List POST API:

// Info: To filter the event list according to a date range, country and club.
// Structure:
// Same as Events List GET API

// 3) Champions List GET API:

// Info: To fetch some champions and show a list aside the events.
// Structure:
["Ober Von Bad Boll", "The White Wolf", "The Butcher of Blaviken"];

//////////////////////
///EVENT-DETAILS: ///
////////////////////

// 1) Event Detail/Results GET API:

// Info: To fetch the details/results of a specific event.
// Structure
{
  details: {
    date: "7th Feb 2014",
    country: "Pakistan",
    city: "Kolachi",
    club: "Rottweiler Club",
    breed: "German Shepherd",
  },
  bestInShow: [
    {
      dogName: "Magush-Byp A-Jany Magma",
      breed: "Saluki",
      awards: "BoB, BiG, Res.BiS, CACIB",
      owner: "Mrs. Latifa Mohammed & Britta Tappendorf",
      dogId: "1",
    },
    {
      // same as above
    }
  ],
  bestInGroup: [
    {
      dogName: "Magush-Byp A-Jany Magma",
      breed: "Saluki",
      awards: "BoB, BiG, Res.BiS, CACIB",
      owner: "Mrs. Latifa Mohammed & Britta Tappendorf",
      dogId: "2",
    },
    {
      // same as above
    }
  ],
  classData: {
    open: {
      male: [
        {
          grading: "Excellent",
          place: "1st",
          dogName: "Tyson of Lucky's Line",
          awards: "BoB",
          class: "Open Class Male",
          dogId: "1"
        },
        {
          // same as above
        },
      ],
      female: [
        {
          grading: "Excellent",
          place: "1st",
          dogName: "Tyson of Lucky's Line",
          awards: "BoB",
          class: "Open Class Female",
          dogId: "1"
        },
      ],
    },
    intermediate: {
      male: [
        {
          grading: "Excellent",
          place: "1st",
          dogName: "Tyson of Lucky's Line",
          awards: "BoB",
          class: "Intermediate Class Male",
          dogId: "1"
        },
        {
          // same as above
        },
      ],
      female: [
        {
          grading: "Excellent",
          place: "1st",
          dogName: "Tyson of Lucky's Line",
          awards: "BoB",
          class: "Intermediate Class Female",
          dogId: "1"
        },
      ],
    },
  };
}
