/////////////////////
///SHOW-RESULTS: ///
///////////////////

// 1) GET "All-Breed" Event List: (add feature in this API: "https://inspedium.xyz/pawsitive-web/api/events/filter")

// Info: To fetch the list of "all-breed" events.
// Structure:
{
    event_result: [
        {
        start_date: "2023-02-19",
        end_date: "2023-02-19",
        event: "All Breed Show 1",
        club: "Club #1",
        country: "Pakistan",
        countryCode: "PK",
        eventId: "1",
        },
        {
        start_date: "2023-02-18",
        end_date: "2023-02-18",
        event: "All Breed Show 2",
        club: "Club #2",
        country: "Pakistan",
        countryCode: "PK",
        eventId: "2",
        },
        {
        start_date: "2023-02-17",
        end_date: "2023-02-17",
        event: "All Breed Show 3",
        club: "Club #3",
        country: "Pakistan",
        countryCode: "PK",
        eventId: "3",
        },
    ],
}

// 1) GET "All-Breed" Event Details:

// Info: To fetch the details of an "all-breed" event.
// Structure:
{
    details: {
      start_date: "2023-03-13",
      event: "runing",
      club: "Federación Cinológica Argentina",
      country: "Pakistan",
      city: "Karachi",
      eventId: 1,
    },
    bestInGroup: [
      {
        dogName: "example",
        breed: "example",
        awards: "Best in Group",
        owner: "example",
        dogId: "example",
      },
    ],
    bestInShow: [
      {
        dogName: "example",
        breed: "example",
        awards: "Best in Show",
        owner: "example",
        dogId: "example",
      },
      {
        dogName: "Dragon Asarko Lordana",
        breed: "Bulldog",
        awards: "Best in Show",
        owner: "example",
        dogId: 366642,
      },
      {
        dogName: "Dragon Asarko Lordana",
        breed: "Bulldog",
        awards: "Best in Show",
        owner: "example",
        dogId: 366642,
      },
    ],
    breedData: {
      german_shepherd: {
        baby: {
          male: [
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Asarko Lordana",
              awards: "Best in Show",
              class: "baby",
              dogId: 366642,
            },
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Asarko Lordana",
              awards: "Best in Show",
              class: "baby",
              dogId: 366642,
            },
          ],
        },
        intermediate: {
          male: [
            {
              grading: "gg",
              place: "Karachi",
              dogName: "intermediate Asarko Lordana",
              awards: "Best in Show",
              class: "intermediate",
              dogId: 366642,
            },
            {
              grading: "gg",
              place: "Karachi",
              dogName: "intermediate Asarko Lordana",
              awards: "Best in Show",
              class: "intermediate",
              dogId: 366642,
            },
          ],
        },
      },
      akita: {
        open: {
          male: [
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Akita Lordana",
              awards: "Best in Show",
              class: "open",
              dogId: 366642,
            },
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Akita Lordana",
              awards: "Best in Show",
              class: "open",
              dogId: 366642,
            },
          ],
        },
      },
    },
  }