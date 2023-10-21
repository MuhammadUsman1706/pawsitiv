///////////////////
///BREED-INFO: ///
/////////////////

// 1) Breed List GET API: (ALREADY PROVIDED)

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

/////////////////////
///BREED-DETAIL: ///
///////////////////



// 1) Breed Detail GET API: (ALREADY PROVIDED)

// Info: To fetch the details about a breed of dog
// Structure
{
  breed: {
    id: 33,
    breed_name: 'Affenpinscher',
    species: 'Dogs',
    height_male: '23 TO 30',
    height_female: '19 TO 25',
    weight_male: '3 TO 6',
    life_span: '12 TO 14',
    country_of_origin: 'Germany',
    adaptability_rating: '3.2',
    overall_friendliness_rating: '3.3',
    health_groom_rating: '2.2',
    trainability_rating: '2.8',
    physical_needs_rating: '3.5',
    history: '...',
    about_the_breed: '...',
    personality: '...',
    health: '...',
    care: '...',
    feeding: '...',
    children_and_pets: '...',
    profile_photo: 'https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953249.jpeg'
  },
  ratings: {
    adapt: {
      suited_to_apartment_living: '5',
      good_for_novice_owners: '4',
      sensitivity_level: '3',
      tolerates_being_alone: '1',
      tolerates_cold_weather: '3',
      tolerates_hot_weather: '3'
    },
    friendly: {
      affectionate_with_family: '5',
      kid_friendly: '1',
      dog_friendly: '4',
      friendly_towards_strangers: '3'
    },
    health_groom: {
      amount_of_shedding: '1',
      drooling_potential: '1',
      easy_to_groom: '3',
      general_health: '4',
      potential_for_weight_gain: '3',
      size: '1'
    },
    train: {
      easy_to_train: '2',
      intelligence: '4',
      potential_for_mouthiness: '4',
      prey_drive: '3',
      tendency_to_bark_or_howl: '2',
      wanderlust_potential: '2'
    },
    physical: {
      energy_level: '4',
      intensity: '3',
      exercise_needs: '3',
      potential_for_playfulness: '4'
    }
  },
  media: [
    'https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953249.jpeg',
    'https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953242.jpeg',
    'https://inspedium.xyz/breedb/storage/app/public/breed_imgs/1678953244.jpeg',
  ]
}
