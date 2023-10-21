///////////////////
///BREED-DB: /////
/////////////////

// 1) Breed List Description GET API: (ALREADY PROVIDED)

// Info: To fetch the breed list of dogs
// Structure:

{
  breeds: [
    {
      id: 33,
      breed_name: "Affenpinscher",
      species: "Dogs",
      profile_photo:
        "https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953249.jpeg",
    },
    {
      id: 34,
      breed_name: "Afghan Hound",
      species: "Dogs",
      profile_photo:
        "https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953293.jpeg",
    },
    {
      // same as above
    },
  ];
}

///////////////////////
///DOG-PROFILES: /////
/////////////////////

// 1) Dog Profiles GET API:

// Info: To fetch all profiles of dogs
// Structure:

profiles: [
  {
    id: 33,
    dogName: "White Wolf",
    profilePhoto:
      "https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953249.jpeg",
  },
  {
    id: 34,
    dogName: "Butcher of Blaviken",
    profilePhoto:
      "https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953293.jpeg",
  },
  {
    // same as above
  },
];

//////////////////////////
///PROFILE-DETAILS: /////
////////////////////////

// 1) Dog Profile Details GET API:

// Info: To fetch all information about the dog's profile
// Structure:

{
  dogName: "White Wolf",
  basicData: {
    title: "The Butcher of Blaviken",
    breed: "Akita",
    gender: "Male",
    microchip: "...",
    whelped: "January 01, 1970",
    sire: "Letho of Gulet",
    dam: "Triss Merigold",
    registration: "MEIN Japan 7774H/10",
    registeredWith: "Rottweiler Club",
    breeders: ["Geralt of Rivia", "Geralt of Rivia"],
    owners: ["Geralt of Rivia", "Geralt of Rivia"]
  },
  images: [
    "https://thumbs.dreamstime.com/b/portrait-funny-dog-behind-wheel-car-jack-russell-terrier-sunglasses-151057370.jpg",
    "https://img.freepik.com/free-photo/front-view-funny-cute-dog-concept_23-2148786514.jpg?w=2000"
  ]
}
