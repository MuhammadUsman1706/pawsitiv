/////////////
///HOME: ///
///////////

// 1) Breed Name List GET API:

// Info: To fetch the names of all breeds of dogs
// Structure:
{
  breeds: [
  {
    label: "German Shepherd",
    id: "1",
  },
  {
    label: "Siberian Husky",
    id: "2",
  },
  {
    // same as above
  },
]
}

// 2) Recent Results GET API:

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

// 3) Statistics GET API:

// Info: To fetch statistics of the website on homepage
// Structure
{
  totalNoEvents: "34",
  totalNoClubs: "34",
  totalNoDogs: "50",
  totalNoBreeds: "295",
}

// 4) Subscription for updates POST API
// Info: To subscribe a user to our updates
